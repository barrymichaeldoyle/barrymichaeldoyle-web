import { createFileRoute, notFound } from '@tanstack/react-router';
import { OG_IMAGE, SITE_URL } from '~/constants';
import { loadBlogContent } from '~/data/blog.content';
import { blogPostsMeta } from '~/data/blog.meta.gen';
import { articleJsonLd, jsonLdScript } from '~/lib/jsonLd';
import { canonicalLink, seo } from '~/lib/seo';
import { BlogPostScreen } from '~/screens/Blog/BlogPost';

export const Route = createFileRoute('/blog/$slug')({
  loader: async ({ params }) => {
    const meta = blogPostsMeta[params.slug];
    if (!meta) {
      throw notFound();
    }

    const content = await loadBlogContent(params.slug);
    if (!content) {
      throw notFound();
    }

    return { post: { ...meta, content } };
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
        publishedTime: post.date,
      }),
      links: [canonicalLink(url)],
      scripts: [jsonLdScript(articleJsonLd(post))],
    };
  },
  component: BlogPostComponent,
});

function BlogPostComponent() {
  const { post } = Route.useLoaderData();
  return <BlogPostScreen post={post} />;
}
