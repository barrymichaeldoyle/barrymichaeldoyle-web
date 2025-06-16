import { createServerFn } from '@tanstack/react-start';

import { blogPosts } from '~/data/blog.gen';
import { type BlogPost } from '~/types/blog';

function getPostsData(): BlogPost[] {
  return Object.values(blogPosts);
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
