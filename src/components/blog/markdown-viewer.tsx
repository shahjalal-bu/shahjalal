"use client"

import { useMemo, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import 'katex/dist/katex.min.css';
import { Check, Copy } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface CodeBlockProps {
  language: string;
  children: React.ReactNode;
  [key: string]: any;
}

const CodeBlock = ({ language, children, ...props }: CodeBlockProps) => {
  const [isCopied, setIsCopied] = useState(false);
  const codeString = String(children).replace(/\n$/, '');

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(codeString);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy logic', err);
    }
  };

  return (
    <div className="my-4 rounded-lg overflow-hidden border-2 border-border relative group">
      <div className="absolute right-2 top-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button
          size="icon"
          variant="secondary"
          className="h-8 w-8 bg-muted/80 backdrop-blur-sm hover:bg-muted text-muted-foreground"
          onClick={onCopy}
        >
          {isCopied ? (
            <Check className="h-4 w-4 text-green-500" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </Button>
      </div>
      <SyntaxHighlighter
        language={language}
        style={vscDarkPlus}
        customStyle={{
          margin: 0,
          borderRadius: 0,
          background: '#1d1f21',
          padding: '1rem',
        }}
        wrapLines={true}
        wrapLongLines={true}
        {...props}
      >
        {codeString}
      </SyntaxHighlighter>
    </div>
  );
};

interface MarkdownViewerProps {
  content: string;
  className?: string;
}

export default function MarkdownViewer({ content, className = '' }: MarkdownViewerProps) {
  // Track heading counters in a stable way that works for SSR
  const headingCounters = useMemo(() => new Map<string, number>(), [content]);
  
  const generateUniqueId = (text: string): string => {
    let baseId = text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
    
    // Ensure ID is not empty
    if (!baseId) {
      baseId = 'heading';
    }
    
    // Make ID unique if it already exists
    const count = headingCounters.get(baseId) || 0;
    headingCounters.set(baseId, count + 1);
    
    // Only add suffix if this is a duplicate
    return count > 0 ? `${baseId}-${count}` : baseId;
  };

  return (
    <div className={`markdown-viewer prose max-w-none dark:prose-invert ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={{
          code({ node, className, children, ...props }: any) {
            const match = /language-(\w+)/.exec(className || '');
            const isInline = !match && !className;
            
            if (isInline) {
              return (
                <code className="bg-muted text-amber-500 px-2 py-1 rounded text-sm font-mono" {...props}>
                  {children}
                </code>
              );
            }

            const language = match ? match[1] : 'text';
            
            return (
              <CodeBlock language={language} {...props}>
                {children}
              </CodeBlock>
            );
          },
          h1: ({ node, className, children, ...props }) => {
            const text = String(children);
            const id = generateUniqueId(text);
            return (
              <h1 id={id} className="text-3xl font-bold mt-8 mb-4 text-foreground scroll-mt-24" {...props}>
                {children}
              </h1>
            );
          },
          h2: ({ node, className, children, ...props }) => {
            const text = String(children);
            const id = generateUniqueId(text);
            return (
              <h2 id={id} className="text-2xl font-bold mt-6 mb-3 text-foreground scroll-mt-24" {...props}>
                {children}
              </h2>
            );
          },
          h3: ({ node, className, children, ...props }) => {
            const text = String(children);
            const id = generateUniqueId(text);
            return (
              <h3 id={id} className="text-xl font-semibold mt-4 mb-2 text-foreground scroll-mt-24" {...props}>
                {children}
              </h3>
            );
          },
          p: ({ node, ...props }) => (
            <p className="mb-4 leading-relaxed text-foreground text-base" {...props} />
          ),
          ul: ({ node, ...props }) => (
            <ul className="list-disc list-inside mb-4 space-y-2 text-foreground" {...props} />
          ),
          ol: ({ node, ...props }) => (
            <ol className="list-decimal list-inside mb-4 space-y-2 text-foreground" {...props} />
          ),
          li: ({ node, ...props }) => (
            <li className="ml-4" {...props} />
          ),
          blockquote: ({ node, ...props }) => (
            <blockquote className="border-l-4 border-amber-500 pl-4 italic my-4 text-muted-foreground bg-muted/50 py-2" {...props} />
          ),
          a: ({ node, ...props }) => (
            <a className="text-amber-500 hover:text-amber-600 underline" {...props} />
          ),
          table: ({ node, ...props }) => (
            <div className="overflow-x-auto my-4">
              <table className="min-w-full border border-border" {...props} />
            </div>
          ),
          th: ({ node, ...props }) => (
            <th className="border border-border px-4 py-2 bg-muted text-left text-foreground font-bold" {...props} />
          ),
          td: ({ node, ...props }) => (
            <td className="border border-border px-4 py-2 text-foreground" {...props} />
          ),
          img: ({ node, ...props }) => (
            <img className="rounded-lg my-4 max-w-full h-auto border-2 border-border" {...props} />
          ),
          hr: ({ node, ...props }) => (
            <hr className="my-8 border-border" {...props} />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
