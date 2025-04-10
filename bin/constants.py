"""constants to import -- mostly html headers"""

HTML_TEMPLATE = """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="google-site-verification" content="tm5Y6ZNTf-lBqbwniGjQPv1q02o2TuUQZ9GTYa4SMLg" />
    <title>
        <!-- title -->
    </title>
    <meta name="description"
        content="Henry Josephson's personal website. Crosswords, AI Policy, Philosophy" />
    <meta property="og:title" content="<!-- title -->" />
    <meta property="og:url" content="https://www.henryjosephson.com" />
    <meta property="og:description"
        content="Henry Josephson's personal website. Crosswords, AI Policy, Philosophy." />
    <meta property="og:type" content="website" />

    <link rel="stylesheet" href="/css/style.css">
    <link rel="stylesheet" href="/css/prism.css">
    <link rel="stylesheet" href="/emails.css">
    <link rel="stylesheet" href="/css/header.css">
    <script src="/js/subscribe.js"></script>
    <script src="/js/prism.js"></script>

    <!-- Vercel Analytics and Speed Insights -->
    <script>
      window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };
    </script>
    <script defer src="/_vercel/insights/script.js"></script>
    <script defer src="/_vercel/speed-insights/script.js"></script>
</head>
<body id="top" class="latex-dark-auto">
    <div class="site-header">
        <a href="/">Home</a>
        <a href="/writing" class="active">Writing</a>
        <a href="/xw">Crosswords</a>
        <a href="/now">Now</a>
    </div>
    <header>
        <h1 id="title"><span class="latex">
            <!-- title -->
        </h1>
        <p class="author">
            Henry Josephson<br><!-- date -->
        </p>
    </header>
    <div class="subscribe-here" style="text-align: center;"></div>
    <!-- body text -->
</body>
</html>
"""

INDEX_TEMPLATE = """<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="google-site-verification" content="tm5Y6ZNTf-lBqbwniGjQPv1q02o2TuUQZ9GTYa4SMLg" />
  <title>Henry Josephson - Writing</title>

  <meta name="description"
    content="Henry Josephson's blog. AI Policy, Philosophy, and more." />
  <meta property="og:title" content="Henry Josephson - Writing" />
  <meta property="og:url" content="https://www.henryjosephson.com/writing" />
  <meta property="og:description"
    content="Henry Josephson's blog. AI Policy, Philosophy, and more." />
  <meta property="og:type" content="website" />

  <link rel="stylesheet" href="/css/style.css">
  <link rel="stylesheet" href="/css/prism.css">
  <link rel="stylesheet" href="/emails.css">
  <link rel="stylesheet" href="/css/header.css">
  <script src="/js/subscribe.js"></script>
  <script src="/js/prism.js"></script>
  <style>
    .date {
      color: var(--body-color);
      opacity: 0.7;
      font-size: 0.9em;
    }
    #post-list {
      list-style-type: none;
      padding-left: 0;
    }
    #post-list li {
      margin-bottom: 20px;
    }
    .teaser {
      margin-top: 4px;
      margin-left: 1.5em;
      color: var(--body-color);
      opacity: 0.8;
      font-size: 0.9em;
      line-height: 1.4;
    }
  </style>
</head>

<body id="top" class="latex-dark-auto">
  <div class="site-header">
    <a href="/">Home</a>
    <a href="/writing" class="active">Writing</a>
    <a href="/xw">Crosswords</a>
    <a href="/now">Now</a>
  </div>
  <header>
    <h1><span class="latex">Writing</h1>
  </header>

  <div class="abstract">
    <h2>Posts</h2>
    <p>
      Below is a list of my blog posts and articles.
    </p>
    <div class="subscribe-here"></div>
    <ul id="post-list">
      <!-- Posts will be inserted here -->
    </ul>
  </div>
</body>
</html>
"""
