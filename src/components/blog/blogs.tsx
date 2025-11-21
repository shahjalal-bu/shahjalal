"use client"

import { useState, useEffect } from 'react';
import Link from 'next/link';
import BlogCard from '@/components/blog/blog-card';
import SectionHead from '@/components/sections/section-head';
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';
import { BlogPost } from '@/db/queries';

export default function Blogs() {
  const [latestPosts, setLatestPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    async function fetchLatestPosts() {
      try {
        const res = await fetch('/api/posts/latest');
        const data = await res.json();
        setLatestPosts(data.posts || []);
      } catch (error) {
        console.error('Error fetching latest posts:', error);
      }
    }
    
    fetchLatestPosts();
  }, []);

  if (latestPosts.length === 0) {
    return null;
  }

  return (
    <div id="blogs" className="py-20">
      <SectionHead title="Latest Blog Posts" subtitle="Thoughts, tutorials, and insights on web development" />

      {/* Blog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {latestPosts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>

      {/* View All Button */}
      <div className="text-center">
        <Button asChild className="bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white shadow-lg glow-blue hover:glow-violet transition-all duration-300 transform hover:scale-105 px-8 py-6 text-base font-bold rounded-xl">
          <Link href="/blog">
            View All Blog Posts
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
