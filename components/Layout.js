import Head from 'next/head';
import Link from 'next/link';
import { useEffect } from 'react';
import { useDarkMode } from '../lib/hooks/useDarkMode';
import withSmartQuotes from './withSmartQuotes';

function Layout({ children, title, description, activePage }) {
  const [darkMode, toggleDarkMode] = useDarkMode();

  useEffect(() => {
    // Initialize Prism.js for syntax highlighting
    if (typeof window !== 'undefined' && window.Prism) {
      window.Prism.highlightAll();
    }
  }, []);

  return (
    <>
      <Head>
        <title>{title || 'Henry Josephson'}</title>
        <meta 
          name="description" 
          content={description || "Henry Josephson's personal website. Crosswords, AI Policy, Philosophy"} 
        />
        <meta property="og:title" content={title || 'Henry Josephson'} />
        <meta property="og:url" content="https://www.henryjosephson.com" />
        <meta 
          property="og:description" 
          content={description || "Henry Josephson's personal website. Crosswords, AI Policy, Philosophy."} 
        />
        <meta property="og:type" content="website" />
      </Head>

      <div id="top">
        <div className="site-header">
          <Link href="/" className={activePage === 'home' ? 'active' : ''}>Home</Link>
          <Link href="/writing" className={activePage === 'writing' ? 'active' : ''}>Writing</Link>
          <Link href="/xw" className={activePage === 'xw' ? 'active' : ''}>Crosswords</Link>
          <Link href="/now" className={activePage === 'now' ? 'active' : ''}>Now</Link>
          <button id="dark-mode-toggle" onClick={toggleDarkMode} className="dark-mode-button" title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}>
            <span className="circle-icon">{darkMode ? '○' : '●'}</span>
          </button>
        </div>
        
        {children}
      </div>
    </>
  );
}

// Export the Layout component wrapped with smart quotes
export default withSmartQuotes(Layout);
