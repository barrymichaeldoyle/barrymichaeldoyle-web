import { createFileRoute } from '@tanstack/react-router';

import { blogPosts } from '~/data/blog.gen';
import { BlogPostScreen } from '~/screens/Blog/BlogPost';

export const Route = createFileRoute('/blog/$slug')({
  component: BlogPostComponent,
});

function BlogPostComponent() {
  const slug = Route.useParams().slug;
  const post = blogPosts[slug];

  return <BlogPostScreen post={post} />;
}
