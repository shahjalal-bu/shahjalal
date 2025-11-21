'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Hash, X } from 'lucide-react';

interface TagsSidebarProps {
  tags: string[];
  selectedTag: string | null;
  onTagSelect: (tag: string | null) => void;
}

export default function TagsSidebar({ tags, selectedTag, onTagSelect }: TagsSidebarProps) {
  return (
    <Card className="sticky top-24 bg-card border-border">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-bold flex items-center gap-2">
          <Hash className="w-5 h-5 text-primary" />
          Filter by Tags
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {/* All Tags Option */}
        <button
          onClick={() => onTagSelect(null)}
          className={`w-full text-left px-3 py-2 rounded-lg transition-all flex items-center justify-between group ${
            selectedTag === null
              ? 'bg-primary text-primary-foreground shadow-md'
              : 'hover:bg-muted text-foreground'
          }`}
        >
          <span className="font-medium">All Posts</span>
          {selectedTag === null && <Badge variant="secondary" className="bg-primary-foreground/20">✓</Badge>}
        </button>

        {/* Divider */}
        <div className="border-t border-border my-3" />

        {/* Individual Tags */}
        <div className="space-y-1 max-h-[60vh] overflow-y-auto custom-scrollbar">
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => onTagSelect(tag === selectedTag ? null : tag)}
              className={`w-full text-left px-3 py-2 rounded-md transition-all duration-200 flex items-center justify-between group text-sm relative overflow-hidden ${
                selectedTag === tag
                  ? 'bg-primary/5 text-primary font-medium shadow-sm border border-primary/10'
                  : 'hover:bg-muted/50 text-muted-foreground hover:text-foreground border border-transparent'
              }`}
            >
              {selectedTag === tag && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary" />
              )}
              <span className="flex items-center gap-2">
                <Hash className="w-3 h-3" />
                <span className={selectedTag === tag ? 'font-semibold' : ''}>{tag}</span>
              </span>
              {selectedTag === tag && (
                <X className="w-3 h-3 opacity-60 group-hover:opacity-100" />
              )}
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
