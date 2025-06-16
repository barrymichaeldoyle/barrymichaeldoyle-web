import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

import { createServerFn } from '@tanstack/react-start';

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  description: string;
  content: string;
}

const __dirname = dirname(fileURLToPath(import.meta.url));

function getPostsData() {
  const data = readFileSync(
    join(__dirname, '..', '..', '.output', 'public', 'blog-data', 'posts.json'),
    'utf8'
  );
  return JSON.parse(data) as BlogPost[];
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
    const posts = getPostsData();
    return posts.find((post) => post.slug === slug) || null;
  });

export const getAllBlogPosts = createServerFn({
  method: 'GET',
}).handler(async (): Promise<BlogPost[]> => {
  return getPostsData();
});
