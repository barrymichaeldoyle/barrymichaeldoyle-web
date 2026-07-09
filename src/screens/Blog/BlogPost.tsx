import { Link } from '@tanstack/react-router';
import { ArrowLeft } from 'lucide-react';
import { lazy, Suspense } from 'react';
import { ContactSection } from '~/components/sections/Contact/Contact';
import { type BlogPost } from '~/types/blog';

import { BlogMetaDetails } from './components/BlogMetaDetails';

const BlogPostMarkdown = lazy(() =>
  import('./BlogPostMarkdown').then((m) => ({ default: m.BlogPostMarkdown }))
);

interface BlogPostScreenProps {
  post: BlogPost;
}

export function BlogPostScreen({ post }: BlogPostScreenProps) {
  return (
    <div className="mx-auto w-full max-w-4xl">
      <nav className="mb-4">
        <Link to="/blog" className="flex items-center gap-2 text-foreground">
          <ArrowLeft className="h-4 w-4" />
          Back to Blog
        </Link>
      </nav>

      <header className="mb-4 space-y-1 px-1">
        <h1 className="text-2xl leading-tight font-bold tracking-tight text-cyan-400 md:text-3xl lg:text-4xl">
          {post.title}
        </h1>

        {post.description && (
          <p className="text-lg leading-relaxed font-bold text-foreground md:text-xl">
            {post.description}
          </p>
        )}

        <BlogMetaDetails post={post} />
      </header>

      <Suspense
        fallback={
          <div className="text-muted-foreground min-h-64 animate-pulse rounded-lg border border-cyan-400/30 p-4">
            Loading article…
          </div>
        }
      >
        <BlogPostMarkdown content={post.content} />
      </Suspense>

      <ContactSection />
    </div>
  );
}
