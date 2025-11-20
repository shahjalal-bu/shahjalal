"use client"

import { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Prism from 'prismjs';

// Import Prism themes and languages
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-markdown';

interface MarkdownViewerProps {
  content: string;
  className?: string;
}

export default function MarkdownViewer({ content, className = '' }: MarkdownViewerProps) {
  useEffect(() => {
    // Highlight all code blocks after component mounts
    Prism.highlightAll();
  }, [content]);

  return (
    <div className={`markdown-viewer prose prose-lg max-w-none ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code({ node, className, children, ...props }: any) {
            const match = /language-(\w+)/.exec(className || '');
            const isInline = !match && !className;
            
            if (isInline) {
              return (
                <code className="bg-[#14315c] text-amber-300 px-2 py-1 rounded text-sm font-mono" {...props}>
                  {children}
                </code>
              );
            }

            const language = match ? match[1] : 'text';
            
            return (
              <pre className={`language-${language} bg-[#1d1f21] rounded-lg p-4 overflow-x-auto my-4 border-2 border-[#14315c]`}>
                <code className={`language-${language}`}>
                  {String(children).replace(/\n$/, '')}
                </code>
              </pre>
            );
          },
          h1: ({ node, ...props }) => (
            <h1 className="text-4xl font-bold mt-8 mb-4 text-amber-400" {...props} />
          ),
          h2: ({ node, ...props }) => (
            <h2 className="text-3xl font-bold mt-6 mb-3 text-amber-300" {...props} />
          ),
          h3: ({ node, ...props }) => (
            <h3 className="text-2xl font-semibold mt-4 mb-2 text-white" {...props} />
          ),
          p: ({ node, ...props }) => (
            <p className="mb-4 leading-relaxed text-slate-200" {...props} />
          ),
          ul: ({ node, ...props }) => (
            <ul className="list-disc list-inside mb-4 space-y-2 text-slate-200" {...props} />
          ),
          ol: ({ node, ...props }) => (
            <ol className="list-decimal list-inside mb-4 space-y-2 text-slate-200" {...props} />
          ),
          li: ({ node, ...props }) => (
            <li className="ml-4" {...props} />
          ),
          blockquote: ({ node, ...props }) => (
            <blockquote className="border-l-4 border-amber-400 pl-4 italic my-4 text-slate-300 bg-[#14315c]/30 py-2" {...props} />
          ),
          a: ({ node, ...props }) => (
            <a className="text-amber-400 hover:text-amber-300 underline" {...props} />
          ),
          table: ({ node, ...props }) => (
            <div className="overflow-x-auto my-4">
              <table className="min-w-full border border-[#14315c]" {...props} />
            </div>
          ),
          th: ({ node, ...props }) => (
            <th className="border border-[#14315c] px-4 py-2 bg-[#14315c] text-left text-white" {...props} />
          ),
          td: ({ node, ...props }) => (
            <td className="border border-[#14315c] px-4 py-2 text-slate-200" {...props} />
          ),
          img: ({ node, ...props }) => (
            <img className="rounded-lg my-4 max-w-full h-auto border-2 border-[#14315c]" {...props} />
          ),
          hr: ({ node, ...props }) => (
            <hr className="my-8 border-[#14315c]" {...props} />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
