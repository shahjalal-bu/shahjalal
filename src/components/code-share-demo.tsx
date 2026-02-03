"use client"

import React, { useState } from 'react';
import { useCodeSnippets } from '@/hooks/use-code-snippets';
import { CodeSnippet } from '@/types/code-share';

export function CodeShareDemo() {
  const {
    snippets,
    activeSnippet,
    createSnippet,
    updateSnippet,
    deleteSnippet,
    setActiveSnippet,
    duplicateSnippet,
    searchSnippets,
    filterByLanguage,
    getLanguages,
    getTags,
    copyToClipboard,
    exportSnippets,
    clearAll,
  } = useCodeSnippets();

  const [title, setTitle] = useState('');
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const tagArray = tags.split(',').map(t => t.trim()).filter(Boolean);
    
    if (isEditing && editingId) {
      updateSnippet(editingId, {
        title,
        code,
        language,
        description,
        tags: tagArray,
      });
      setIsEditing(false);
      setEditingId(null);
    } else {
      createSnippet(title, code, language, description, tagArray);
    }
    
    // Reset form
    setTitle('');
    setCode('');
    setLanguage('javascript');
    setDescription('');
    setTags('');
  };

  const handleEdit = (snippet: CodeSnippet) => {
    setTitle(snippet.title);
    setCode(snippet.code);
    setLanguage(snippet.language);
    setDescription(snippet.description || '');
    setTags(snippet.tags?.join(', ') || '');
    setIsEditing(true);
    setEditingId(snippet.id);
  };

  const handleCopy = async (id: string) => {
    const success = await copyToClipboard(id);
    if (success) {
      alert('Code copied to clipboard!');
    }
  };

  const displayedSnippets = searchQuery
    ? searchSnippets(searchQuery)
    : selectedLanguage
    ? filterByLanguage(selectedLanguage)
    : snippets;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Live Code Share
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Share and manage code snippets across different pages
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                {isEditing ? 'Edit Snippet' : 'New Snippet'}
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="My awesome code"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Language
                  </label>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full px-4 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="javascript">JavaScript</option>
                    <option value="typescript">TypeScript</option>
                    <option value="python">Python</option>
                    <option value="java">Java</option>
                    <option value="cpp">C++</option>
                    <option value="html">HTML</option>
                    <option value="css">CSS</option>
                    <option value="go">Go</option>
                    <option value="rust">Rust</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Code
                  </label>
                  <textarea
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="w-full px-4 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                    placeholder="console.log('Hello World');"
                    rows={8}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Description (optional)
                  </label>
                  <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-4 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Brief description"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Tags (comma separated)
                  </label>
                  <input
                    type="text"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    className="w-full px-4 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="react, hooks, tutorial"
                  />
                </div>

                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all shadow-sm"
                  >
                    {isEditing ? 'Update' : 'Add'} Snippet
                  </button>
                  
                  {isEditing && (
                    <button
                      type="button"
                      onClick={() => {
                        setIsEditing(false);
                        setEditingId(null);
                        setTitle('');
                        setCode('');
                        setDescription('');
                        setTags('');
                      }}
                      className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* Actions */}
            <div className="mt-6 bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Actions</h3>
              <div className="space-y-2">
                <button
                  onClick={exportSnippets}
                  className="w-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 px-4 py-2 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-all border border-blue-200 dark:border-blue-800"
                >
                  Export All
                </button>
                <button
                  onClick={clearAll}
                  className="w-full bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 px-4 py-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-all border border-red-200 dark:border-red-800"
                >
                  Clear All
                </button>
              </div>
            </div>
          </div>

          {/* Snippets List */}
          <div className="lg:col-span-2">
            {/* Search and Filter */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Search
                  </label>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Search snippets..."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Filter by Language
                  </label>
                  <select
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                    className="w-full px-4 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">All Languages</option>
                    {getLanguages().map((lang) => (
                      <option key={lang} value={lang}>
                        {lang}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Snippets Grid */}
            <div className="space-y-4">
              {displayedSnippets.length === 0 ? (
                <div className="bg-white dark:bg-gray-800 rounded-xl p-12 border border-gray-200 dark:border-gray-700 shadow-sm text-center">
                  <p className="text-gray-600 dark:text-gray-400 text-lg">
                    No snippets yet. Create your first one!
                  </p>
                </div>
              ) : (
                displayedSnippets.map((snippet) => (
                  <div
                    key={snippet.id}
                    className={`bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm transition-all hover:shadow-md ${
                      activeSnippet?.id === snippet.id ? 'ring-2 ring-blue-500' : ''
                    }`}
                    onClick={() => setActiveSnippet(snippet.id)}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                          {snippet.title}
                        </h3>
                        {snippet.description && (
                          <p className="text-gray-600 dark:text-gray-400 text-sm">{snippet.description}</p>
                        )}
                      </div>
                      <span className="px-3 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium border border-blue-200 dark:border-blue-800">
                        {snippet.language}
                      </span>
                    </div>

                    <pre className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg overflow-x-auto mb-4 border border-gray-200 dark:border-gray-700">
                      <code className="text-gray-900 dark:text-green-300 text-sm font-mono">
                        {snippet.code}
                      </code>
                    </pre>

                    {snippet.tags && snippet.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {snippet.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs border border-gray-200 dark:border-gray-600"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="flex gap-2 text-xs text-gray-500 dark:text-gray-400 mb-4">
                      <span>Created: {snippet.createdAt.toLocaleDateString()}</span>
                      <span>•</span>
                      <span>Updated: {snippet.updatedAt.toLocaleDateString()}</span>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCopy(snippet.id);
                        }}
                        className="flex-1 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 px-4 py-2 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-all border border-green-200 dark:border-green-800"
                      >
                        Copy
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEdit(snippet);
                        }}
                        className="flex-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 px-4 py-2 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-all border border-blue-200 dark:border-blue-800"
                      >
                        Edit
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          duplicateSnippet(snippet.id);
                        }}
                        className="flex-1 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400 px-4 py-2 rounded-lg hover:bg-yellow-100 dark:hover:bg-yellow-900/30 transition-all border border-yellow-200 dark:border-yellow-800"
                      >
                        Duplicate
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (confirm('Delete this snippet?')) {
                            deleteSnippet(snippet.id);
                          }
                        }}
                        className="flex-1 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 px-4 py-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-all border border-red-200 dark:border-red-800"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
