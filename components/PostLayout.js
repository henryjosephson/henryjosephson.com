import Head from 'next/head';
import Layout from './Layout';
import { useEffect } from 'react';

/**
 * Shared layout component for posts (writing) and puzzles (crosswords)
 */
export default function PostLayout({ 
  children, 
  title, 
  description, 
  date, 
  author = 'Henry Josephson',
  activePage,
  ogType = 'article'
}) {
  useEffect(() => {
    // Initialize Prism.js for syntax highlighting
    if (typeof window !== 'undefined' && window.Prism) {
      window.Prism.highlightAll();
    }
  }, []);

  return (
    <Layout 
      title={title} 
      description={description}
      activePage={activePage}
    >
      <Head>
        <meta property="og:title" content={title} />
        <meta property="og:type" content={ogType} />
        <meta property="og:description" content={description} />
        {date && (
          <meta property="article:published_time" content={date} />
        )}
      </Head>

      <header>
        <h1 id="title"><span className="latex">
          {title}
        </span></h1>
        {date && (
          <p className="author">
            {author}<br />{date}
          </p>
        )}
      </header>

      <article>
        {children}
      </article>
    </Layout>
  );
}
