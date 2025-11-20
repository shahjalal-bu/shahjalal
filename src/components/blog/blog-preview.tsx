'use client';

import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import remarkGfm from 'remark-gfm';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Calendar, Clock, User } from 'lucide-react';

interface BlogPreviewProps {
  title: string;
  excerpt: string;
  content: string;
  author: string;
  readTime: string;
  tags: string[];
  coverImage?: string;
}

export default function BlogPreview({
  title,
  excerpt,
  content,
  author,
  readTime,
  tags,
  coverImage,
}: BlogPreviewProps) {
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Card className="overflow-hidden">
      <CardHeader className="space-y-4 pb-4">
        <div className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            {title || 'Blog Title Preview'}
          </h1>
          
          {excerpt && (
            <p className="text-lg text-muted-foreground italic">
              {excerpt}
            </p>
          )}
        </div>

        {/* Cover Image */}
        {coverImage && (
          <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden">
            <img
              src={coverImage}
              alt={title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Meta Information */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <User className="h-4 w-4" />
            <span>{author || 'Author Name'}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{currentDate}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{readTime || 'X min read'}</span>
          </div>
        </div>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </CardHeader>

      <CardContent className="prose prose-slate dark:prose-invert max-w-none">
        {content ? (
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              code({ node, inline, className, children, ...props }: any) {
                const match = /language-(\w+)/.exec(className || '');
                return !inline && match ? (
                  <SyntaxHighlighter
                    style={vscDarkPlus}
                    language={match[1]}
                    PreTag="div"
                    {...props}
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              },
              img({ src, alt, ...props }: any) {
                return (
                  <img
                    src={src}
                    alt={alt}
                    className="rounded-lg w-full h-auto"
                    loading="lazy"
                    {...props}
                  />
                );
              },
              a({ href, children, ...props }: any) {
                return (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                    {...props}
                  >
                    {children}
                  </a>
                );
              },
            }}
          >
            {content}
          </ReactMarkdown>
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            <p>Your blog content preview will appear here...</p>
            <p className="text-sm mt-2">Start writing to see the preview!</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
