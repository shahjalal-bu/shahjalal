"use client"

import { useState, useMemo } from 'react';
import BlogCard from '../components/BlogCard';
import { getAllPosts, getAllTags, searchPosts } from '../data/blogData';
import SectionHead from '../components/SectionHead';

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const allPosts = getAllPosts();
  const allTags = getAllTags();

  const filteredPosts = useMemo(() => {
    let posts = allPosts;

    // Filter by search query
    if (searchQuery.trim()) {
      posts = searchPosts(searchQuery);
    }

    // Filter by selected tag
    if (selectedTag) {
      posts = posts.filter(post => post.tags.includes(selectedTag));
    }

    return posts;
  }, [searchQuery, selectedTag, allPosts]);

  return (
    <div className="min-h-screen dark-body text-white">
      {/* Header */}
      <div className="bg-linear-2 py-20 border-b-2 border-[#14315c]">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-4">
              <span className="text-amber-500">Blog</span>
            </h1>
            <p className="text-xl text-slate-200 max-w-2xl mx-auto">
              Thoughts, tutorials, and insights on web development, programming, and technology
            </p>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-4 bg-linear-2 border-2 border-[#14315c] rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-amber-400 transition-colors"
              />
              <svg
                className="absolute right-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-slate-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          {/* Tags Filter */}
          <div className="mb-8">
            <h3 className="text-sm font-semibold text-slate-300 mb-3">Filter by tag:</h3>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedTag(null)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                  selectedTag === null
                    ? 'bg-amber-400 text-black'
                    : 'bg-[#14315c] text-blue-100 hover:bg-[#14315ccb]'
                }`}
              >
                All
              </button>
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                    selectedTag === tag
                      ? 'bg-amber-400 text-black'
                      : 'bg-[#14315c] text-blue-100 hover:bg-[#14315ccb]'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="max-w-6xl mx-auto mb-6">
          <p className="text-slate-300">
            {filteredPosts.length} {filteredPosts.length === 1 ? 'article' : 'articles'} found
          </p>
        </div>

        {/* Blog Grid */}
        {filteredPosts.length > 0 ? (
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="max-w-6xl mx-auto text-center py-20">
            <svg
              className="w-24 h-24 mx-auto mb-4 text-slate-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="text-2xl font-bold text-slate-300 mb-2">No articles found</h3>
            <p className="text-slate-400">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}
