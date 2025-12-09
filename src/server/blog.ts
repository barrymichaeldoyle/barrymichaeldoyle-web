import { createServerFn } from '@tanstack/react-start';

import { blogPosts } from '~/data/blog.gen';
import { type BlogPost } from '~/types/blog';

function getPostsData(): BlogPost[] {
  return Object.values(blogPosts);
}

export const getBlogPost = createServerFn({
  method: 'GET',
}).handler(async (ctx: { data: unknown }): Promise<BlogPost | null> => {
  const slug = ctx.data;
  if (typeof slug !== 'string') {
    throw new Error('Slug must be a string');
  }
  const posts = getPostsData();
  return posts.find((post) => post.slug === slug) || null;
});

export const getAllBlogPosts = createServerFn({
  method: 'GET',
}).handler(async (): Promise<BlogPost[]> => {
  return getPostsData();
});
