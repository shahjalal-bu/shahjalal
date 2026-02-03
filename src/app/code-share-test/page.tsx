"use client"

import { useCodeSnippets } from '@/hooks/use-code-snippets';
import { useState } from 'react';

/**
 * Test page to verify all code share functionality
 */
export default function CodeShareTestPage() {
  const {
    snippets,
    createSnippet,
    updateSnippet,
    deleteSnippet,
    duplicateSnippet,
    searchSnippets,
    filterByLanguage,
    getLanguages,
    getTags,
    copyToClipboard,
    exportSnippets,
    clearAll,
  } = useCodeSnippets();

  const [testResults, setTestResults] = useState<string[]>([]);

  const addResult = (test: string, passed: boolean) => {
    setTestResults(prev => [...prev, `${passed ? '✅' : '❌'} ${test}`]);
  };

  const runTests = async () => {
    setTestResults(['🧪 Running tests...']);

    // Test 1: Create snippet
    try {
      createSnippet('Test Snippet', 'console.log("test");', 'javascript', 'Test description', ['test']);
      addResult('Create snippet', true);
    } catch (e) {
      addResult('Create snippet', false);
    }

    // Wait a bit for state to update
    await new Promise(resolve => setTimeout(resolve, 100));

    // Test 2: Check if snippet exists
    const exists = snippets.length > 0;
    addResult('Snippet exists in state', exists);

    if (exists) {
      const testSnippet = snippets[snippets.length - 1];

      // Test 3: Update snippet
      try {
        updateSnippet(testSnippet.id, { title: 'Updated Test' });
        addResult('Update snippet', true);
      } catch (e) {
        addResult('Update snippet', false);
      }

      // Test 4: Duplicate snippet
      try {
        duplicateSnippet(testSnippet.id);
        addResult('Duplicate snippet', true);
      } catch (e) {
        addResult('Duplicate snippet', false);
      }

      // Test 5: Search
      const searchResults = searchSnippets('test');
      addResult(`Search (found ${searchResults.length})`, searchResults.length > 0);

      // Test 6: Filter by language
      const jsSnippets = filterByLanguage('javascript');
      addResult(`Filter by language (found ${jsSnippets.length})`, jsSnippets.length > 0);

      // Test 7: Get languages
      const languages = getLanguages();
      addResult(`Get languages (found ${languages.length})`, languages.length > 0);

      // Test 8: Get tags
      const tags = getTags();
      addResult(`Get tags (found ${tags.length})`, tags.length > 0);

      // Test 9: Copy to clipboard
      try {
        const copied = await copyToClipboard(testSnippet.id);
        addResult('Copy to clipboard', copied);
      } catch (e) {
        addResult('Copy to clipboard', false);
      }

      // Test 10: Delete snippet
      try {
        deleteSnippet(testSnippet.id);
        addResult('Delete snippet', true);
      } catch (e) {
        addResult('Delete snippet', false);
      }
    }

    setTestResults(prev => [...prev, '\n🎉 Tests complete!']);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:to-purple-900 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Code Share Test Suite
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            Verify that all functionality is working correctly
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Stats */}
            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl p-6 text-white">
              <h3 className="text-lg font-semibold mb-2">Total Snippets</h3>
              <p className="text-4xl font-bold">{snippets.length}</p>
            </div>

            <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-6 text-white">
              <h3 className="text-lg font-semibold mb-2">Languages</h3>
              <p className="text-4xl font-bold">{getLanguages().length}</p>
            </div>

            <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl p-6 text-white">
              <h3 className="text-lg font-semibold mb-2">Tags</h3>
              <p className="text-4xl font-bold">{getTags().length}</p>
            </div>

            <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-xl p-6 text-white">
              <h3 className="text-lg font-semibold mb-2">Test Results</h3>
              <p className="text-4xl font-bold">{testResults.filter(r => r.startsWith('✅')).length}</p>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-4 mb-8">
            <button
              onClick={runTests}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-4 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105 shadow-lg text-lg"
            >
              🧪 Run All Tests
            </button>

            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => createSnippet(
                  'Sample Snippet',
                  'const greeting = "Hello World";\nconsole.log(greeting);',
                  'javascript',
                  'A simple greeting example',
                  ['sample', 'tutorial']
                )}
                className="bg-green-500 text-white px-4 py-3 rounded-lg hover:bg-green-600 transition-all"
              >
                ➕ Add Sample Snippet
              </button>

              <button
                onClick={exportSnippets}
                className="bg-blue-500 text-white px-4 py-3 rounded-lg hover:bg-blue-600 transition-all"
              >
                💾 Export Snippets
              </button>

              <button
                onClick={() => {
                  if (confirm('Clear all snippets?')) {
                    clearAll();
                    setTestResults([]);
                  }
                }}
                className="bg-red-500 text-white px-4 py-3 rounded-lg hover:bg-red-600 transition-all"
              >
                🗑️ Clear All
              </button>

              <button
                onClick={() => window.location.href = '/code-share'}
                className="bg-purple-500 text-white px-4 py-3 rounded-lg hover:bg-purple-600 transition-all"
              >
                🎨 View Demo
              </button>
            </div>
          </div>

          {/* Test Results */}
          {testResults.length > 0 && (
            <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Test Results
              </h3>
              <div className="space-y-2 font-mono text-sm">
                {testResults.map((result, index) => (
                  <div
                    key={index}
                    className={`p-2 rounded ${
                      result.startsWith('✅')
                        ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                        : result.startsWith('❌')
                        ? 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                        : 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
                    }`}
                  >
                    {result}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Current Snippets */}
          {snippets.length > 0 && (
            <div className="mt-8">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Current Snippets ({snippets.length})
              </h3>
              <div className="space-y-3">
                {snippets.map((snippet) => (
                  <div
                    key={snippet.id}
                    className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-lg p-4"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        {snippet.title}
                      </h4>
                      <span className="text-xs px-2 py-1 bg-purple-500 text-white rounded">
                        {snippet.language}
                      </span>
                    </div>
                    <pre className="text-xs bg-black/10 dark:bg-black/30 p-2 rounded overflow-x-auto">
                      <code className="text-gray-800 dark:text-gray-200">
                        {snippet.code.substring(0, 100)}
                        {snippet.code.length > 100 ? '...' : ''}
                      </code>
                    </pre>
                    {snippet.tags && snippet.tags.length > 0 && (
                      <div className="flex gap-2 mt-2">
                        {snippet.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs px-2 py-1 bg-blue-500/20 text-blue-700 dark:text-blue-300 rounded"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
