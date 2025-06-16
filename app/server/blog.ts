import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';

import { createServerFn } from '@tanstack/react-start';
import matter from 'gray-matter';

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  description: string;
  content: string;
}

export const getBlogPost = createServerFn({
  method: 'GET',
})
  .validator((slug: unknown): string => {
    if (typeof slug !== 'string') {
      throw new Error('Slug must be a string');
    }
    return slug;
  })
  .handler(async (ctx): Promise<BlogPost | null> => {
    const slug = ctx.data as unknown as string;
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
      console.error('Error fetching blog post:', error);
      return null;
    }
  });

export const getAllBlogPosts = createServerFn({
  method: 'GET',
}).handler(async (): Promise<BlogPost[]> => {
  try {
    const blogDir = join('content', 'blog');
    const filenames = readdirSync(blogDir).filter((name) =>
      name.endsWith('.md')
    );

    const posts = await Promise.all(
      filenames.map(async (filename) => {
        const slug = filename.replace(/\.md$/, '');
        return getBlogPost({ data: slug });
      })
    );

    return posts
      .filter((p): p is BlogPost => p !== null)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    console.error('Error fetching all blog posts:', error);
    return [];
  }
});
