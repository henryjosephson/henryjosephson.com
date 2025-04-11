import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Single CSS file for base styles */}
        <link rel="stylesheet" href="/css/main.css" />
        {/* Syntax highlighting */}
        <link rel="stylesheet" href="/css/prism.css" />
        {/* Accessibility overrides for syntax highlighting */}
        <link rel="stylesheet" href="/css/prism-override.css" />
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
