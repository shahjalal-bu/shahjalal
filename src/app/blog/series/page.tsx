"use client"

import { useState, useEffect } from 'react';
import SeriesCard from '@/components/blog/series-card';
import { BlogSeries } from '@/db/queries';
import { Search } from 'lucide-react';

export default function SeriesListPage() {
  const [series, setSeries] = useState<BlogSeries[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchSeries() {
      try {
        const res = await fetch('/api/series');
        const data = await res.json();
        setSeries(data.series || []);
      } catch (error) {
        console.error('Error fetching series:', error);
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchSeries();
  }, []);

  return (
    <div className="min-h-screen text-white pt-20">
      {/* Header */}
      <div className="bg-linear-2 py-20 border-b-2 border-[#14315c]">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-4">
              <span className="text-amber-500">Blog Series</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Deep dives and comprehensive guides organized into series
            </p>
          </div>
        </div>
      </div>

      {/* Series Grid */}
      <div className="container mx-auto px-4 py-12">
        {isLoading ? (
          <div className="text-center text-slate-400">Loading series...</div>
        ) : series.length > 0 ? (
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {series.map((s) => (
              <SeriesCard key={s.id} series={s} />
            ))}
          </div>
        ) : (
          <div className="max-w-6xl mx-auto text-center py-20">
            <div className="flex justify-center mb-4">
              <Layers className="w-24 h-24 text-slate-600" />
            </div>
            <h3 className="text-2xl font-bold text-slate-300 mb-2">No series found</h3>
            <p className="text-slate-400">Check back later for new series!</p>
          </div>
        )}
      </div>
    </div>
  );
}

import { Layers } from 'lucide-react';
