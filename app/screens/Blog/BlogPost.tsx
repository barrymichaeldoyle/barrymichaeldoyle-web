import { Link } from '@tanstack/react-router';
import { ArrowLeft, Clock } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { type BlogPost } from '@/server/blog';

interface BlogPostScreenProps {
  post: BlogPost;
}

export function BlogPostScreen({ post }: BlogPostScreenProps) {
  const readingTime = calculateReadingTime(post.content);

  return (
    <div className="container mx-auto pt-8 pb-16 max-w-4xl">
      {/* Navigation */}
      <div className="mb-8">
        <Button variant="ghost" asChild className="pl-0">
          <Link
            to="/blog"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>
        </Button>
      </div>

      {/* Header */}
      <header className="mb-12 space-y-6">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
          {post.title}
        </h1>

        {post.description && (
          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
            {post.description}
          </p>
        )}

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
      </header>

      {/* Content */}
      <article>
        <Card className="border-l-current border-l-0.25 p-4">
          <CardContent className="p-0 md:p-8 lg:p-12">
            <div className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-h1:text-3xl prose-h1:mb-6 prose-h2:text-2xl prose-h2:mb-5 prose-h2:mt-12 prose-h3:text-xl prose-h3:mb-4 prose-h3:mt-8 prose-p:leading-relaxed prose-p:mb-6 prose-a:no-underline hover:prose-a:underline prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:font-mono prose-code:text-sm prose-pre:rounded-lg prose-pre:overflow-x-auto prose-pre:border prose-blockquote:border-l-4 prose-blockquote:pl-6 prose-blockquote:py-2 prose-ul:mb-6 prose-ol:mb-6 prose-li:mb-1 dark:prose-invert">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
                components={{
                  // Custom components for better styling
                  h1: ({ children }) => (
                    <h1 className="text-3xl font-bold text-foreground mt-12 mb-6 first:mt-0 tracking-tight border-b border-border pb-4">
                      {children}
                    </h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className="text-2xl font-bold text-foreground mt-12 mb-5 tracking-tight">
                      {children}
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="text-xl font-bold text-foreground mt-8 mb-4 tracking-tight">
                      {children}
                    </h3>
                  ),
                  p: ({ children }) => (
                    <p className="text-foreground leading-relaxed mb-6">
                      {children}
                    </p>
                  ),
                  ul: ({ children }) => (
                    <ul className="list-disc pl-6 mb-6 space-y-2">
                      {children}
                    </ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="list-decimal pl-6 mb-6 space-y-2">
                      {children}
                    </ol>
                  ),
                  li: ({ children }) => (
                    <li className="text-foreground leading-relaxed">
                      {children}
                    </li>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-primary bg-accent/30 pl-6 py-4 my-8 italic text-muted-foreground rounded-r-md">
                      {children}
                    </blockquote>
                  ),
                  code: ({ className, children, ...props }) => {
                    const match = /language-(\w+)/.exec(className || '');
                    return match ? (
                      <code className={className} {...props}>
                        {children}
                      </code>
                    ) : (
                      <code
                        className="text-primary bg-muted px-1.5 py-0.5 rounded text-sm font-mono border"
                        {...props}
                      >
                        {children}
                      </code>
                    );
                  },
                  pre: ({ children }) => (
                    <pre className="bg-muted border border-border p-6 rounded-lg overflow-x-auto mb-8 text-sm leading-relaxed">
                      {children}
                    </pre>
                  ),
                  a: ({ href, children }) => (
                    <a
                      href={href}
                      className="text-primary hover:text-primary/80 hover:underline transition-colors font-medium"
                      target={href?.startsWith('http') ? '_blank' : undefined}
                      rel={
                        href?.startsWith('http')
                          ? 'noopener noreferrer'
                          : undefined
                      }
                    >
                      {children}
                    </a>
                  ),
                  hr: () => <hr className="border-border my-12" />,
                }}
              >
                {post.content}
              </ReactMarkdown>
            </div>
          </CardContent>
        </Card>
      </article>

      {/* Navigation Footer */}
      <div className="mt-16 pt-8 border-t border-border">
        <Button variant="outline" asChild>
          <Link to="/blog" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to All Posts
          </Link>
        </Button>
      </div>
    </div>
  );
}

function calculateReadingTime(text: string): number {
  const wordsPerMinute = 200;
  const words = text.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}
