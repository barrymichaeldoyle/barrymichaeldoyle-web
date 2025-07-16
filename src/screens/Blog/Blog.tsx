import { Link } from '@tanstack/react-router';

import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { type BlogPost } from '~/types/blog';

import { BlogMetaDetails } from './components/BlogMetaDetails';

interface BlogScreenProps {
  posts: BlogPost[];
}

export function BlogScreen({ posts }: BlogScreenProps) {
  return (
    <div className="w-full pt-4 max-w-4xl pb-10 mx-auto">
      <h1 className="text-3xl font-bold mb-6">Blog</h1>

      {Object.values(posts).length === 0 ? (
        <p>No blog posts found.</p>
      ) : (
        <div className="space-y-6">
          {Object.values(posts).map((post) => (
            <Card key={post.slug} variant="feature">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold mb-2">
                  {post.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="-mt-2 mb-2">
                  <BlogMetaDetails post={post} />
                </div>

                {post.description && (
                  <p className="text-lg text-muted-foreground leading-relaxed">
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
