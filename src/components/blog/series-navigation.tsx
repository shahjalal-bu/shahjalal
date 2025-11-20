'use client';

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Layers, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Series {
  id: number;
  title: string;
  slug: string;
}

interface SeriesPost {
  id: number;
  slug: string;
  title: string;
}

interface SeriesNavigationProps {
  series: Series;
  posts: SeriesPost[];
  currentPostId: number;
}

export default function SeriesNavigation({ series, posts, currentPostId }: SeriesNavigationProps) {
  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <Layers className="w-5 h-5 text-primary" />
          <CardTitle className="text-base font-bold">Series</CardTitle>
        </div>
        <p className="text-sm text-muted-foreground pt-1">{series.title}</p>
      </CardHeader>
      <CardContent className="space-y-1">
        {posts.map((post, index) => (
          <Link
            key={post.id}
            href={`/blog/${post.slug}`}
            className={cn(
              "flex items-start gap-3 p-2 rounded-lg transition-all text-sm",
              post.id === currentPostId
                ? "bg-primary/10 text-primary border-l-2 border-primary"
                : "text-muted-foreground hover:bg-muted hover:text-foreground border-l-2 border-transparent"
            )}
          >
            <span className={cn(
              "flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold",
              post.id === currentPostId
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground"
            )}>
              {index + 1}
            </span>
            <span className="flex-1 line-clamp-2 font-medium">
              {post.title}
            </span>
            {post.id === currentPostId && <ChevronRight className="w-4 h-4 flex-shrink-0" />}
          </Link>
        ))}
        
        <div className="pt-3 mt-3 border-t border-border">
          <Link 
            href={`/blog/series/${series.slug}`}
            className="text-sm text-primary hover:text-primary/80 transition-colors flex items-center justify-center gap-1 font-medium"
          >
            View Full Series
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
