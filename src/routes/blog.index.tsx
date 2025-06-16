import { createFileRoute } from '@tanstack/react-router';

import { blogPosts } from '~/data/blog.gen';
import { BlogScreen } from '~/screens/Blog/Blog';

export const Route = createFileRoute('/blog/')({
  component: BlogIndex,
});

function BlogIndex() {
  return <BlogScreen posts={Object.values(blogPosts)} />;
}
