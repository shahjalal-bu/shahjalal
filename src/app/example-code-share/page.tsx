"use client"

import { useCodeSnippets } from '@/hooks/use-code-snippets';
import { CodeSnippetBadge, CodeSnippetFloatingButton } from '@/components/code-snippet-widgets';

export default function ExamplePage() {
  const { createSnippet, snippets } = useCodeSnippets();

  const addExampleSnippet = () => {
    createSnippet(
      'React useState Hook',
      `import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}`,
      'typescript',
      'A simple counter component using React hooks',
      ['react', 'hooks', 'tutorial']
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              Example Page
            </h1>
            <CodeSnippetBadge />
          </div>

          <div className="prose dark:prose-invert max-w-none">
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
              This page demonstrates how to use the Live Code Share service on any page.
              Click the button below to add a sample code snippet, then navigate to the{' '}
              <a href="/code-share" className="text-purple-600 hover:text-purple-700">
                Code Share page
              </a>{' '}
              to see it there as well!
            </p>

            <div className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-xl p-6 mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Try It Out
              </h2>
              <button
                onClick={addExampleSnippet}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105 shadow-lg"
              >
                Add Example Snippet
              </button>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
                Current snippets: <strong>{snippets.length}</strong>
              </p>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                How It Works
              </h2>
              <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                <li className="flex items-start">
                  <span className="text-purple-500 mr-2">✓</span>
                  Code snippets are stored globally and accessible from any page
                </li>
                <li className="flex items-start">
                  <span className="text-purple-500 mr-2">✓</span>
                  Data persists across page refreshes using localStorage
                </li>
                <li className="flex items-start">
                  <span className="text-purple-500 mr-2">✓</span>
                  Use the floating button (bottom-right) to view snippets on any page
                </li>
                <li className="flex items-start">
                  <span className="text-purple-500 mr-2">✓</span>
                  Visit <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">/code-share</code> for full management
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Floating button to view snippets */}
      <CodeSnippetFloatingButton />
    </div>
  );
}
