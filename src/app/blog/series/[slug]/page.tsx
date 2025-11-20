import { getSeriesBySlug, getPostsBySeries } from '@/db/queries';
import BlogCard from '@/components/blog/blog-card';
import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { ArrowLeft, Layers } from 'lucide-react';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const series = await getSeriesBySlug(slug);

  if (!series) {
    return {
      title: 'Series Not Found',
    };
  }

  return {
    title: series.title,
    description: series.description,
  };
}

export default async function SeriesDetailPage({ params }: Props) {
  const { slug } = await params;
  const series = await getSeriesBySlug(slug);

  if (!series) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-6xl font-bold mb-4">404</h1>
          <p className="text-xl text-muted-foreground mb-8">Series not found</p>
          <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Link href="/blog/series">
              Back to Series List
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const posts = await getPostsBySeries(series.id);

  return (
    <div className="min-h-screen text-foreground pt-20">
      {/* Header */}
      <div className="bg-card py-12 border-b border-border">
        <div className="container mx-auto px-4 max-w-4xl">
          <Button variant="ghost" asChild className="text-amber-500 hover:text-amber-600 hover:bg-transparent mb-8 pl-0">
            <Link href="/blog/series">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Series List
            </Link>
          </Button>

          <div className="flex items-center gap-2 mb-4">
            <Layers className="w-6 h-6 text-amber-500" />
            <span className="text-amber-500 font-semibold uppercase tracking-wider">Series</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-foreground">
            {series.title}
          </h1>
          
          <p className="text-xl text-muted-foreground">
            {series.description}
          </p>
        </div>
      </div>

      {/* Posts Grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-foreground">
            {posts.length} {posts.length === 1 ? 'Part' : 'Parts'} in this series
          </h2>
          
          <div className="grid grid-cols-1 gap-6">
            {posts.map((post, index) => (
              <div key={post.id} className="relative pl-8 border-l-2 border-border pb-8 last:pb-0 last:border-l-0">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-amber-500 border-4 border-background" />
                <div className="mb-2 text-sm text-amber-500 font-semibold">Part {index + 1}</div>
                <BlogCard post={post} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
