import { mkdirSync, readFileSync, readdirSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

import matter from 'gray-matter';

const __dirname = dirname(fileURLToPath(import.meta.url));
const contentDir = join(__dirname, '..', 'content', 'blog');
const outputDir = join(__dirname, '..', 'public', 'data');

// Create output directory if it doesn't exist
mkdirSync(outputDir, { recursive: true });

const posts = readdirSync(contentDir)
  .filter((file) => file.endsWith('.md'))
  .map((file) => {
    const content = readFileSync(join(contentDir, file), 'utf8');
    const { data, content: markdownContent } = matter(content);
    return {
      slug: file.replace('.md', ''),
      title: data.title || 'Untitled',
      date: data.date || '',
      description: data.description || '',
      content: markdownContent,
    };
  })
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

writeFileSync(join(outputDir, 'blog-posts.json'), JSON.stringify(posts));
