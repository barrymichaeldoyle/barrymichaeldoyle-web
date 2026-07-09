import { createFileRoute, notFound } from '@tanstack/react-router';
import { OG_IMAGE, SITE_URL } from '~/constants';
import { blogPosts } from '~/data/blog.gen';
import { canonicalLink, seo } from '~/lib/seo';
import { BlogPostScreen } from '~/screens/Blog/BlogPost';

export const Route = createFileRoute('/blog/$slug')({
  loader: ({ params }) => {
    const post = blogPosts[params.slug];
    if (!post) {
      throw notFound();
    }
    return { post };
  },
  head: ({ loaderData }) => {
    const post = loaderData?.post;
    if (!post) {
      return {
        meta: [
          { title: 'Page Not Found | Barry Michael Doyle' },
          { name: 'robots', content: 'noindex' },
        ],
      };
    }

    const url = `${SITE_URL}/blog/${post.slug}`;

    return {
      meta: seo({
        title: `${post.title} | Barry Michael Doyle`,
        description: post.description,
        image: OG_IMAGE,
        url,
        type: 'article',
      }),
      links: [canonicalLink(url)],
    };
  },
  component: BlogPostComponent,
});

function BlogPostComponent() {
  const { post } = Route.useLoaderData();
  return <BlogPostScreen post={post} />;
}
