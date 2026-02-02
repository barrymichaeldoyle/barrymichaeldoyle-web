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
    <div className="mx-auto w-full max-w-4xl">
      {/* Navigation */}
      <nav className="mb-4">
        <Link to="/blog" className="flex items-center gap-2 text-foreground">
          <ArrowLeft className="h-4 w-4" />
          Back to Blog
        </Link>
      </nav>

      {/* Header */}
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

      {/* Content */}
      <article>
        <Card className="border-cyan-400/60 shadow-[0_0_12px_rgba(34,211,238,0.2)]">
          <CardContent className="p-0 md:p-1 lg:p-2">
            <div className="prose prose-sm prose-headings:font-bold prose-headings:tracking-tight prose-h1:text-2xl prose-h1:mb-4 prose-h2:text-xl prose-h2:mb-4 prose-h2:mt-8 prose-h3:text-lg prose-h3:mb-3 prose-h3:mt-6 prose-p:leading-relaxed prose-p:mb-4 prose-a:no-underline hover:prose-a:underline prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:font-mono prose-code:text-sm prose-pre:rounded-lg prose-pre:overflow-x-auto prose-pre:border prose-blockquote:border-l-4 prose-blockquote:pl-6 prose-blockquote:py-2 prose-ul:mb-4 prose-ol:mb-4 prose-li:mb-1 max-w-none">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
                components={{
                  h1: ({ children }) => (
                    <h1 className="mt-8 mb-4 border-b border-cyan-400/40 pb-3 text-2xl font-bold tracking-tight text-cyan-400 first:mt-0">
                      {children}
                    </h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className="mt-8 mb-4 text-xl font-bold tracking-tight text-cyan-400">
                      {children}
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="mt-6 mb-3 text-lg font-bold tracking-tight text-cyan-400/90">
                      {children}
                    </h3>
                  ),
                  p: ({ children }) => (
                    <p className="mb-4 text-sm leading-relaxed text-foreground last:mb-0">
                      {children}
                    </p>
                  ),
                  ul: ({ children }) => (
                    <ul className="mb-4 list-disc space-y-1 pl-6">
                      {children}
                    </ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="mb-4 list-decimal space-y-1 pl-6">
                      {children}
                    </ol>
                  ),
                  li: ({ children }) => (
                    <li className="text-sm leading-relaxed text-foreground">
                      {children}
                    </li>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="my-8 rounded-r-md border-l-4 border-cyan-400 bg-cyan-400/10 p-3 text-cyan-400/90 italic [&>p:last-child]:mb-0">
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
                        className="rounded border border-cyan-400/40 bg-cyan-400/10 px-1.5 py-0.5 font-mono text-sm text-cyan-400"
                        {...props}
                      >
                        {children}
                      </code>
                    );
                  },
                  pre: ({ children }) => (
                    <pre className="bg-muted border-border mb-4 overflow-x-auto rounded-lg border px-2 py-1 text-sm leading-relaxed">
                      {children}
                    </pre>
                  ),
                  a: ({ href, children }) => (
                    <a
                      href={href}
                      className="font-medium text-cyan-400 transition-colors hover:underline"
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
                  hr: () => <hr className="my-12 border-cyan-400/30" />,
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
