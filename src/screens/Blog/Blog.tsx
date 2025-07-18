import { Link } from '@tanstack/react-router';

import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { type BlogPost } from '~/types/blog';

import { BlogMetaDetails } from './components/BlogMetaDetails';

interface BlogScreenProps {
  posts: BlogPost[];
}

export function BlogScreen({ posts }: BlogScreenProps) {
  return (
    <div className="mx-auto flex w-full min-w-full flex-1 flex-col p-4 pb-10">
      <h1 className="mb-6 text-3xl font-bold">Blog</h1>

      {Object.values(posts).length === 0 ? (
        <p>No blog posts found.</p>
      ) : (
        <div className="space-y-6">
          {Object.values(posts).map((post) => (
            <Card key={post.slug} variant="feature">
              <CardHeader>
                <CardTitle className="mb-2 text-2xl font-semibold">
                  {post.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="-mt-2 mb-2">
                  <BlogMetaDetails post={post} />
                </div>

                {post.description && (
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    {post.description}
                  </p>
                )}

                <Link
                  to="/blog/$slug"
                  params={{ slug: post.slug }}
                  className="link mt-2"
                >
                  Read more →
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
