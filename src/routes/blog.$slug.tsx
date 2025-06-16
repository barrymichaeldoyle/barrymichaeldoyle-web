import { createFileRoute } from '@tanstack/react-router';

import { BlogPostScreen } from '~/screens/Blog/BlogPost';
import { getBlogPost } from '~/server/blog';

export const Route = createFileRoute('/blog/$slug')({
  component: BlogPostComponent,
  loader: async ({ params }) => {
    const post = await getBlogPost({ data: params.slug });
    if (!post) {
      throw new Error('Blog post not found');
    }
    return post;
  },
});

function BlogPostComponent() {
  const post = Route.useLoaderData();

  return <BlogPostScreen post={post} />;
}
