"use client"

import Link from 'next/link';
import { BlogSeries } from '@/db/queries';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Layers } from 'lucide-react';

interface SeriesCardProps {
  series: BlogSeries;
}

export default function SeriesCard({ series }: SeriesCardProps) {
  return (
    <Link href={`/blog/series/${series.slug}`}>
      <Card className="bg-card border-2 border-border h-full flex flex-col hover:shadow-xl transition-all duration-300 hover:translate-y-2 overflow-hidden group">
        <CardHeader className="p-6 pb-2">
          <div className="flex items-center gap-2 mb-3">
            <Badge variant="secondary" className="bg-amber-400 text-black hover:bg-amber-500">
              <Layers className="w-3 h-3 mr-1" />
              Series
            </Badge>
          </div>
          <CardTitle className="text-2xl font-bold text-card-foreground group-hover:text-amber-500 transition-colors line-clamp-2">
            {series.title}
          </CardTitle>
        </CardHeader>
        
        <CardContent className="p-6 pt-0 flex-grow">
          <p className="text-muted-foreground line-clamp-3">
            {series.description}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
