"use client"

import Link from 'next/link';
import { BlogPost } from '../data/blogData';

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <Link href={`/blog/${post.slug}`}>
      <div className="bg-linear-2 border-2 border-[#14315c] rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:translate-y-2 h-full flex flex-col">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-3">
          {post.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 text-xs font-semibold bg-[#14315c] text-blue-100 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h3 className="text-2xl font-bold mb-3 text-white hover:text-amber-400 transition-colors line-clamp-2">
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className="text-slate-200 mb-4 line-clamp-3 flex-grow">
          {post.excerpt}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-[#14315c] mt-auto">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-400 flex items-center justify-center text-black font-bold">
              {post.author.charAt(0)}
            </div>
            <div>
              <p className="text-sm font-semibold text-white">{post.author}</p>
              <p className="text-xs text-slate-400">{formattedDate}</p>
            </div>
          </div>
          <div className="text-sm text-slate-400">
            {post.readTime}
          </div>
        </div>

        {/* Read More Indicator */}
        <div className="mt-4 flex items-center text-amber-400 font-semibold group">
          <span>Read More</span>
          <svg
            className="w-5 h-5 ml-2 transform group-hover:translate-x-2 transition-transform"
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
        </div>
      </div>
    </Link>
  );
}
