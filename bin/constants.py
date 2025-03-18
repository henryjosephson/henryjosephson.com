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

    <link rel="stylesheet" href="https://latex.vercel.app/style.css">
    <link rel="stylesheet" href="https://latex.vercel.app/prism/prism.css">
    <link rel="stylesheet" href="/emails.css">
    <script src="/js/subscribe.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/prismjs/prism.min.js"></script>
</head>
<body id="top" class="latex-dark-auto">
    <div style="text-align: center">
        <a href="../">henryjosephson.com</a>
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

  <link rel="stylesheet" href="https://latex.vercel.app/style.css">
  <link rel="stylesheet" href="https://latex.vercel.app/prism/prism.css">
  <link rel="stylesheet" href="/emails.css">
  <script src="/js/subscribe.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/prismjs/prism.min.js"></script>
  <style>
    .date {
      color: #aaa;
      font-size: 0.9em;
    }
    #post-list {
      list-style-type: none;
      padding-left: 0;
    }
    #post-list li {
      margin-bottom: 8px;
    }
  </style>
</head>

<body id="top" class="latex-dark-auto">
  <div style="text-align: center">
    <a href="../">henryjosephson.com</a>
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
