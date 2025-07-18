import { Link } from '@tanstack/react-router';

import GlareHover from '~/components/reactbits/Animations/GlareHover/GlareHover';
import { ContactSection } from '~/components/sections/Contact/Contact';
import { Button } from '~/components/ui/button';
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
            <Link
              key={post.slug}
              to="/blog/$slug"
              params={{ slug: post.slug }}
              className="link mt-2"
              data-slot="button"
            >
              <Card
                key={post.slug}
                variant="feature"
                className="flex flex-1 flex-col p-0"
              >
                <GlareHover
                  className="flex flex-1 flex-col p-4"
                  width="100%"
                  height="100%"
                  borderRadius="0"
                  background="transparent"
                  borderColor="transparent"
                >
                  <CardHeader className="w-full pb-1">
                    <CardTitle className="mb-2 text-2xl font-semibold">
                      {post.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex w-full flex-col gap-1">
                    <div className="-mt-2 mb-2">
                      <BlogMetaDetails post={post} />
                    </div>
                    <div className="flex flex-row items-center justify-between gap-2">
                      {post.description && (
                        <p className="text-md leading-tight">
                          {post.description}
                        </p>
                      )}
                      <Button tabIndex={-1}>Read more →</Button>
                    </div>
                  </CardContent>
                </GlareHover>
              </Card>
            </Link>
          ))}
        </div>
      )}
      <ContactSection hideLink />
    </div>
  );
}
