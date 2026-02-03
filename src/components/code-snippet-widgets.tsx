"use client"

import React from 'react';
import { useCodeSnippets } from '@/hooks/use-code-snippets';

/**
 * A simple, reusable component to display code snippets on any page
 * Usage: <CodeSnippetViewer />
 */
export function CodeSnippetViewer() {
  const { snippets, setActiveSnippet, activeSnippet, copyToClipboard } = useCodeSnippets();

  if (snippets.length === 0) {
    return null; // Don't show anything if no snippets
  }

  return (
    <div className="fixed bottom-4 right-4 w-96 max-h-96 overflow-auto bg-white dark:bg-gray-800 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700 z-50">
      <div className="sticky top-0 bg-gradient-to-r from-purple-500 to-pink-500 text-white p-3 rounded-t-lg">
        <h3 className="font-bold text-sm">Shared Code Snippets ({snippets.length})</h3>
      </div>
      
      <div className="p-3 space-y-2">
        {snippets.map((snippet) => (
          <div
            key={snippet.id}
            className={`p-3 rounded-lg cursor-pointer transition-all ${
              activeSnippet?.id === snippet.id
                ? 'bg-purple-100 dark:bg-purple-900 border-2 border-purple-500'
                : 'bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600'
            }`}
            onClick={() => setActiveSnippet(snippet.id)}
          >
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-semibold text-sm text-gray-900 dark:text-white">
                {snippet.title}
              </h4>
              <span className="text-xs px-2 py-1 bg-blue-500 text-white rounded">
                {snippet.language}
              </span>
            </div>
            
            <pre className="text-xs bg-black/10 dark:bg-black/30 p-2 rounded overflow-x-auto">
              <code className="text-gray-800 dark:text-gray-200">
                {snippet.code.length > 100 
                  ? snippet.code.substring(0, 100) + '...' 
                  : snippet.code}
              </code>
            </pre>
            
            <button
              onClick={(e) => {
                e.stopPropagation();
                copyToClipboard(snippet.id);
              }}
              className="mt-2 text-xs bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition-colors"
            >
              Copy Code
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * A minimal floating button to access code snippets
 * Usage: <CodeSnippetFloatingButton />
 */
export function CodeSnippetFloatingButton() {
  const { snippets } = useCodeSnippets();
  const [isOpen, setIsOpen] = React.useState(false);

  if (snippets.length === 0) {
    return null;
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-110 flex items-center justify-center z-50"
        title="View Code Snippets"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
          />
        </svg>
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
          {snippets.length}
        </span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setIsOpen(false)}>
          <div
            className="fixed bottom-20 right-4 w-96 max-h-[500px]"
            onClick={(e) => e.stopPropagation()}
          >
            <CodeSnippetViewer />
          </div>
        </div>
      )}
    </>
  );
}

/**
 * A simple snippet counter badge
 * Usage: <CodeSnippetBadge />
 */
export function CodeSnippetBadge() {
  const { snippets } = useCodeSnippets();

  if (snippets.length === 0) {
    return null;
  }

  return (
    <div className="inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full text-sm font-medium">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
        />
      </svg>
      <span>{snippets.length} Snippet{snippets.length !== 1 ? 's' : ''}</span>
    </div>
  );
}
