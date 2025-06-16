import { Clock } from 'lucide-react';

import { type BlogPost } from '~/types/blog';

interface BlogMetaDetailsProps {
  post: BlogPost;
}

export function BlogMetaDetails({ post }: BlogMetaDetailsProps) {
  const readingTime = calculateReadingTime(post.content);
  return (
    <div className="flex flex-wrap items-center gap-4 text-muted-foreground text-sm">
      {post.date && (
        <time dateTime={post.date} className="font-medium">
          {new Date(post.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </time>
      )}
      <div className="flex items-center gap-1">
        <Clock className="h-4 w-4" />
        <span>{readingTime} min read</span>
      </div>
    </div>
  );
}

function calculateReadingTime(text: string): number {
  const wordsPerMinute = 200;
  const words = text.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}
