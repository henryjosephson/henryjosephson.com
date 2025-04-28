const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// Use the same extraction logic from your existing code
function extractAllOutlinks() {
  const contentDirectory = path.join(process.cwd(), 'content/writing');
  
  // Check if directory exists
  if (!fs.existsSync(contentDirectory)) {
    return [];
  }
  
  const filenames = fs.readdirSync(contentDirectory);
  const markdownFiles = filenames.filter(filename => filename.endsWith('.md'));
  
  let allOutlinks = [];
  
  markdownFiles.forEach(filename => {
    const filePath = path.join(contentDirectory, filename);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    
    const { content } = matter(fileContents);
    
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    let match;
    
    while ((match = linkRegex.exec(content)) !== null) {
      const text = match[1];
      const url = match[2];
      
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

// Generate the JSON file
const outlinks = extractAllOutlinks();
const publicDir = path.join(process.cwd(), 'public');

// Make sure the public directory exists
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir);
}

fs.writeFileSync(
  path.join(publicDir, 'outlinks.json'),
  JSON.stringify(outlinks),
  'utf8'
);

console.log(`Generated outlinks.json with ${outlinks.length} links`);