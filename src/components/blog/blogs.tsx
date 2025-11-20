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
    <div id="blogs" className="py-20 px-4">
      <div className="container mx-auto">
        <SectionHead title="Latest Blog Posts" />
        
        <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
          Thoughts, tutorials, and insights on web development, programming, and technology
        </p>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {latestPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Button asChild className="bg-amber-400 hover:bg-amber-500 text-black font-bold px-8 py-6 rounded-lg text-lg">
            <Link href="/blog">
              View All Blog Posts
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
