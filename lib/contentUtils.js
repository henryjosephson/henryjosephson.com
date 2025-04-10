import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { markdownToHtml } from './mdToHtml';
import { formatDate } from './utils';

/**
 * Get static paths for markdown content
 * @param {string} contentType - Type of content ('writing' or 'xw')
 * @returns {object} - Next.js getStaticPaths compatible object
 */
export async function getContentPaths(contentType) {
  const contentDirectory = path.join(process.cwd(), `content/${contentType}`);
  
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

/**
 * Get content data for a specific slug
 * @param {string} contentType - Type of content ('writing' or 'xw')
 * @param {string} slug - Content slug
 * @returns {object|null} - Content data or null if not found
 */
export async function getContentData(contentType, slug) {
  const contentDirectory = path.join(process.cwd(), `content/${contentType}`);
  
  // Try to find the markdown file
  const filePath = path.join(contentDirectory, `${slug}.md`);
  
  // Check if the file exists
  if (!fs.existsSync(filePath)) {
    return null;
  }

  // Read file contents
  const fileContents = fs.readFileSync(filePath, 'utf8');
  
  // Parse frontmatter
  const matterResult = matter(fileContents);
  
  // Skip unpublished content in production
  if (process.env.NODE_ENV === 'production' && matterResult.data.published === false) {
    return null;
  }
  
  // Convert markdown to HTML
  const contentHtml = await markdownToHtml(matterResult.content);

  // Format the date
  const dateFormatted = matterResult.data.date ? formatDate(matterResult.data.date) : null;

  // Return common data
  const commonData = {
    slug,
    title: matterResult.data.title || slug.replace(/-/g, ' '),
    date: dateFormatted,
    contentHtml,
    published: matterResult.data.published !== false
  };

  // Add content-specific data
  if (contentType === 'writing') {
    return {
      ...commonData,
      description: matterResult.data.description || ''
    };
  } else if (contentType === 'xw') {
    return {
      ...commonData,
      puzzleEmbed: matterResult.data.puzzleEmbed || null
    };
  }

  return commonData;
}
