---
layout: post
---
# Kamalaharris.org redirects to joebiden.com... for now
Unless you've been living under a rock, you might've noticed that Joe Biden has announced that [he's stepping out of the 2024 presidential race](https://www.nytimes.com/live/2024/07/21/us/biden-drops-out-election), and that he's endorsed his vice president, Kamala Harris, as his replacement.

Like all of you, I immediately asked myself the obvious question: *when will [https://kamalaharris.org](https://kamalaharris.org) stop redirecting to [https://joebiden.com](https://joebiden.com?)?*

I set up a simple cron job to do this, running the following every minute:
```zsh
#!/usr/bin/env zsh

# Set the URLs
SOURCE_URL="https://kamalaharris.org"
EXPECTED_DESTINATION="https://joebiden.com/"

# Perform the curl request and get the final URL
FINAL_URL=$(curl -Ls -o /dev/null -w %{url_effective} "$SOURCE_URL")

# Check if the final URL matches the expected destination
if [[ "$FINAL_URL" != "$EXPECTED_DESTINATION" ]]; then
    # If it doesn't match, send a notification
    echo "Alert: $SOURCE_URL is no longer redirecting to $EXPECTED_DESTINATION"

    curl --ssl-reqd \
        --url 'smtps://smtp.gmail.com:465' \
        --user '<not publishing this email>@gmail.com:<password>' \
        --mail-from '<not publishing this email>@gmail.com' \
        --mail-rcpt 'henry@josephson.net' \ # *this* email can be public, though. Send me your favorite wikipedia article!
        --upload-file 'mail.txt'
fi
```

Troubleshooting was fun — I spent a few minutes getting an email every minute, until I realized that I'd set `EXPECTED_DESTINATION` to https://joebiden.com, when `FINAL_URL` was returning https://joebiden.com/. It's the little things!

The only other thing to note is that I now know how to send emails via `curl`! I initially intended to send it through the `mail` command, but it turns out I'd need to set up a local mail server to successfully send mail over the internet, which I'm not about to do.

As is the case with pretty much every road bump on the internet, though, [someone else had the problem before me](https://stackoverflow.com/questions/14722556/using-curl-to-send-email), so I just implemented that.

I'll update this post if/when the actual redirect changes!