import Head from 'next/head';
import Script from 'next/script';

// Import styles
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        {/* Common meta tags and stylesheets */}
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
      </Head>
      
      {/* Vercel Analytics and Speed Insights */}
      <Script id="vercel-analytics">
        {`
          window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };
        `}
      </Script>
      <Script src="/_vercel/insights/script.js" strategy="afterInteractive" />
      <Script src="/_vercel/speed-insights/script.js" strategy="afterInteractive" />
      
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
