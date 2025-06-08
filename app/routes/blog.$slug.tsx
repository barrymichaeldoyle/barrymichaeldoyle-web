import { createFileRoute } from '@tanstack/react-router';

import { getBlogPost } from '@/lib/blog.server';

export const Route = createFileRoute('/blog/$slug')({
  component: BlogPostComponent,
  loader: ({ params }) => {
    // This runs on the server, so we can safely use the server function
    const post = getBlogPost(params.slug);
    if (!post) {
      throw new Error('Blog post not found');
    }
    return { post };
  },
});

function BlogPostComponent() {
  const { post } = Route.useLoaderData();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{post.title}</h1>
      <p className="text-gray-600 mb-4">{post.date}</p>
      <p className="text-lg mb-6">{post.description}</p>

      <div className="border p-4 bg-gray-50">
        <h3 className="font-bold mb-2">Raw Markdown Content:</h3>
        <pre className="whitespace-pre-wrap text-sm">{post.content}</pre>
      </div>
    </div>
  );
}
