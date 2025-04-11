import { useState, useEffect } from 'react';

/**
 * Custom hook to manage dark mode state and preferences
 * @returns {[boolean, function]} Dark mode state and toggle function
 */
export function useDarkMode() {
  const [darkMode, setDarkMode] = useState(false);

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

  return [darkMode, toggleDarkMode];
}
