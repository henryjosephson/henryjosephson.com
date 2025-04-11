---
title: "Building My Own Backend: How I Set Up Email Subscriptions with AWS Lambda"
date: 2025-03-17
description: Why pay Substack to use my own domain when I can just spend hours setting up a remote backend?
published: true
---

A couple days ago, Zvi Moshowitz linked to [my analysis](https://www.henryjosephson.com/writing/RAISE-Act.html) of Alex Bores's RAISE Act in [his newsletter](https://thezvi.substack.com/p/ai-107-the-misplaced-hype-machine?open=false#%C2%A7new-york-state-bill-a06453). This was super cool in some ways (Zvi is a big fish in my AI policy pond), but less cool in others: it made me realize that I didn't have a way to capture inbound interest! Some of the people who clicked through took the effort to add me on LinkedIn (thanks!), but I can't expect everybody to do that. I want people who click in to have a low-friction way to stay in, and that means email subscriptions.

First, the elephant in the room — why not Substack? A few reasons:

1. **They'd charge me $50 to use my own domain**<br>
    This one is more out of spite — if I value my time above $20/hr (and I do), then the ~12 hours it took me to get this set up was way more expensive.[^spite] 

2. **I don't want to redo my directory structure**<br>
    I have each blogpost as an html file in the /writing directory of my root domain, and substack would need its own subdomain — something like `blog.henryjosephson.com`. I wouldn't just have to reorganize my files out of that directory, I'd have to do a whole bunch of moving. 

3. **I'm a nerd**<br>
    I like that I can write these blogposts in markdown in vscodium or obsidian, run my custom conversion script to convert it to html, then `git push origin main` once it's done!

4. **I like knowing how things work**, and I figured I could totally build a bare-bones version myself.<br>
    how hard could it be, really?
    ![](https://pbs.twimg.com/media/GlHlnEGWYAAmYGS?format=jpg&name=small)
    (h/t [@AlecStapp](https://twitter.com/AlecStapp/status/1896549380020379851))

    I could learn some things about AWS along the way, and their wide free tier offerings mean that I'd be very, very happy if I was getting enough traffic for costs to be meaningful.

So I did some digging and found [Ben Kuhn's blog](https://benkuhn.net). After some `View Source`-ing, it looks like he's doing something similar. So I figured, if an engineer at a $60 billion dollar software company can build their own backend, why can't I?

## Basic Architecture

When I was looking into ways to easily send emails, AWS's aptly-named Simple Email Service came up a lot. Yeah, you have to be a bit more technical than your average substack publisher or mailgun api-caller, but I figured I clear that bar. 

After thinking through what I needed for a bare-minimum newsletter system, I sketched out an architecture that looks something like this:

1. **AWS DynamoDB**: A simple database to store email addresses
2. **AWS Lambda**: Serverless functions that handle subscriptions, confirmations, unsubscribes, and sending newsletters
3. **AWS SES**: To actually send the emails
4. **AWS API Gateway**: To create endpoints my site can talk to
5. **GitHub Webhook**: To detect when I publish new content

The beauty of this setup is that it's entirely serverless — I don't have to manage any infrastructure, and I only pay for what I use. At my traffic levels, this means I'll probably stay comfortably within AWS's free tier for the foreseeable future.[^2]

## Setting Up the Backend

### DynamoDB: The World's Simplest Email Database

First, I created a DynamoDB table with a very simple structure:

```json
{
  "email": "reader@example.com",  // Primary key
  "confirmed": true,              // Has the subscription been confirmed?
  "confirmation_token": "abc123", // Token for confirming subscription
  "unsubscribe_token": "xyz456", // Token for unsubscribing
  "timestamp": 1717171717,       // When they subscribed
  "last_email_sent": "2025-03-15" // Last time we sent them an email
}
```

That's it — just enough to keep track of who's subscribed, whether they've confirmed, and tokens to manage the subscription process.

### Lambda Functions: Where the Magic Happens

Next came the Lambda functions. I created four of them:

1. **subscribe_handler**: Processes new subscription requests and sends confirmation emails
2. **confirm_subscription**: Verifies confirmation tokens and marks subscribers as confirmed
3. **unsubscribe_handler**: Processes unsubscribe requests
4. **send_newsletter**: Triggered by GitHub webhook when new content is published

The subscription handler was probably the most interesting one, so here's a simplified version of what it looks like:

```python
# Pseudocode for subscription handler Lambda
def subscribe_handler(event):
    # Get config settings from environment
    config = load_environment_variables()
    
    # Connect to AWS services
    db = connect_to_dynamodb()
    email_service = connect_to_ses()
    
    # Extract email from request (handles both JSON and form data)
    email = extract_email_from_request(event)
    
    # Validate email format
    if not is_valid_email(email):
        return error_response("Invalid email address")
    
    # Generate unique tokens for confirmation and unsubscribe
    tokens = generate_security_tokens()
    
    # Store subscriber info in DynamoDB with unconfirmed status
    db.store_subscriber({
        "email": email,
        "confirmed": False,
        "confirmation_token": tokens["confirmation"],
        "unsubscribe_token": tokens["unsubscribe"],
        "timestamp": current_timestamp(),
        "last_email_sent": None
    })
    
    # Build confirmation URL for email
    confirmation_url = f"{config.api_url}/confirm?token={tokens['confirmation']}"
    
    # Send confirmation email
    email_service.send_templated_email(
        to=email,
        template="confirmation-template",
        data={"confirmation_url": confirmation_url}
    )
    
    # Return success response
    return success_response("Subscription initiated. Please check your email to confirm.")
```

I won't bore you with the code for the other Lambda functions, but they follow a similar pattern: get the request, validate inputs, interact with DynamoDB, and send emails as needed.[^3]

### SES: Setting Up Email Templates

To make the emails look halfway decent, I created two templates in SES:

1. **Confirmation Template**: For when someone first subscribes
2. **Newsletter Template**: For when I publish new content

Here's what the newsletter template looks like:

```json
{
    "Template": {
        "TemplateName": "newsletter-template",
        "SubjectPart": "New Post: {{post_title}}",
        "HtmlPart": "HTML email template with post title, date, URL, and unsubscribe link",
        "TextPart": "Plain text version of the email with the same information"
    }
}
```

Nothing fancy, just a clean template that includes the post title, date, URL, and an unsubscribe link.

### API Gateway: Connecting the Outside World

To make all of this accessible from my website, I set up an API Gateway with four endpoints:

1. `/subscribe` (POST): Connected to the subscribe_handler Lambda
2. `/confirm` (GET): Connected to the confirm_subscription Lambda
3. `/unsubscribe` (GET): Connected to the unsubscribe_handler Lambda
4. `/webhook` (POST): Connected to the send_newsletter Lambda

The first three are pretty straightforward — they let users subscribe, confirm their subscription, and unsubscribe. The webhook endpoint is where things get interesting.

## The GitHub Webhook: Automating Newsletters

Since my site is hosted on GitHub Pages, I needed a way to detect when I publish new content. That's where the GitHub webhook comes in.

In my repository settings, I set up a webhook that triggers on push events to the main branch. When I push a new HTML file to the `writing/` directory, GitHub sends a payload to my webhook endpoint.

The `send_newsletter` Lambda function parses this payload, checks if there's a new HTML file in the `writing/` directory, and if there is, it:

1. Extracts the title and date from the HTML
2. Constructs the post URL
3. Fetches all confirmed subscribers from DynamoDB
4. Sends each subscriber an email using the newsletter template

The coolest part was figuring out how to parse the HTML to extract the post title and date. Here's a snippet:

```python
def extract_post_data(html_content, file_path):
    """Extract title, date, and other metadata from HTML content."""
    # Look for the post title in a few places:
    # 1. <title> tag
    # 2. <h1 id="title"> tag
    # 3. Fallback to the filename without .html
    title = find_title_in_html(html_content) or get_title_from_filename(file_path)
    
    # Look for the post date in:
    # <p class="author">Henry Josephson<br>March 05, 2025</p>
    date = find_date_in_html(html_content) or get_current_date()
    
    # Return structured data
    return {
        'title': title,
        'date': date,
        'path': file_path
    }
```

This works for my site because my HTML follows a consistent pattern, with the post title in the `<title>` tag and the date in a paragraph with the class "author".

## Frontend Integration: The Subscribe Form

The final piece of the puzzle was adding a subscription form to my website. I wanted something minimal that wouldn't clutter my clean LaTeX-inspired design.

After looking at Ben Kuhn's site for inspiration, I went with something like this:

```html
<!-- HTML Form -->
<p>If you like what I write, get new posts emailed to you:
  <span class="email-control">
    <input type="email" id="emailInput" placeholder="you@example.com">
    <button id="subscribeButton">subscribe</button>
    <span id="subscribeMessage"></span>
  </span>
</p>

<!-- JavaScript -->
<script>
  // When subscribe button is clicked
  subscribeButton.addEventListener('click', function() {
    // Get the email input value
    const email = emailInput.value;
    
    // Show "Sending..." message
    subscribeMessage.textContent = 'Sending...';
    subscribeMessage.style.display = 'inline-block';
    
    // Send POST request to the API
    fetch('https://my-api-gateway-url.amazonaws.com/subscribe', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ email: email })
    })
    .then(handleResponse)
    .then(showSuccessMessage)
    .catch(showErrorMessage);
  });
</script>
```

With a bit of CSS to style it, the result is a clean, unobtrusive form that fits with the rest of my site.

## Lessons Learned

Building this system was a fun weekend project, but it wasn't without its challenges:

1. **AWS Configuration**: Setting up all the permissions correctly took longer than I expected. IAM policies are powerful but confusing.

2. **Email Deliverability**: Getting out of the SES sandbox required submitting a support ticket and waiting for approval.[^4] Claude was incredibly helpful here — it helped me draft a professional-sounding request that made it seem like I'd done this sort of thing before, patio11-style. AWS approved my production access within 24 hours.

3. **Webhook Security**: Properly securing the GitHub webhook took some trial and error.

4. **Error Handling**: I didn't anticipate all the ways API Gateway requests could be formatted, leading to some early bugs.

5. **CORS and API Headers**: The toughest part was actually getting the JavaScript to send requests with headers that the AWS API would accept. There was a fair amount of back-and-forth debugging cross-origin resource sharing issues and content-type headers before everything worked smoothly. Surprisingly, once I got past that hurdle, everything else went more smoothly than expected - Claude's code suggestions were remarkably functional.

I learned a ton about AWS services and serverless architecture through this project, and I now have a system I fully understand and control!

## Privacy and Data Control

One aspect I take seriously is how I handle subscriber data. By keeping the system in-house:

- Only I can access the email database
- Emails are fully deleted from the table if someone requests removal, not just marked inactive
- I can personally ensure subscriber information doesn't get shared with third parties

On the off-chance that anybody thinks my email list is juicy enough to sell, I can sleep easily knowing that I'm the one who gets to tell them to fuck off. This kind of control just isn't possible with most third-party newsletter services, where your subscribers become part of their larger database.

Is it the main benefit? No. I mostly just liked messing around and building this. But it's definitely nice.

## The Bottom Line

The entire setup costs me practically nothing to run. With AWS's free tier, I can send 62,000 emails per month for free for the first 12 months, and the lambdas and dynamodb storage will, at my scale, be free forever. Once my free trial of the email service ends in a year, I'll have to pay $0.10 per 1,000 emails. I'd be shocked if I'm spending more than $0.50 in email costs over a calendar year.[^5]

Before setting this up, I did research alternatives:

- Ghost charges $9/month minimum, unless I self-host, and we aren't there yet[^6]
- Beehiiv starts free, but I'd have to reorganize all my directories if I moved
- Buttondown charges $9/month once you pass 99 subscribers

Given that my only costs are from actually sending the emails, none of these alternatives made financial sense. Even if I reach 1,000 subscribers and send weekly emails, my monthly cost would be about $0.40 after the free tier ends - compared to $9+ with most platforms.[^7]

But more importantly, I have complete control over my subscription system. I can modify it however I want, integrate it with other systems, and know exactly what's happening under the hood.

After all the effort I've put in, I'd love it if you could help me test my system out:

<!--subscribe-->

[^2]: AWS's free tier includes 1 million Lambda requests per month, 25GB of DynamoDB storage, and 62,000 SES emails per month when sent from Lambda. If you're reading this, you're probably one of my first dozen subscribers, so I think I'm safe.

[^3]: I've simplified the code for readability. The actual functions include more error handling, logging, and input validation.

[^4]: AWS puts new SES accounts in a "sandbox" mode where you can only send emails to verified addresses. To send to the general public, you need to request production access, which involves explaining your email sending practices and confirming you'll follow anti-spam guidelines.

[^5]: BOTEC -- to pay more than $0.5/year, I'd need to send 5,000 emails/year. Assuming a blog post a month, I'd need to get to $$\dfrac{5000}{12}\approx417$$ subscribers. I'd be pretty happy if we can get that far.

[^6]: Emphasis on "yet."

[^7]: Convertkit [pricing](https://kit.com/pricing) doesn't actually look that crazy, and is what I'll probably switch to if this gets annoying.

[^spite]: In fairness, the $50 is a one-time fee, not a subscription. But when I found out Substack wanted money to use *my own domain*, something in me just rebelled.