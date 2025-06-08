import { json } from '@tanstack/react-start';

import { getAllBlogPosts, getBlogPost } from '@/services/blog.server';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const slug = url.searchParams.get('slug');

  if (slug) {
    // Get individual blog post
    const post = getBlogPost(slug);

    if (!post) {
      throw new Response('Blog post not found', { status: 404 });
    }

    return json(post);
  } else {
    // Get all blog posts
    const posts = getAllBlogPosts();
    return json(posts);
  }
}
