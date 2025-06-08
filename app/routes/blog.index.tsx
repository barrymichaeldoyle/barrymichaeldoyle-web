import { createFileRoute, Link } from '@tanstack/react-router';

import { getAllBlogPosts } from '@/server/blog';

export const Route = createFileRoute('/blog/')({
  component: BlogIndex,
  loader: async () => {
    const posts = await getAllBlogPosts();
    return { posts };
  },
});

function BlogIndex() {
  const { posts } = Route.useLoaderData();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Blog</h1>

      {posts.length === 0 ? (
        <p>
          No blog posts found. Add some markdown files to the content/blog
          directory!
        </p>
      ) : (
        <div className="space-y-6">
          {posts.map((post) => (
            <div key={post.slug} className="border p-6 rounded-lg">
              <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
              <p className="text-gray-600 mb-2">{post.date}</p>
              <p className="mb-4">{post.description}</p>
              <Link
                to="/blog/$slug"
                params={{ slug: post.slug }}
                className="text-blue-600 hover:text-blue-800 underline"
              >
                Read more →
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
