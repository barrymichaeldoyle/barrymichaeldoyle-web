import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/blog/')({
  component: BlogIndex,
});

function BlogIndex() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Blog</h1>
      <p>Blog posts will be listed here...</p>

      <div className="mt-8">
        <div className="border p-4 rounded">
          <h2 className="text-xl font-semibold mb-2">My First Blog Post</h2>
          <p className="text-gray-600 mb-2">2024-01-15</p>
          <p className="mb-4">
            This is my first blog post to test the markdown system
          </p>
          <a
            href="/blog/my-first-post"
            className="text-blue-600 hover:text-blue-800 underline"
          >
            Read more →
          </a>
        </div>
      </div>
    </div>
  );
}
