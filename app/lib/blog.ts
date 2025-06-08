import { createServerFn } from '@tanstack/react-start';

import {
  getAllBlogPosts as getAllBlogPostsServer,
  getBlogPost as getBlogPostServer,
  type BlogPost,
} from './blog.server';

// Server functions that will run on the server and be called from the client
export const getBlogPostFn = createServerFn({
  method: 'GET',
}).handler(async (ctx): Promise<BlogPost | null> => {
  const slug = ctx.data as unknown as string;
  return getBlogPostServer(slug);
});

export const getAllBlogPostsFn = createServerFn({
  method: 'GET',
}).handler(async (): Promise<BlogPost[]> => {
  return getAllBlogPostsServer();
});

// Re-export the type for convenience
export type { BlogPost };
