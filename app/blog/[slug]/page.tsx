"use client"

import { useParams, useRouter } from 'next/navigation';
import { getPostBySlug, getAllPosts } from '../../data/blogData';
import MarkdownViewer from '../../components/MarkdownViewer';
import Link from 'next/link';

export default function BlogPostPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const post = getPostBySlug(slug);
  const allPosts = getAllPosts();

  if (!post) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-6xl font-bold mb-4">404</h1>
          <p className="text-xl text-gray-400 mb-8">Blog post not found</p>
          <Link
            href="/blog"
            className="px-6 py-3 bg-cyan-400 text-black font-semibold rounded-lg hover:bg-cyan-300 transition-colors"
          >
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Get related posts (same tags, excluding current post)
  const relatedPosts = allPosts
    .filter(p => p.id !== post.id && p.tags.some(tag => post.tags.includes(tag)))
    .slice(0, 3);

  return (
    <div className="min-h-screen dark-body text-white">
      {/* Header */}
      <div className="bg-linear-2 py-12 border-b-2 border-[#14315c]">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Back Button */}
          <Link
            href="/blog"
            className="inline-flex items-center text-amber-400 hover:text-amber-300 mb-8 transition-colors"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Blog
          </Link>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 text-sm font-semibold bg-[#14315c] text-blue-100 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            {post.title}
          </h1>

          {/* Meta Info */}
          <div className="flex items-center gap-4 text-slate-300">
            <div className="flex items-center gap-2">
              <div className="w-12 h-12 rounded-full bg-amber-400 flex items-center justify-center text-black font-bold text-lg">
                {post.author.charAt(0)}
              </div>
              <span className="font-semibold text-white">{post.author}</span>
            </div>
            <span>•</span>
            <span>{formattedDate}</span>
            <span>•</span>
            <span>{post.readTime}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <article className="bg-linear-2 border-2 border-[#14315c] rounded-lg p-8 md:p-12 shadow-xl">
          <MarkdownViewer content={post.content} />
        </article>

        {/* Share Buttons */}
        <div className="mt-12 flex items-center justify-center gap-4">
          <span className="text-slate-300 font-semibold">Share this article:</span>
          <button
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              alert('Link copied to clipboard!');
            }}
            className="px-4 py-2 bg-[#14315c] hover:bg-[#14315ccb] text-blue-100 rounded-lg transition-colors flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            Copy Link
          </button>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-3xl font-bold mb-8 text-center text-amber-400">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.id}
                  href={`/blog/${relatedPost.slug}`}
                  className="bg-linear-2 border-2 border-[#14315c] rounded-lg p-6 hover:shadow-xl transition-all duration-300 hover:translate-y-2"
                >
                  <h3 className="font-bold text-lg mb-2 line-clamp-2 hover:text-amber-400 transition-colors">
                    {relatedPost.title}
                  </h3>
                  <p className="text-sm text-slate-200 line-clamp-2">
                    {relatedPost.excerpt}
                  </p>
                  <div className="mt-4 text-sm text-slate-400">
                    {relatedPost.readTime}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
