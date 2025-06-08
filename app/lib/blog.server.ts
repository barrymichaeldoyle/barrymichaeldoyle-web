import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';

import matter from 'gray-matter';

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  description: string;
  content: string;
}

export function getBlogPost(slug: string): BlogPost | null {
  try {
    const filePath = join('content', 'blog', `${slug}.md`);
    const fileContents = readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug,
      title: data.title || 'Untitled',
      date: data.date || '',
      description: data.description || '',
      content,
    };
  } catch (error) {
    console.error('Error reading blog post:', error);
    return null;
  }
}

export function getAllBlogPosts(): BlogPost[] {
  try {
    const blogDir = join('content', 'blog');
    const filenames = readdirSync(blogDir).filter((name) =>
      name.endsWith('.md')
    );

    return filenames
      .map((filename) => {
        const slug = filename.replace(/\.md$/, '');
        return getBlogPost(slug);
      })
      .filter((post): post is BlogPost => post !== null)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    console.error('Error reading blog posts:', error);
    return [];
  }
}
