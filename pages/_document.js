import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Using local CSS files instead of external ones */}
        <link rel="stylesheet" href="/css/style.css" />
        <link rel="stylesheet" href="/css/prism.css" />
        <link rel="stylesheet" href="/css/emails.css" />
        <link rel="stylesheet" href="/css/header.css" />
      </Head>
      <body>
        <Main />
        <NextScript />
        
        {/* Syntax highlighting */}
        <script src="/js/prism.js" defer></script>
      </body>
    </Html>
  );
}
