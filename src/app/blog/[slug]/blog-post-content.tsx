import Link from 'next/link';
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Calendar, Clock, User, Edit } from 'lucide-react';
import MarkdownViewer from '@/components/blog/markdown-viewer';
import { BlogPost } from '@/db/queries';
import TableOfContents from '@/components/blog/table-of-contents';
import SeriesNavigation from '@/components/blog/series-navigation';
import SocialShare from '@/components/blog/social-share';
import PopularPosts from '@/components/blog/popular-posts';
import NewsletterSignup from '@/components/blog/newsletter-signup';
import CommentsSection from '@/components/blog/comments-section';
import Breadcrumb from '@/components/blog/breadcrumb';
import { getSession } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import DeletePostButton from '@/components/blog/delete-post-button';

interface BlogPostContentProps {
  post: BlogPost;
  relatedPosts: BlogPost[];
  seriesPosts?: BlogPost[];
}

export default async function BlogPostContent({ post, relatedPosts, seriesPosts = [] }: BlogPostContentProps) {
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

  // Check if user is authenticated admin
  const session = await getSession();
  const isAdmin = !!session;

  return (
    <div className="min-h-screen bg-background text-foreground pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <Breadcrumb items={breadcrumbItems} />

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Sidebar - Table of Contents */}
          <aside className="lg:col-span-2 order-2 lg:order-1">
            <div className="sticky top-24">
              <TableOfContents content={post.content} />
            </div>
          </aside>

          {/* Middle - Main Content */}
          <main className="lg:col-span-8 order-1 lg:order-2">
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
              <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight text-gradient-primary pb-1">
                {post.title}
              </h1>

              {/* Meta Info and Edit Button */}
              <div className="flex flex-wrap items-center justify-between gap-4">
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
                
                {/* Admin Buttons - Only visible to admins */}
                {isAdmin && (
                  <div className="flex gap-2">
                    <Link href={`/admin/posts/edit/${post.id}`}>
                      <Button variant="outline" size="sm" className="gap-2">
                        <Edit className="w-4 h-4" />
                        Edit Post
                      </Button>
                    </Link>
                    <DeletePostButton postId={post.id} postTitle={post.title} />
                  </div>
                )}
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
              <CommentsSection postSlug={post.slug} />
            </div>
          </main>

          {/* Right Sidebar - Series, Popular Posts, Share */}
          <aside className="lg:col-span-2 order-3">
            <div className="sticky top-24 space-y-4">
              {/* Series Navigation */}
              {seriesPosts.length > 0 && post.series && (
                <SeriesNavigation 
                  series={post.series} 
                  posts={seriesPosts} 
                  currentPostId={post.id} 
                />
              )}

              {/* Popular Posts */}
              <PopularPosts posts={popularPosts} />

              {/* Social Share */}
              <SocialShare />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
