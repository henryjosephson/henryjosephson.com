"""This is the lambda function that I use in AWS to send emails to new subscribers."""

import hashlib
import hmac
import json
import os
import re
import urllib.request
from datetime import datetime

import boto3


def lambda_handler(event, context):
    """Triggered by GitHub webhook when new content is pushed to the writing directory.

    Sends newsletter emails to confirmed subscribers.
    """
    # Get environment variables
    SUBSCRIBERS_TABLE = os.environ.get("SUBSCRIBERS_TABLE", "subscribers")
    DOMAIN_NAME = os.environ.get("DOMAIN_NAME", "henryjosephson.com")
    NEWSLETTER_TEMPLATE = os.environ.get("NEWSLETTER_TEMPLATE", "newsletter-template")
    API_GATEWAY_URL = os.environ.get("API_GATEWAY_URL")
    WEBSITE_BASE_URL = os.environ.get("WEBSITE_BASE_URL", f"https://{DOMAIN_NAME}")
    GITHUB_BRANCH = os.environ.get("GITHUB_BRANCH", "main")

    # Initialize clients
    dynamodb = boto3.resource("dynamodb")
    table = dynamodb.Table(SUBSCRIBERS_TABLE)
    ses = boto3.client("ses")

    webhook_secret = os.environ.get("GITHUB_WEBHOOK_SECRET")

    if webhook_secret:
        # get signature from headers
        headers = event.get("headers", {})
        signature_header = headers.get("X-Hub-Signature-256", "")

        if not signature_header.startswith("sha256="):
            print("Error: Invalid signature format")
            return {
                "statusCode": 401,
                "body": json.dumps({"message": "Invalid signature format"}),
            }

        received_signature = signature_header[7:]  # Remove "sha256=" prefix

        calculated_signature = hmac.new(
            webhook_secret.encode("utf-8"),
            msg=event["body"].encode("utf-8"),
            digestmod=hashlib.sha256,
        ).hexdigest()

        if not hmac.compare_digest(received_signature, calculated_signature):
            print("Error: Signatures do not match")
            return {
                "statusCode": 401,
                "body": json.dumps({"message": "Signatures do not match"}),
            }

    try:
        # Parse GitHub webhook payload
        body = event.get("body", "{}")
        payload = json.loads(body) if isinstance(body, str) else body

        # Log the payload for debugging
        print(f"Received GitHub webhook payload: {json.dumps(payload)[:500]}...")

        # Verify it's a push to the configured branch
        ref = payload.get("ref")
        expected_ref = f"refs/heads/{GITHUB_BRANCH}"

        if ref != expected_ref:
            print(f"Ignoring push to {ref}, expected {expected_ref}")
            return {
                "statusCode": 200,
                "body": json.dumps(
                    {"message": f"Not a push to {GITHUB_BRANCH} branch, ignoring"}
                ),
            }

        # Find changes in the writing/ directory
        new_post_files = []

        # Look through added and modified files in all commits
        for commit in payload.get("commits", []):
            added_files = commit.get("added", [])
            modified_files = commit.get("modified", [])  # noqa: F841

            for file_path in added_files:  # + modified_files:
                # Check if this is an HTML file in the writing directory
                if file_path.startswith("writing/") and file_path.endswith(".html"):
                    # Skip internal files that don't represent posts
                    if "_md/" in file_path or "_templates/" in file_path:
                        continue
                    new_post_files.append(file_path)

        if not new_post_files:
            print("No new posts found in writing directory")
            return {
                "statusCode": 200,
                "body": json.dumps(
                    {"message": "No new posts found in writing directory"}
                ),
            }

        print(f"Found new post files: {new_post_files}")

        # Process each new post file
        for file_path in new_post_files:
            # Get file content from GitHub
            repo_name = payload.get("repository", {}).get("full_name", "")
            commit_sha = payload.get("after")

            print(
                f"Fetching content for {file_path} from repo {repo_name} at commit {commit_sha}"
            )
            file_content = get_file_content_from_github(
                repo_name, file_path, commit_sha
            )

            if not file_content:
                print(f"Could not fetch content for {file_path}")
                continue

            # Extract post information
            post_data = extract_post_data(file_content, file_path)

            if not post_data:
                print(f"Could not extract post data from {file_path}")
                continue

            print(f"Extracted post data: {post_data}")

            # Generate post URL
            post_url = f"{WEBSITE_BASE_URL}/{file_path}"

            # Query DynamoDB for confirmed subscribers
            response = table.scan(
                FilterExpression="confirmed = :confirmed",
                ExpressionAttributeValues={":confirmed": True},
            )

            confirmed_subscribers = response.get("Items", [])

            if not confirmed_subscribers:
                print("No confirmed subscribers found")
                return {
                    "statusCode": 200,
                    "body": json.dumps({"message": "No confirmed subscribers found"}),
                }

            print(f"Found {len(confirmed_subscribers)} confirmed subscribers")

            # Send newsletter to each subscriber
            sent_count = 0
            error_count = 0

            for subscriber in confirmed_subscribers:
                email = subscriber.get("email")
                unsubscribe_token = subscriber.get("unsubscribe_token")

                # Generate personalized unsubscribe URL
                unsubscribe_url = (
                    f"{API_GATEWAY_URL}/unsubscribe?token={unsubscribe_token}"
                )

                # Prepare email template data
                template_data = {
                    "post_title": post_data["title"],
                    "post_date": post_data["date"],
                    "post_url": post_url,
                    "post_preview": post_data.get(
                        "preview", "Check out my latest post..."
                    ),
                    "unsubscribe_url": unsubscribe_url,
                }

                try:
                    # Send email using SES template
                    ses.send_templated_email(
                        Source=f"Henry Josephson <newsletter@{DOMAIN_NAME}>",
                        Destination={"ToAddresses": [email]},
                        Template=NEWSLETTER_TEMPLATE,
                        TemplateData=json.dumps(template_data),
                    )

                    # Update last_email_sent timestamp
                    table.update_item(
                        Key={"email": email},
                        UpdateExpression="SET last_email_sent = :timestamp",
                        ExpressionAttributeValues={
                            ":timestamp": datetime.now().isoformat()
                        },
                    )

                    sent_count += 1
                    print(f"Sent newsletter to {email}")

                except Exception as e:
                    print(f"Error sending to {email}: {e!s}")
                    error_count += 1

            print(
                f"Finished sending newsletters. Sent: {sent_count}, Errors: {error_count}"
            )

            increment_beeminder_goal()

            return {
                "statusCode": 200,
                "body": json.dumps(
                    {
                        "message": f'Newsletter sent for new post: {post_data["title"]}',
                        "sent_count": sent_count,
                        "error_count": error_count,
                    }
                ),
            }

    except Exception as e:
        print(f"Error processing webhook: {e!s}")
        return {"statusCode": 500, "body": json.dumps({"error": str(e)})}


