"use client"

import Link from 'next/link';
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Calendar, Clock, User } from 'lucide-react';
import MarkdownViewer from '@/components/blog/markdown-viewer';
import { BlogPost } from '@/db/queries';
import TableOfContents from '@/components/blog/table-of-contents';
import SeriesNavigation from '@/components/blog/series-navigation';
import SocialShare from '@/components/blog/social-share';
import PopularPosts from '@/components/blog/popular-posts';
import NewsletterSignup from '@/components/blog/newsletter-signup';
import CommentsSection from '@/components/blog/comments-section';
import Breadcrumb from '@/components/blog/breadcrumb';

interface BlogPostContentProps {
  post: BlogPost;
  relatedPosts: BlogPost[];
  seriesPosts?: BlogPost[];
}

export default function BlogPostContent({ post, relatedPosts, seriesPosts = [] }: BlogPostContentProps) {
  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Get popular posts (using related posts for now)
  const popularPosts = relatedPosts.slice(0, 5);

  // Breadcrumb items
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Blogs', href: '/blog' },
    { label: post.title },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <Breadcrumb items={breadcrumbItems} />

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Sidebar - Popular Posts */}
          <aside className="lg:col-span-3 order-2 lg:order-1">
            <PopularPosts posts={popularPosts} />
          </aside>

          {/* Middle - Main Content */}
          <main className="lg:col-span-6 order-1 lg:order-2">
            {/* Article Header */}
            <div className="mb-8">
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag, index) => (
                  <Badge 
                    key={index} 
                    variant="secondary" 
                    className="bg-primary/10 text-primary hover:bg-primary/20"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight text-foreground">
                {post.title}
              </h1>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{formattedDate}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{post.readTime}</span>
                </div>
              </div>
            </div>

            {/* Article Content */}
            <Card className="bg-card border border-border rounded-lg p-6 md:p-10 shadow-sm mb-8">
              <MarkdownViewer content={post.content} />
            </Card>

            {/* Newsletter Signup */}
            <div className="mb-8">
              <NewsletterSignup />
            </div>

            {/* Comments Section */}
            <div className="mb-8">
              <CommentsSection />
            </div>
          </main>

          {/* Right Sidebar - TOC, Series, Share */}
          <aside className="lg:col-span-3 order-3">
            <div className="sticky top-24 space-y-4">
              {/* Table of Contents */}
              <TableOfContents content={post.content} />

              {/* Series Navigation */}
              {seriesPosts.length > 0 && post.series && (
                <SeriesNavigation 
                  series={post.series} 
                  posts={seriesPosts} 
                  currentPostId={post.id} 
                />
              )}

              {/* Social Share */}
              <SocialShare />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
