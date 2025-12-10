import { getPostBySlug, getAllPosts, getPostsBySeries } from '@/db/queries';
import BlogPostContent from './blog-post-content';
import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from "@/components/ui/button";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://shahjalal.vercel.app/blog/${slug}`,
      siteName: 'Md Shahjalal',
      images: post.coverImage ? [
        {
          url: post.coverImage,
          width: 1200,
          height: 630,
          alt: post.title,
        }
      ] : [],
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: post.coverImage ? [post.coverImage] : [],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  const allPosts = await getAllPosts();

  if (!post) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-6xl font-bold mb-4">404</h1>
          <p className="text-xl text-gray-400 mb-8">Blog post not found</p>
          <Button asChild className="bg-cyan-400 text-black hover:bg-cyan-300">
            <Link href="/blog">
              Back to Blog
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  // Get related posts (same tags, excluding current post)
  const relatedPosts = allPosts
    .filter(p => p.id !== post.id && p.tags.some(tag => post.tags.includes(tag)))
    .slice(0, 3);

  // Get series posts if applicable
  let seriesPosts: any[] = [];
  if (post.seriesId) {
    seriesPosts = await getPostsBySeries(post.seriesId);
  }

  return <BlogPostContent post={post} relatedPosts={relatedPosts} seriesPosts={seriesPosts} />;
}
