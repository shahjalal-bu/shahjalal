'use client';

import { useState, useMemo, useEffect } from 'react';
import BlogListItem from '@/components/blog/blog-list-item';
import TagsSidebar from '@/components/blog/tags-sidebar';
import SeriesSidebar from '@/components/blog/series-sidebar';
import Pagination from '@/components/blog/pagination';
import { Input } from '@/components/ui/input';
import { Search, Loader2 } from 'lucide-react';

interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  tags: string[];
  coverImage?: string;
  published: boolean;
  seriesId?: number | null;
  seriesOrder?: number | null;
  createdAt: string;
  updatedAt: string;
}

interface BlogSeries {
  id: number;
  slug: string;
  title: string;
  description: string;
  coverImage?: string | null;
  published: boolean;
}

const POSTS_PER_PAGE = 6;

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [allPosts, setAllPosts] = useState<BlogPost[]>([]);
  const [allTags, setAllTags] = useState<string[]>([]);
  const [allSeries, setAllSeries] = useState<BlogSeries[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch posts, tags, and series on mount
  useEffect(() => {
    async function fetchData() {
      try {
        const [postsRes, tagsRes, seriesRes] = await Promise.all([
          fetch('/api/posts'),
          fetch('/api/tags'),
          fetch('/api/series')
        ]);
        
        const postsData = await postsRes.json();
        const tagsData = await tagsRes.json();
        const seriesData = await seriesRes.json();
        
        setAllPosts(postsData.posts || []);
        setAllTags(tagsData.tags || []);
        setAllSeries(seriesData.series || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchData();
  }, []);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedTag]);

  const filteredPosts = useMemo(() => {
    let posts = allPosts;

    // Filter by search query
    if (searchQuery.trim()) {
      const lowerQuery = searchQuery.toLowerCase();
      posts = posts.filter(post =>
        post.title.toLowerCase().includes(lowerQuery) ||
        post.excerpt.toLowerCase().includes(lowerQuery) ||
        post.content.toLowerCase().includes(lowerQuery) ||
        post.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
      );
    }

    // Filter by selected tag
    if (selectedTag) {
      posts = posts.filter(post => post.tags.includes(selectedTag));
    }

    return posts;
  }, [searchQuery, selectedTag, allPosts]);

  // Pagination
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  return (
    <div className="min-h-screen bg-background text-foreground pt-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-background py-16 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Blog
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              Thoughts, tutorials, and insights on web development, programming, and technology
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Sidebar - Tags */}
          <aside className="lg:col-span-2 order-2 lg:order-1">
            <TagsSidebar
              tags={allTags}
              selectedTag={selectedTag}
              onTagSelect={setSelectedTag}
            />
          </aside>

          {/* Middle - Blog List */}
          <main className="lg:col-span-8 order-1 lg:order-2">
            {/* Search Bar */}
            <div className="mb-6 relative">
              <Input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-6 bg-background border-2 border-border rounded-lg focus-visible:ring-primary"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            </div>

            {/* Results Info */}
            <div className="mb-6 flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                {filteredPosts.length} {filteredPosts.length === 1 ? 'article' : 'articles'} found
                {selectedTag && (
                  <span className="ml-2 text-primary font-medium">
                    in #{selectedTag}
                  </span>
                )}
              </p>
              {totalPages > 1 && (
                <p className="text-sm text-muted-foreground">
                  Page {currentPage} of {totalPages}
                </p>
              )}
            </div>

            {/* Loading State */}
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-20">
                <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
                <p className="text-muted-foreground">Loading articles...</p>
              </div>
            ) : (
              <>
                {/* Blog List */}
                {paginatedPosts.length > 0 ? (
                  <div className="space-y-6">
                    {paginatedPosts.map((post) => (
                      <BlogListItem key={post.id} post={post} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-20 bg-card rounded-lg border border-border">
                    <div className="flex justify-center mb-4">
                      <Search className="w-16 h-16 text-muted-foreground/30" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-2">No articles found</h3>
                    <p className="text-muted-foreground mb-4">
                      Try adjusting your search or filter criteria
                    </p>
                    {(searchQuery || selectedTag) && (
                      <button
                        onClick={() => {
                          setSearchQuery('');
                          setSelectedTag(null);
                        }}
                        className="text-primary hover:underline font-medium"
                      >
                        Clear all filters
                      </button>
                    )}
                  </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
                )}
              </>
            )}
          </main>

          {/* Right Sidebar - Series */}
          <aside className="lg:col-span-2 order-3">
            <SeriesSidebar series={allSeries} />
          </aside>
        </div>
      </div>
    </div>
  );
}
