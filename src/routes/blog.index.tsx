import { createFileRoute } from '@tanstack/react-router';
import { OG_IMAGE, SITE_URL } from '~/constants';
import { blogPosts } from '~/data/blog.gen';
import { seo } from '~/lib/seo';
import { BlogScreen } from '~/screens/Blog/Blog';

export const Route = createFileRoute('/blog/')({
  head: () => ({
    meta: seo({
      title: 'Blog | Barry Michael Doyle',
      description:
        'Writing from Barry Michael Doyle on software engineering, open source, and building products.',
      image: OG_IMAGE,
      url: `${SITE_URL}/blog`,
    }),
  }),
  component: BlogIndex,
});

function BlogIndex() {
  return <BlogScreen posts={Object.values(blogPosts)} />;
}
