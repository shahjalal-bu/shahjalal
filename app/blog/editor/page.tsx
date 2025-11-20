"use client"

import { useState } from 'react';
import MarkdownViewer from '../../components/MarkdownViewer';
import Link from 'next/link';

export default function EditorPage() {
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [author, setAuthor] = useState('Md Shahjalal');
  const [tags, setTags] = useState('');
  const [content, setContent] = useState(`# Your Blog Post Title

Write your content here using **Markdown**!

## Features

- **Bold** and *italic* text
- Code blocks with syntax highlighting
- Lists and tables
- And much more!

### Code Example

\`\`\`javascript
function hello() {
  console.log("Hello, World!");
}
\`\`\`

### Blockquote

> This is a blockquote. You can use it to highlight important information.

### Table

| Feature | Supported |
|---------|-----------|
| Markdown | ✅ |
| Syntax Highlighting | ✅ |
| Live Preview | ✅ |
`);
  const [showPreview, setShowPreview] = useState(true);

  const handleSave = () => {
    const post = {
      title,
      excerpt,
      author,
      tags: tags.split(',').map(tag => tag.trim()),
      content,
      date: new Date().toISOString().split('T')[0],
    };

    console.log('Saving post:', post);
    alert('Post saved! (Check console for data)\n\nNote: This is a demo. In production, you would send this to your backend API.');
  };

  const insertMarkdown = (syntax: string) => {
    const textarea = document.getElementById('markdown-editor') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    
    let newText = '';
    switch (syntax) {
      case 'bold':
        newText = `**${selectedText || 'bold text'}**`;
        break;
      case 'italic':
        newText = `*${selectedText || 'italic text'}*`;
        break;
      case 'heading':
        newText = `\n## ${selectedText || 'Heading'}\n`;
        break;
      case 'code':
        newText = `\`${selectedText || 'code'}\``;
        break;
      case 'codeblock':
        newText = `\n\`\`\`javascript\n${selectedText || '// Your code here'}\n\`\`\`\n`;
        break;
      case 'link':
        newText = `[${selectedText || 'link text'}](url)`;
        break;
      case 'list':
        newText = `\n- ${selectedText || 'List item'}\n`;
        break;
      case 'quote':
        newText = `\n> ${selectedText || 'Quote'}\n`;
        break;
    }

    const newContent = content.substring(0, start) + newText + content.substring(end);
    setContent(newContent);
    
    // Focus back on textarea
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + newText.length, start + newText.length);
    }, 0);
  };

  return (
    <div className="min-h-screen dark-body text-white">
      {/* Header */}
      <div className="bg-linear-2 py-8 border-b-2 border-[#14315c]">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                <span className="text-amber-400">Markdown</span> Editor
              </h1>
              <p className="text-slate-200">Create and preview your blog posts</p>
            </div>
            <Link
              href="/blog"
              className="px-4 py-2 bg-[#14315c] hover:bg-[#14315ccb] text-blue-100 rounded-lg transition-colors flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Blog
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Meta Fields */}
        <div className="bg-linear-2 border-2 border-[#14315c] rounded-lg p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter post title..."
                className="w-full px-4 py-2 bg-[#14315c] border-2 border-[#14315c] rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-amber-400 transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">Author</label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Author name..."
                className="w-full px-4 py-2 bg-[#14315c] border-2 border-[#14315c] rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-amber-400 transition-colors"
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-slate-300 mb-2">Excerpt</label>
            <input
              type="text"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="Brief description of the post..."
              className="w-full px-4 py-2 bg-[#14315c] border-2 border-[#14315c] rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-amber-400 transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-2">Tags (comma-separated)</label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="React, TypeScript, Web Development"
              className="w-full px-4 py-2 bg-[#14315c] border-2 border-[#14315c] rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-amber-400 transition-colors"
            />
          </div>
        </div>

        {/* Toolbar */}
        <div className="bg-linear-2 border-2 border-[#14315c] rounded-lg p-4 mb-4">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => insertMarkdown('bold')}
              className="px-3 py-2 bg-[#14315c] hover:bg-[#14315ccb] text-blue-100 rounded-lg transition-colors font-bold"
              title="Bold"
            >
              B
            </button>
            <button
              onClick={() => insertMarkdown('italic')}
              className="px-3 py-2 bg-[#14315c] hover:bg-[#14315ccb] text-blue-100 rounded-lg transition-colors italic"
              title="Italic"
            >
              I
            </button>
            <button
              onClick={() => insertMarkdown('heading')}
              className="px-3 py-2 bg-[#14315c] hover:bg-[#14315ccb] text-blue-100 rounded-lg transition-colors font-bold"
              title="Heading"
            >
              H
            </button>
            <button
              onClick={() => insertMarkdown('code')}
              className="px-3 py-2 bg-[#14315c] hover:bg-[#14315ccb] text-blue-100 rounded-lg transition-colors font-mono"
              title="Inline Code"
            >
              {'</>'}
            </button>
            <button
              onClick={() => insertMarkdown('codeblock')}
              className="px-3 py-2 bg-[#14315c] hover:bg-[#14315ccb] text-blue-100 rounded-lg transition-colors"
              title="Code Block"
            >
              Code Block
            </button>
            <button
              onClick={() => insertMarkdown('link')}
              className="px-3 py-2 bg-[#14315c] hover:bg-[#14315ccb] text-blue-100 rounded-lg transition-colors"
              title="Link"
            >
              🔗
            </button>
            <button
              onClick={() => insertMarkdown('list')}
              className="px-3 py-2 bg-[#14315c] hover:bg-[#14315ccb] text-blue-100 rounded-lg transition-colors"
              title="List"
            >
              ≡
            </button>
            <button
              onClick={() => insertMarkdown('quote')}
              className="px-3 py-2 bg-[#14315c] hover:bg-[#14315ccb] text-blue-100 rounded-lg transition-colors"
              title="Quote"
            >
              "
            </button>
            <div className="ml-auto flex gap-2">
              <button
                onClick={() => setShowPreview(!showPreview)}
                className="px-4 py-2 bg-[#14315c] hover:bg-[#14315ccb] text-blue-100 rounded-lg transition-colors"
              >
                {showPreview ? '📝 Editor Only' : '👁️ Show Preview'}
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-amber-400 text-black font-semibold rounded-lg hover:bg-amber-300 transition-colors"
              >
                💾 Save Post
              </button>
            </div>
          </div>
        </div>

        {/* Editor and Preview */}
        <div className={`grid ${showPreview ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'} gap-4`}>
          {/* Editor */}
          <div className="bg-linear-2 border-2 border-[#14315c] rounded-lg overflow-hidden">
            <div className="bg-[#14315c] px-4 py-2 border-b-2 border-[#14315c]">
              <span className="text-sm font-semibold text-blue-100">Markdown</span>
            </div>
            <textarea
              id="markdown-editor"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full h-[600px] p-6 bg-linear-2 text-white font-mono text-sm resize-none focus:outline-none"
              placeholder="Write your markdown here..."
            />
          </div>

          {/* Preview */}
          {showPreview && (
            <div className="bg-linear-2 border-2 border-[#14315c] rounded-lg overflow-hidden">
              <div className="bg-[#14315c] px-4 py-2 border-b-2 border-[#14315c]">
                <span className="text-sm font-semibold text-blue-100">Preview</span>
              </div>
              <div className="h-[600px] overflow-y-auto p-6">
                <MarkdownViewer content={content} />
              </div>
            </div>
          )}
        </div>

        {/* Help Text */}
        <div className="mt-6 bg-linear-2 border-2 border-[#14315c] rounded-lg p-4">
          <p className="text-sm text-slate-200">
            💡 <strong className="text-amber-400">Tip:</strong> Use the toolbar buttons to insert markdown syntax, or type markdown directly. 
            The preview updates in real-time as you type.
          </p>
        </div>
      </div>
    </div>
  );
}
