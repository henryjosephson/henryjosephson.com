import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Layout from '../../components/Layout';
import Head from 'next/head';
import SubscribeForm from '../../components/SubscribeForm';
import { useEffect } from 'react';
import { markdownToHtml } from '../../lib/mdToHtml';

// Custom component for rendering markdown content with sidenotes
function PostContent({ content }) {
  useEffect(() => {
    // Initialize Prism.js for syntax highlighting
    if (typeof window !== 'undefined' && window.Prism) {
      window.Prism.highlightAll();
    }
  }, []);

  return <div dangerouslySetInnerHTML={{ __html: content }} />;
}

export default function Post({ postData }) {
  if (!postData) {
    return <div>Article not found</div>;
  }

  return (
    <Layout 
      title={postData.title} 
      description={postData.description || `${postData.title} - Henry Josephson`}
      activePage="writing"
    >
      <Head>
        <meta property="og:title" content={postData.title} />
        <meta property="og:type" content="article" />
        <meta property="og:description" content={postData.description || `${postData.title} - Henry Josephson`} />
        <meta property="article:published_time" content={postData.date} />
      </Head>

      <header>
        <h1 id="title"><span className="latex">
          {postData.title}
        </span></h1>
        <p className="author">
          Henry Josephson<br />{postData.date}
        </p>
      </header>

      <div className="subscribe-here" style={{ textAlign: 'center' }}>
        <SubscribeForm />
      </div>

      <article>
        <PostContent content={postData.contentHtml} />
      </article>
    </Layout>
  );
}

export async function getStaticPaths() {
  // Get all markdown files in the content/writing directory
  const contentDirectory = path.join(process.cwd(), 'content/writing');
  
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
    fallback: 'blocking' // Show 404 for non-existent posts
  };
}

export async function getStaticProps({ params }) {
  const { slug } = params;
  const contentDirectory = path.join(process.cwd(), 'content/writing');
  
  // Try to find the markdown file
  const filePath = path.join(contentDirectory, `${slug}.md`);
  
  // Check if the file exists
  if (!fs.existsSync(filePath)) {
    // If not, return null props so the page will display "Article not found"
    return {
      props: {
        postData: null
      }
    };
  }

  // Read file contents
  const fileContents = fs.readFileSync(filePath, 'utf8');
  
  // Parse frontmatter
  const matterResult = matter(fileContents);
  
  // Skip unpublished posts in production (show them in development for preview)
  if (process.env.NODE_ENV === 'production' && matterResult.data.published === false) {
    return {
      notFound: true
    };
  }
  
  // Convert markdown to HTML with sidenotes processing
  const contentHtml = await markdownToHtml(matterResult.content);

  // Format the date nicely
  let dateFormatted = '';
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
  } else {
    // Default to current date
    dateFormatted = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  return {
    props: {
      postData: {
        slug,
        title: matterResult.data.title || slug.replace(/-/g, ' '),
        date: dateFormatted || new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }),
        description: matterResult.data.description || '',
        contentHtml,
        published: matterResult.data.published !== false
      }
    }
  };
}
