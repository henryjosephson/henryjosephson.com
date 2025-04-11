import Layout from '../../components/Layout';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { markdownToHtml } from '../../lib/mdToHtml';

export default function NowPage({ content, lastUpdated }) {
  return (
    <Layout title="Now - Henry Josephson" activePage="now">
      <header>
        <h1><span className="latex">Now</span></h1>
        {lastUpdated && (
          <p className="last-updated">Last updated: {lastUpdated}</p>
        )}
      </header>
      
      <article>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </article>
    </Layout>
  );
}

export async function getStaticProps() {
  // Path to the now page markdown file
  const filePath = path.join(process.cwd(), 'content/now.md');
  
  // Default content if file doesn't exist
  let content = "<p>This page will be updated soon with what I'm working on now.</p>";
  let lastUpdated = null;
  
  // Check if the file exists
  if (fs.existsSync(filePath)) {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const matterResult = matter(fileContents);
    
    // Convert markdown to HTML
    content = await markdownToHtml(matterResult.content);
    lastUpdated = matterResult.data.lastUpdated || matterResult.data.date || null;
    
    // Format date properly
    if (lastUpdated) {
      if (typeof lastUpdated === 'string' && lastUpdated.match(/^\d{4}-\d{2}-\d{2}$/)) {
        // Parse date parts directly to avoid timezone issues
        const [year, month, day] = lastUpdated.split('-').map(num => parseInt(num, 10));
        // Create a formatted date string manually without using Date object to avoid timezone issues
        const months = [
          'January', 'February', 'March', 'April', 'May', 'June',
          'July', 'August', 'September', 'October', 'November', 'December'
        ];
        lastUpdated = `${months[month - 1]} ${day}, ${year}`;
      } else if (lastUpdated instanceof Date) {
        // Handle date objects
        lastUpdated = lastUpdated.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
      } else {
        // If it's another format, convert to string
        lastUpdated = String(lastUpdated);
      }
    }
  }
  
  return {
    props: {
      content,
      lastUpdated
    }
  };
}
