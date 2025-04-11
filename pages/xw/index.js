import Layout from '../../components/Layout';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';

export default function CrosswordsIndex({ puzzles }) {
  return (
    <Layout title="Crosswords - Henry Josephson" activePage="xw">
      <header>
        <h1><span className="latex">Crosswords</span></h1>
      </header>
      
      <div className="abstract">
        <h2>Abstract</h2>
        <p>
          I make crossword puzzles! You can solve some of them in the <a href="https://www.xwordinfo.com/Thumbs?author=Henry+Josephson"><i>New York Times</i></a> and the <a href="https://chicagomaroon.com/staff_name/henry-josephson/"><i>Chicago Maroon</i></a>.
        </p>
        <p>
          This page features additional puzzles I've created that are available to solve online.
        </p>
      </div>

      <div className="puzzles-list">
        <h2>Available Puzzles</h2>
        {puzzles.length > 0 ? (
          <ul>
            {puzzles.map((puzzle) => (
              <li key={puzzle.slug}>
                <Link href={`/xw/${puzzle.slug}`}>
                  {puzzle.title}
                </Link>
                <span className="puzzle-date"> — {puzzle.date}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p>New puzzles coming soon!</p>
        )}
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  // Path to the crossword directory
  const contentDirectory = path.join(process.cwd(), 'content/xw');
  
  // Default empty array if directory doesn't exist
  let puzzles = [];
  
  // Check if the directory exists
  if (fs.existsSync(contentDirectory)) {
    const filenames = fs.readdirSync(contentDirectory);
    const markdownFiles = filenames.filter(filename => filename.endsWith('.md'));
    
    // Process each file
    puzzles = markdownFiles.map(filename => {
      const slug = filename.replace(/\.md$/, '');
      const fullPath = path.join(contentDirectory, filename);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      
      // Parse frontmatter
      const matterResult = matter(fileContents);
      
      // Format date if needed
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
      
      return {
        slug,
        title: matterResult.data.title || slug.replace(/-/g, ' '),
        date: dateFormatted || '',
        published: matterResult.data.published !== false
      };
    })
    // Filter out unpublished puzzles in production
    .filter(puzzle => process.env.NODE_ENV !== 'production' || puzzle.published)
    // Sort by date (newest first)
    .sort((a, b) => {
      if (a.date < b.date) {
        return 1;
      } else {
        return -1;
      }
    });
  }
  
  return {
    props: {
      puzzles
    }
  };
}
