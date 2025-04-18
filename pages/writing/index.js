import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Layout from '../../components/Layout';
import Link from 'next/link';
import SubscribeForm from '../../components/SubscribeForm';

export default function WritingIndex({ posts }) {
  return (
    <Layout title="Writing - Henry Josephson" activePage="writing">
      <header>
        <h1><span className="latex">Writing</span></h1>
      </header>
      
      <div className="abstract">
        <div className="subscribe-here">
          <SubscribeForm />
        </div>
        <p>Check out my paper <a href="/assets/Josephson_LLM-e_Guess_2025.pdf">LLM-e Guess (2025)</a> that my team at UChicago XLAB put out, evaluating the relationship between algorithmic improvements and compute in advancing LLM capabilities. We classify algorithmic improvements into compute-dependent and compute-independent, and offer recommendations for policymakers.</p>
      </div>

      <ul id="post-list">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/writing/${post.slug}`}>
              {post.title}
            </Link>
            <span className="date"> ({post.date})</span>
            {post.description && (
              <div className="teaser">{post.description}</div>
            )}
          </li>
        ))}
      </ul>
    </Layout>
  );
}

export async function getStaticProps() {
  // Get files from the content/writing directory
  const contentDirectory = path.join(process.cwd(), 'content/writing');
  
  // Check if directory exists, if not, return empty posts array
  if (!fs.existsSync(contentDirectory)) {
    return {
      props: {
        posts: []
      }
    };
  }
  
  const filenames = fs.readdirSync(contentDirectory);
  const markdownFiles = filenames.filter(filename => filename.endsWith('.md'));

  const allPostsData = markdownFiles.map(filename => {
    // Remove ".md" from filename to get slug
    const slug = filename.replace(/\.md$/, '');
    
    // Read markdown file as string
    const fullPath = path.join(contentDirectory, filename);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    
    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Format date if it's in ISO format
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
    }
    
    // Combine the data with the slug
    return {
      slug,
      title: matterResult.data.title || slug.replace(/-/g, ' '),
      date: dateFormatted,
      description: matterResult.data.description || '',
      published: matterResult.data.published !== false
    };
  })
  // Filter out unpublished posts in production
  .filter(post => process.env.NODE_ENV !== 'production' || post.published)
  // Sort posts by date (newest first)
  .sort((a, b) => {
    // Convert dates to Date objects if they're strings
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    // Sort in descending order (newest first)
    return dateB - dateA;
  });

  return {
    props: {
      posts: allPostsData
    }
  };
}
