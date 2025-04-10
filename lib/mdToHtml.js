import { remark } from 'remark';
import html from 'remark-html';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Process footnotes into sidenotes
function processFootnotesToSidenotes(content) {
  // Extract all footnote definitions and store them
  const footnotes = {};
  const contentWithoutDefs = content.replace(
    /\[\^(\d+)\]:\s*([\s\S]*?)(?=\n\[\^\d+\]:|$)/g,
    (match, footnoteNum, footnoteContent) => {
      footnotes[footnoteNum] = footnoteContent.trim();
      return ''; // Remove the definition from content
    }
  );
  
  // Now replace footnote references with complete sidenote HTML at each reference point
  const finalContent = contentWithoutDefs.replace(
    /\[\^(\d+)\]/g,
    (match, footnoteNum) => {
      if (footnotes[footnoteNum]) {
        return `<label for="sn-${footnoteNum}" class="sidenote-toggle sidenote-number"></label>
<input type="checkbox" id="sn-${footnoteNum}" class="sidenote-toggle" />
<span class="sidenote">${footnotes[footnoteNum]}</span>`;
      }
      return match; // Keep the reference if no definition found
    }
  );
  
  return finalContent;
}

// Convert footnotes from HTML to sidenotes (for remark-generated HTML)
export function convertHtmlFootnotesToSidenotes(htmlContent) {
  // Extract the footnotes section
  const footnotesSectionMatch = htmlContent.match(/<section id="footnotes".*?>(.*?)<\/section>/s);
  
  if (!footnotesSectionMatch) {
    return htmlContent;
  }
  
  // Extract footnote items from the section
  const footnoteSection = footnotesSectionMatch[1];
  const footnotes = {};
  
  // Find all footnote list items
  const footnoteLis = footnoteSection.match(/<li id="fn(\d+)">(.*?)<\/li>/gs);
  
  if (!footnoteLis) {
    return htmlContent;
  }
  
  // Process each footnote
  footnoteLis.forEach(li => {
    const matches = li.match(/<li id="fn(\d+)">(.*?)<\/li>/s);
    if (matches) {
      const fnNum = matches[1];
      let fnContent = matches[2];
      
      // Remove the backlink
      fnContent = fnContent.replace(/<a href="#fnref\d+" class="footnote-back"[^>]*>↩︎<\/a>/, "");
      
      // Handle footnotes with multiple paragraphs
      if (fnContent.trim().startsWith("<p>") && fnContent.trim().endsWith("</p>")) {
        const pTagsCount = (fnContent.match(/<p>/g) || []).length;
        if (pTagsCount === 1) {
          fnContent = fnContent.trim().replace(/^<p>(.*)<\/p>$/s, "$1");
        }
      }
      
      footnotes[fnNum] = fnContent.trim();
    }
  });
  
  // Replace footnote references with sidenotes
  let sidenoteCounter = 1;
  let htmlWithoutFootnotes = htmlContent;
  
  // Function to replace each footnote reference
  const replaceFn = (match, fnNum) => {
    if (footnotes[fnNum]) {
      const sidenoteHtml = `<label for="sn-${sidenoteCounter}" class="sidenote-toggle sidenote-number"></label>
      <input type="checkbox" id="sn-${sidenoteCounter}" class="sidenote-toggle" />
      <span class="sidenote">${footnotes[fnNum]}</span>`;
      sidenoteCounter++;
      return sidenoteHtml;
    }
    return match;
  };
  
  // Replace footnote references
  htmlWithoutFootnotes = htmlWithoutFootnotes.replace(
    /<a href="#fn(\d+)" class="footnote-ref" id="fnref\d+" role="doc-noteref"><sup>\d+<\/sup><\/a>/g,
    (match, fnNum) => replaceFn(match, fnNum)
  );
  
  // Remove the footnotes section
  return htmlWithoutFootnotes.replace(/<section id="footnotes".*?<\/section>/s, "");
}

// Process markdown content to HTML with sidenotes
export async function markdownToHtml(markdown) {
  // Process footnotes to sidenotes
  const contentWithSidenotes = processFootnotesToSidenotes(markdown);
  
  // Convert markdown to HTML
  const result = await remark()
    .use(html, { sanitize: false }) // Don't sanitize to allow custom HTML
    .process(contentWithSidenotes);
  
  // Convert HTML footnotes to sidenotes if any exist
  let htmlContent = convertHtmlFootnotesToSidenotes(result.toString());
  
  // Replace subscribe tags
  htmlContent = htmlContent.replace(/<!--subscribe-->/g, '<div class="subscribe-here"></div>');
  
  // Enhance code blocks with prism.js class
  htmlContent = htmlContent.replace(/<pre><code class="([^"]+)">/g, '<pre><code class="language-$1">');
  
  return htmlContent;
}

// Get post data for a specific slug
export async function getPostData(slug) {
  const fullPath = path.join(process.cwd(), 'content/writing', `${slug}.md`);
  
  // Check if file exists
  if (!fs.existsSync(fullPath)) {
    return null;
  }
  
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  
  // Parse frontmatter
  const matterResult = matter(fileContents);
  
  // Skip unpublished posts in production
  if (process.env.NODE_ENV === 'production' && matterResult.data.published === false) {
    return null;
  }
  
  // Convert markdown to HTML with sidenotes
  const contentHtml = await markdownToHtml(matterResult.content);
  
  // Format date if needed
  let dateFormatted = '';
  if (matterResult.data.date) {
    if (typeof matterResult.data.date === 'string' && matterResult.data.date.match(/^\d{4}-\d{2}-\d{2}$/)) {
      // Parse date parts directly to avoid timezone issues
      const [year, month, day] = matterResult.data.date.split('-').map(num => parseInt(num, 10));
      // Create date with UTC (month is 0-indexed in JS Date)
      const date = new Date(Date.UTC(year, month - 1, day));
      dateFormatted = date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: 'UTC'
      });
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
    slug,
    title: matterResult.data.title || slug.replace(/-/g, ' '),
    date: dateFormatted || new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }),
    contentHtml,
    published: matterResult.data.published !== false
  };
}

// Get sorted posts data
export async function getSortedPostsData() {
  const contentDirectory = path.join(process.cwd(), 'content/writing');
  
  // Check if directory exists
  if (!fs.existsSync(contentDirectory)) {
    return [];
  }
  
  const fileNames = fs.readdirSync(contentDirectory);
  
  const allPostsData = await Promise.all(fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map(async fileName => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(contentDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      
      // Parse frontmatter
      const matterResult = matter(fileContents);
      
      // Format date if needed
      let dateFormatted = matterResult.data.date;
      if (dateFormatted && dateFormatted.match(/^\d{4}-\d{2}-\d{2}$/)) {
        // Parse date parts directly to avoid timezone issues
        const [year, month, day] = dateFormatted.split('-').map(num => parseInt(num, 10));
        // Create date with UTC (month is 0-indexed in JS Date)
        const date = new Date(Date.UTC(year, month - 1, day));
        dateFormatted = date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          timeZone: 'UTC'
        });
      }
      
      return {
        slug,
        title: matterResult.data.title || slug.replace(/-/g, ' '),
        date: dateFormatted || '',
        published: matterResult.data.published !== false
      };
    }));
  
  // Filter out unpublished posts in production
  const publishedPosts = allPostsData.filter(post => 
    process.env.NODE_ENV !== 'production' || post.published
  );
  
  // Sort posts by date (newest first)
  return publishedPosts.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}