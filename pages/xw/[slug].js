import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { markdownToHtml } from '../../lib/mdToHtml';
import Layout from '../../components/Layout';
import { useEffect } from 'react';
import Head from 'next/head';

export default function CrosswordPuzzle({ puzzleData }) {
  useEffect(() => {
    // Initialize any scripts needed for crossword functionality
    if (typeof window !== 'undefined' && window.Prism) {
      window.Prism.highlightAll();
    }
  }, []);

  if (!puzzleData) {
    return <div>Puzzle not found</div>;
  }

  return (
    <Layout 
      title={`${puzzleData.title} - Henry Josephson`} 
      description={`Crossword Puzzle: ${puzzleData.title}`}
      activePage="xw"
    >
      <Head>
        <meta property="og:title" content={puzzleData.title} />
        <meta property="og:type" content="article" />
        {puzzleData.date && (
          <meta property="article:published_time" content={puzzleData.date} />
        )}
      </Head>

      <header>
        <h1 id="title"><span className="latex">
          {puzzleData.title}
        </span></h1>
        {puzzleData.date && (
          <p className="author">
            Henry Josephson<br />{puzzleData.date}
          </p>
        )}
      </header>

      <article>
        <div dangerouslySetInnerHTML={{ __html: puzzleData.contentHtml }} />
        {puzzleData.puzzleEmbed && (
          <div className="puzzle-embed" dangerouslySetInnerHTML={{ __html: puzzleData.puzzleEmbed }} />
        )}
      </article>
    </Layout>
  );
}

export async function getStaticPaths() {
  // Get all markdown files in the content/xw directory
  const contentDirectory = path.join(process.cwd(), 'content/xw');
  
  // Check if directory exists, if not, return empty paths
  if (!fs.existsSync(contentDirectory)) {
    return {
      paths: [],
      fallback: 'blocking'
    };
  }
  
  const filenames = fs.readdirSync(contentDirectory);
  const markdownFiles = filenames.filter(filename => filename.endsWith('.md'));

  // Get the slugs (filename without .md extension)
  const paths = markdownFiles.map(filename => {
    return {
      params: {
        slug: filename.replace(/\.md$/, '')
      }
    };
  });

  return {
    paths,
    fallback: 'blocking'
  };
}

export async function getStaticProps({ params }) {
  const { slug } = params;
  const contentDirectory = path.join(process.cwd(), 'content/xw');
  
  // Try to find the markdown file
  const filePath = path.join(contentDirectory, `${slug}.md`);
  
  // Check if the file exists
  if (!fs.existsSync(filePath)) {
    return {
      props: {
        puzzleData: null
      }
    };
  }

  // Read file contents
  const fileContents = fs.readFileSync(filePath, 'utf8');
  
  // Parse frontmatter
  const matterResult = matter(fileContents);
  
  // Skip unpublished puzzles in production
  if (process.env.NODE_ENV === 'production' && matterResult.data.published === false) {
    return {
      notFound: true
    };
  }
  
  // Convert markdown to HTML
  const contentHtml = await markdownToHtml(matterResult.content);

  // Format the date nicely
  let dateFormatted = null;
  if (matterResult.data.date) {
    if (typeof matterResult.data.date === 'string' && matterResult.data.date.match(/^\d{4}-\d{2}-\d{2}$/)) {
      // Parse date parts directly to avoid timezone issues
      const [year, month, day] = matterResult.data.date.split('-').map(num => parseInt(num, 10));
      // Create a formatted date string manually without using Date object to avoid timezone issues
      const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ];
      dateFormatted = `${months[month - 1]} ${day}, ${year}`;
    } else if (matterResult.data.date instanceof Date) {
      // Handle date objects
      dateFormatted = matterResult.data.date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } else {
      // If it's another format, convert to string
      dateFormatted = String(matterResult.data.date);
    }
  }

  return {
    props: {
      puzzleData: {
        slug,
        title: matterResult.data.title || slug.replace(/-/g, ' '),
        date: dateFormatted || null,
        contentHtml,
        puzzleEmbed: matterResult.data.puzzleEmbed || null,
        published: matterResult.data.published !== false
      }
    }
  };
}