def get_file_content_from_github(repo, file_path, commit_sha):
    """Fetches file content from GitHub using the GitHub API."""
    try:
        # Initialize GitHub API client (using boto3 for consistency)
        github_token = os.environ.get("GITHUB_TOKEN")

        # Construct GitHub API URL
        api_url = f"https://api.github.com/repos/{repo}/contents/{file_path}"
        if commit_sha:
            api_url += f"?ref={commit_sha}"

        print(f"Fetching content from GitHub API: {api_url}")

        # Create request with headers
        headers = {
            "Accept": "application/vnd.github.v3.raw",
            "User-Agent": "AWS-Lambda-Newsletter-Bot",
        }

        if github_token:
            headers["Authorization"] = f"token {github_token}"

        req = urllib.request.Request(api_url, headers=headers)  # noqa: S310

        # Fetch content
        with urllib.request.urlopen(req) as response:  # noqa: S310
            return response.read().decode("utf-8")

    except Exception as e:
        print(f"Error fetching file from GitHub: {e!s}")
        return None


def extract_post_data(html_content, file_path):
    """Extract title, date, post preview, and other metadata from HTML content."""
    try:
        # Extract title - try multiple patterns
        title = None

        # Try to get title from <title> tag
        title_match = re.search(
            r"<title>\s*(.*?)\s*</title>", html_content, re.IGNORECASE | re.DOTALL
        )
        if title_match:
            title = title_match.group(1).strip()

        # If not found or empty, try the h1 with id="title"
        if not title:
            h1_title_match = re.search(
                r'<h1\s+id="title"[^>]*>\s*(.*?)\s*</h1>',
                html_content,
                re.IGNORECASE | re.DOTALL,
            )
            if h1_title_match:
                # Clean up any nested tags
                raw_title = h1_title_match.group(1)
                # Remove any HTML tags within the title
                title = re.sub(r"<[^>]+>", "", raw_title).strip()

        # If still not found, try any h1
        if not title:
            any_h1_match = re.search(
                r"<h1[^>]*>\s*(.*?)\s*</h1>", html_content, re.IGNORECASE | re.DOTALL
            )
            if any_h1_match:
                # Clean up any nested tags
                raw_title = any_h1_match.group(1)
                # Remove any HTML tags within the title
                title = re.sub(r"<[^>]+>", "", raw_title).strip()

        # If still not found, use the filename
        if not title:
            title = (
                os.path.basename(file_path)  # noqa: PTH119
                .replace(".html", "")
                .replace("-", " ")
                .title()
            )

        # Extract date - first try author paragraph format
        date = None

        # Look for date in author paragraph: <p class="author">Henry Josephson<br>March 05, 2025</p>
        author_date_match = re.search(
            r'<p\s+class="author"[^>]*>.*?<br>\s*([\w\s,]+\d{4})\s*</p>',
            html_content,
            re.IGNORECASE | re.DOTALL,
        )
        if author_date_match:
            date = author_date_match.group(1).strip()

        # If not found, try a dedicated date paragraph
        if not date:
            date_para_match = re.search(
                r'<p\s+class="date"[^>]*>\s*([\w\s,]+\d{4})\s*</p>',
                html_content,
                re.IGNORECASE | re.DOTALL,
            )
            if date_para_match:
                date = date_para_match.group(1).strip()

        # Try to find any date format in the content (Month DD, YYYY)
        if not date:
            date_pattern = re.search(
                r"(January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2},?\s+\d{4}",
                html_content,
            )
            if date_pattern:
                date = date_pattern.group(0)

        # If still not found, use current date
        if not date:
            date = datetime.now().strftime("%B %d, %Y")

        # Extract post content preview
        preview = ""

        # First, remove the head section
        body_content = re.sub(
            r"<head>.*?</head>", "", html_content, flags=re.DOTALL | re.IGNORECASE
        )

        # Find the body content
        body_match = re.search(
            r"<body[^>]*>(.*?)</body>", body_content, re.DOTALL | re.IGNORECASE
        )
        body_text = body_match.group(1) if body_match else body_content

        # Remove header elements (h1, h2, etc.) and their content
        body_text = re.sub(
            r"<h[1-6][^>]*>.*?</h[1-6]>", "", body_text, flags=re.DOTALL | re.IGNORECASE
        )

        # Remove the title and author sections
        body_text = re.sub(
            r"<header>.*?</header>", "", body_text, flags=re.DOTALL | re.IGNORECASE
        )
        body_text = re.sub(
            r'<p class="author">.*?</p>', "", body_text, flags=re.DOTALL | re.IGNORECASE
        )

        # Remove any remaining HTML tags
        text_only = re.sub(r"<[^>]+>", " ", body_text)

        # Remove extra whitespace
        text_only = re.sub(r"\s+", " ", text_only).strip()

        # Get first ~50 words (approximately 350 characters)
        PREVIEW_WORD_COUNT = 50  # Define constant for magic number
        words = text_only.split()
        preview = (
            " ".join(words[:PREVIEW_WORD_COUNT])
            if len(words) > PREVIEW_WORD_COUNT
            else text_only
        )

        # If preview is too short, it might not have found good content
        MIN_PREVIEW_LENGTH = 50  # Define constant for magic number
        if len(preview) < MIN_PREVIEW_LENGTH:
            preview = "Check out my latest post..."

        print(
            f"Extracted title: '{title}', date: '{date}', and preview: '{preview[:50]}...'"
        )

        return {"title": title, "date": date, "path": file_path, "preview": preview}

    except Exception as e:
        print(f"Error extracting post data: {e!s}")
        return None


def increment_beeminder_goal():
    """Send a datapoint to Beeminder to track blog post publication."""
    data = {
        "auth_token": os.environ.get("BEEMINDER_API_KEY"),
        "value": 1,
        "comment": "Automated update from AWS Lambda",
    }

    req = urllib.request.Request(
        "https://www.beeminder.com/api/v1/users/haj/goals/blogposts/datapoints.json",
        data=urllib.parse.urlencode(data).encode("utf-8"),
        method="POST",
    )

    with urllib.request.urlopen(req) as response:  # noqa: S310
        return json.loads(response.read().decode("utf-8"))
