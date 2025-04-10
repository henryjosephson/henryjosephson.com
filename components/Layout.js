import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Layout({ children, title, description, activePage }) {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Initialize Prism.js for syntax highlighting
    if (typeof window !== 'undefined' && window.Prism) {
      window.Prism.highlightAll();
    }
  }, []);

  // Add effect to set dark mode class
  useEffect(() => {
    // Check if we're in the browser environment
    if (typeof window === 'undefined') return;
    
    // Check for stored preference
    const storedDarkMode = localStorage.getItem('darkMode');
    
    // Apply the body class based on user preference or system preference
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const prefersDarkMode = darkModeMediaQuery.matches;
    
    // Use stored preference if available, otherwise use system preference
    let shouldUseDarkMode;
    
    if (storedDarkMode !== null) {
      shouldUseDarkMode = storedDarkMode === 'true';
    } else {
      shouldUseDarkMode = prefersDarkMode;
    }
    
    setDarkMode(shouldUseDarkMode);
    
    // Apply the appropriate class to both html and body
    if (storedDarkMode !== null) {
      // If user has explicit preference, use latex-dark
      document.documentElement.classList.toggle('latex-dark', shouldUseDarkMode);
      document.body.classList.toggle('latex-dark', shouldUseDarkMode);
      
      document.documentElement.classList.remove('latex-dark-auto');
      document.body.classList.remove('latex-dark-auto');
    } else {
      // If using system preference, use latex-dark-auto
      document.documentElement.classList.toggle('latex-dark-auto', true);
      document.body.classList.toggle('latex-dark-auto', true);
      
      document.documentElement.classList.remove('latex-dark');
      document.body.classList.remove('latex-dark');
    }
    
    // Listen for system preference changes if no explicit preference is set
    const handleSystemPreferenceChange = (e) => {
      if (localStorage.getItem('darkMode') === null) {
        setDarkMode(e.matches);
      }
    };
    
    darkModeMediaQuery.addEventListener('change', handleSystemPreferenceChange);
    
    return () => darkModeMediaQuery.removeEventListener('change', handleSystemPreferenceChange);
  }, []);
  
  // Toggle dark mode
  const toggleDarkMode = () => {
    if (typeof window === 'undefined') return;
    
    const newMode = !darkMode;
    setDarkMode(newMode);
    
    // Remove the auto class and apply the explicit preference to both html and body
    document.documentElement.classList.remove('latex-dark-auto');
    document.body.classList.remove('latex-dark-auto');
    
    document.documentElement.classList.toggle('latex-dark', newMode);
    document.body.classList.toggle('latex-dark', newMode);
    
    // Store the preference
    localStorage.setItem('darkMode', newMode.toString());
  };

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
            {darkMode ? '○' : '●'}
          </button>
        </div>
        
        {children}
      </div>
    </>
  );
}