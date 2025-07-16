import { Link } from '@tanstack/react-router';
import { ArrowLeft } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';

import { ContactSection } from '~/components/sections/Contact/Contact';
import { Card, CardContent } from '~/components/ui/card';
import { type BlogPost } from '~/types/blog';

import { BlogMetaDetails } from './components/BlogMetaDetails';

interface BlogPostScreenProps {
  post: BlogPost;
}

export function BlogPostScreen({ post }: BlogPostScreenProps) {
  return (
    <div className="w-full pt-4 max-w-4xl mx-auto">
      {/* Navigation */}
      <nav className="mb-4">
        <Link
          to="/blog"
          className="link flex items-center gap-2hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Blog
        </Link>
      </nav>

      {/* Header */}
      <header className="mb-4 space-y-1 px-1">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight tracking-tight">
          {post.title}
        </h1>

        {post.description && (
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            {post.description}
          </p>
        )}

        <BlogMetaDetails post={post} />
      </header>

      {/* Content */}
      <article>
        <Card>
          <CardContent className="p-0 md:p-1 lg:p-2">
            <div className="prose prose-sm max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-h1:text-2xl prose-h1:mb-4 prose-h2:text-xl prose-h2:mb-4 prose-h2:mt-8 prose-h3:text-lg prose-h3:mb-3 prose-h3:mt-6 prose-p:leading-relaxed prose-p:mb-4 prose-a:no-underline hover:prose-a:underline prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:font-mono prose-code:text-sm prose-pre:rounded-lg prose-pre:overflow-x-auto prose-pre:border prose-blockquote:border-l-4 prose-blockquote:pl-6 prose-blockquote:py-2 prose-ul:mb-4 prose-ol:mb-4 prose-li:mb-1 dark:prose-invert">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
                components={{
                  h1: ({ children }) => (
                    <h1 className="text-2xl font-bold text-foreground mt-8 mb-4 first:mt-0 tracking-tight border-b border-border pb-3">
                      {children}
                    </h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className="text-xl font-bold text-foreground mt-8 mb-4 tracking-tight">
                      {children}
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="text-lg font-bold text-foreground mt-6 mb-3 tracking-tight">
                      {children}
                    </h3>
                  ),
                  p: ({ children }) => (
                    <p className="text-foreground leading-relaxed mb-4 text-sm last:mb-0">
                      {children}
                    </p>
                  ),
                  ul: ({ children }) => (
                    <ul className="list-disc pl-6 mb-4 space-y-1">
                      {children}
                    </ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="list-decimal pl-6 mb-4 space-y-1">
                      {children}
                    </ol>
                  ),
                  li: ({ children }) => (
                    <li className="text-foreground leading-relaxed text-sm">
                      {children}
                    </li>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-primary bg-accent/30 p-3 my-8 italic text-muted-foreground rounded-r-md [&>p:last-child]:mb-0">
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
                    <pre className="bg-muted border border-border px-2 py-1 rounded-lg overflow-x-auto mb-4 text-sm leading-relaxed">
                      {children}
                    </pre>
                  ),
                  a: ({ href, children }) => (
                    <a
                      href={href}
                      className="text-primary hover:text-primary/80 hover:underline transition-colors font-medium dark:text-accent dark:hover:text-accent/80"
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

      <ContactSection />
    </div>
  );
}
