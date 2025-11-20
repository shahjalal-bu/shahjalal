"use client"

import Link from 'next/link';
import BlogCard from './BlogCard';
import SectionHead from './SectionHead';
import { getAllPosts } from '../data/blogData';

interface BlogsProps {
  innerRef?: (component: HTMLDivElement) => void;
}

export default function Blogs({ innerRef }: BlogsProps) {
  const latestPosts = getAllPosts().slice(0, 3);

  return (
    <div id="blogs" ref={innerRef} className="py-20 px-4">
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
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-8 py-4 bg-amber-400 hover:bg-amber-300 text-black font-bold rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-90"
          >
            <span>View All Blog Posts</span>
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
