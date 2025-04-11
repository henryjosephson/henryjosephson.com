"""This is the lambda function that I use in AWS to send emails to new subscribers."""

import hashlib
import hmac
import json
import os
import re
import urllib.request
from datetime import datetime

import boto3
import yaml


def lambda_handler(event, context):
    """Triggered by GitHub webhook when new content is pushed to the writing directory.

    Sends newsletter emails to confirmed subscribers.
    """
    TEST_MODE = os.environ.get("TEST_MODE", "false").lower() == "true"
    TEST_EMAIL = os.environ.get("TEST_EMAIL", "hi@henryjosephson.com")

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
                # Check if this is a Markdown file in the content/writing directory
                if file_path.startswith("content/writing/") and file_path.endswith(
                    ".md"
                ):
                    # We'll check the published status later
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

            # Generate post URL (for Next.js dynamic routing)
            slug = os.path.basename(file_path).replace(".md", "")
            post_url = f"{WEBSITE_BASE_URL}/writing/{slug}"

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

            if TEST_MODE:
                print(f"Running in TEST MODE - only sending to {TEST_EMAIL}")

                if not TEST_EMAIL:
                    print("Error: TEST_EMAIL environment variable not set")
                    return {
                        "statusCode": 400,
                        "body": json.dumps({"message": "TEST_EMAIL not configured"}),
                    }

                # Generate a test unsubscribe token (or use a fixed one for testing)
                unsubscribe_token = "test-unsubscribe-token"

                # Generate personalized unsubscribe URL
                unsubscribe_url = (
                    f"{API_GATEWAY_URL}/unsubscribe?token={unsubscribe_token}"
                )

                # Prepare email template data with test mode indicator
                template_data = {
                    "post_title": f"[TEST] {post_data['title']}",
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
                        Destination={"ToAddresses": [TEST_EMAIL]},
                        Template=NEWSLETTER_TEMPLATE,
                        TemplateData=json.dumps(template_data),
                    )

                    sent_count = 1
                    print(f"Sent test newsletter to {TEST_EMAIL}")

                except Exception as e:
                    print(f"Error sending test email to {TEST_EMAIL}: {e!s}")
                    error_count = 1
            else:
                if not confirmed_subscribers:
                    print("No confirmed subscribers found")
                    return {
                        "statusCode": 200,
                        "body": json.dumps(
                            {"message": "No confirmed subscribers found"}
                        ),
                    }

                print(f"Found {len(confirmed_subscribers)} confirmed subscribers")

                # Send newsletter to each subscriber
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
                        "message": f'Newsletter {"TEST " if TEST_MODE else ""}sent for new post: {post_data["title"]}',
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


def parse_frontmatter(markdown_content):
    """Extract YAML frontmatter from Markdown content.

    Args:
        markdown_content (str): The full markdown content including frontmatter

    Returns:
        tuple: (metadata, content) where metadata is a dict with frontmatter
              and content is the markdown without the frontmatter
    """
    frontmatter_match = re.match(
        r"---\s+(.*?)\s+---\s*(.*)", markdown_content, re.DOTALL
    )

    if frontmatter_match:
        yaml_text = frontmatter_match.group(1)
        content = frontmatter_match.group(2)

        try:
            # Use PyYAML to parse the frontmatter
            metadata = yaml.safe_load(yaml_text)
            return metadata, content
        except Exception as e:
            print(f"Error parsing YAML frontmatter: {e!s}")
            return None, markdown_content

    return None, markdown_content


def extract_preview_from_markdown(content, word_count=50, min_length=50):
    """Extract a preview from markdown content.

    Args:
        content (str): Markdown content
        word_count (int): Number of words to include in preview
        min_length (int): Minimum length for preview to be valid

    Returns:
        str: A preview of the content
    """
    # Remove markdown headings
    text = re.sub(r"^#+\s+.*$", "", content, flags=re.MULTILINE)

    # Remove markdown image tags
    text = re.sub(r"!\[.*?\]\(.*?\)", "", text)

    # Remove markdown links but keep the text
    text = re.sub(r"\[(.*?)\]\(.*?\)", r"\1", text)

    # Remove code blocks
    text = re.sub(r"```.*?```", "", text, flags=re.DOTALL)

    # Remove inline code
    text = re.sub(r"`.*?`", "", text)

    # Remove footnotes
    text = re.sub(r"\[\^.*?\]", "", text)

    # Remove extra whitespace
    text = re.sub(r"\s+", " ", text).strip()

    # Get first ~N words
    words = text.split()
    preview = " ".join(words[:word_count]) if len(words) > word_count else text

    # If preview is too short, use a default message
    if len(preview) < min_length:
        preview = "Check out my latest post..."

    return preview


def extract_post_data(markdown_content, file_path):
    """Extract title, date, post preview, and other metadata from Markdown content.

    Args:
        markdown_content (str): Full markdown content including frontmatter
        file_path (str): Path to the markdown file

    Returns:
        dict: Post data including title, date, path, and preview
    """
    try:
        # Parse frontmatter and content
        metadata, content = parse_frontmatter(markdown_content)

        # Check if the post is published
        if not metadata or not metadata.get("published", False):
            print(f"Skipping unpublished post: {file_path}")
            return None

        # Extract title from frontmatter or first heading or filename
        title = metadata.get("title")
        if not title:
            # Try to get title from first markdown heading
            heading_match = re.search(r"^#\s+(.*)", content, re.MULTILINE)
            if heading_match:
                title = heading_match.group(1).strip()
            else:
                # Use filename as fallback
                title = (
                    os.path.basename(file_path)
                    .replace(".md", "")
                    .replace("-", " ")
                    .title()
                )

        # Extract date from frontmatter or current date
        date_str = metadata.get("date")
        if date_str:
            try:
                # Try to parse ISO format date (YYYY-MM-DD)
                date_obj = datetime.strptime(date_str, "%Y-%m-%d")
                date = date_obj.strftime("%B %d, %Y")
            except ValueError:
                # If the date is already in a readable format, use it as is
                date = date_str
        else:
            # Use current date as fallback
            date = datetime.now().strftime("%B %d, %Y")

        # Extract preview from content
        preview = extract_preview_from_markdown(content)

        # Generate path for URL (without content/ prefix and .md suffix)
        path = file_path.replace("content/", "").replace(".md", "")

        print(
            f"Extracted title: '{title}', date: '{date}', and preview: '{preview[:50]}...'"
        )

        return {"title": title, "date": date, "path": path, "preview": preview}

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
