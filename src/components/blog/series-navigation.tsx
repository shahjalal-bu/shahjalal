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
        {posts.map((post, index) => {
          const isActive = post.id === currentPostId;
          return (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className={cn(
                "flex items-start gap-3 p-3 rounded-lg transition-all duration-200 text-sm group relative overflow-hidden border",
                isActive
                  ? "bg-primary/10 border-primary/20 shadow-sm"
                  : "bg-transparent border-transparent hover:bg-muted/50 hover:border-border/50"
              )}
            >
              {isActive && (
                <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-primary" />
              )}
              
              {/* Number Badge */}
              <span className={cn(
                "flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold transition-all shadow-sm mt-0.5",
                isActive
                  ? "bg-primary text-primary-foreground ring-2 ring-primary/20 ring-offset-1 ring-offset-background"
                  : "bg-muted text-muted-foreground group-hover:bg-muted-foreground/20"
              )}>
                {index + 1}
              </span>

              <div className="flex-1 min-w-0">
                <span className={cn(
                  "block line-clamp-2 text-xs leading-relaxed mb-1",
                  isActive ? "font-bold text-foreground" : "font-medium text-muted-foreground group-hover:text-foreground"
                )}>
                  {post.title}
                </span>
                
                {isActive && (
                  <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-primary/10 text-primary animate-in fade-in slide-in-from-left-1 duration-300">
                    Now Reading
                  </span>
                )}
              </div>

              {isActive && <ChevronRight className="w-3.5 h-3.5 flex-shrink-0 mt-1 text-primary animate-pulse" />}
            </Link>
          );
        })}
        
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
