'use client';

import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen, ArrowRight } from 'lucide-react';

interface BlogSeries {
  id: number;
  slug: string;
  title: string;
  description: string;
  coverImage?: string | null;
  published: boolean;
  postCount?: number;
}

interface SeriesSidebarProps {
  series: BlogSeries[];
}

export default function SeriesSidebar({ series }: SeriesSidebarProps) {
  return (
    <Card className="sticky top-24 bg-card border-border">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-bold flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-primary" />
          Blog Series
        </CardTitle>
        <CardDescription className="text-sm">
          Curated learning paths
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {series.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <BookOpen className="w-12 h-12 mx-auto mb-2 opacity-20" />
            <p className="text-sm">No series yet</p>
          </div>
        ) : (
          <div className="space-y-3 max-h-[60vh] overflow-y-auto custom-scrollbar">
            {series.map((item) => (
              <Link key={item.id} href={`/blog/series/${item.slug}`}>
                <div className="group p-2 rounded-lg border border-border hover:border-primary/50 hover:bg-muted/50 transition-all cursor-pointer">
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors mb-1 line-clamp-2 text-sm">
                    {item.title}
                  </h3>
                  <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                    {item.description}
                  </p>
                  <div className="flex items-center justify-between">
                    {item.postCount !== undefined && (
                      <Badge variant="secondary" className="text-[10px] px-1.5 py-0 h-5">
                        {item.postCount} {item.postCount === 1 ? 'post' : 'posts'}
                      </Badge>
                    )}
                    <ArrowRight className="w-3 h-3 text-primary opacity-0 group-hover:opacity-100 transition-opacity ml-auto" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {series.length > 0 && (
          <>
            <div className="border-t border-border my-3" />
            <Link href="/blog/series">
              <div className="text-center py-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors flex items-center justify-center gap-1">
                View All Series
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          </>
        )}
      </CardContent>
    </Card>
  );
}
