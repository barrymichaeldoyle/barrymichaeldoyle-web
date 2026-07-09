import { Clock } from 'lucide-react';
import { type BlogPostMeta } from '~/types/blog';

interface BlogMetaDetailsProps {
  post: BlogPostMeta;
}

export function BlogMetaDetails({ post }: BlogMetaDetailsProps) {
  return (
    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
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
        <span>{post.readingMinutes} min read</span>
      </div>
    </div>
  );
}
