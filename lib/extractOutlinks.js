import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

/**
 * Extract all external links from markdown files in the content/writing directory
 * @returns {Array} Array of objects with url and text properties
 */
export function extractAllOutlinks() {
  const contentDirectory = path.join(process.cwd(), 'content/writing');
  
  // Check if directory exists
  if (!fs.existsSync(contentDirectory)) {
    return [];
  }
  
  const filenames = fs.readdirSync(contentDirectory);
  const markdownFiles = filenames.filter(filename => filename.endsWith('.md'));
  
  let allOutlinks = [];
  
  // Process each markdown file
  markdownFiles.forEach(filename => {
    const filePath = path.join(contentDirectory, filename);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    
    // Parse frontmatter to get just the content
    const { content } = matter(fileContents);
    
    // Extract links using regex
    // This pattern matches markdown links: [text](url)
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    let match;
    
    while ((match = linkRegex.exec(content)) !== null) {
      const text = match[1];
      const url = match[2];
      
      // Only include external links (starting with http or https)
      if (url.startsWith('http://') || url.startsWith('https://')) {
        allOutlinks.push({
          url,
          text
        });
      }
    }
  });
  
  return allOutlinks;
}

/**
 * Get a random outlink from markdown files
 * @returns {Object|null} Object with url and text properties, or null if no links found
 */
export function getRandomOutlink() {
  const outlinks = extractAllOutlinks();
  
  if (outlinks.length === 0) {
    return null;
  }
  
  // Select a random outlink
  const randomIndex = Math.floor(Math.random() * outlinks.length);
  return outlinks[randomIndex];
}
