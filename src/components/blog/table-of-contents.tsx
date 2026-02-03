"use client"

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { List } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
}

export default function TableOfContents({ content }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    // Parse headings from markdown content
    const lines = content.split('\n');
    console.log(lines);
    const extractedHeadings: TOCItem[] = [];
    const seenIds = new Map<string, number>(); // Track duplicate IDs
    
    lines.forEach((line) => {
        const trimLine = line.trim();
        const match = trimLine.match(/^(#{2,6})\s+(.+)$/);
      console.log(match);
      if (match) {
        const level = match[1].length;
        const text = match[2];
        let baseId = text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
        
        // Ensure ID is not empty
        if (!baseId) {
          baseId = 'heading';
        }
        
        // Make ID unique if it already exists
        let id = baseId;
        if (seenIds.has(baseId)) {
          const count = seenIds.get(baseId)! + 1;
          seenIds.set(baseId, count);
          id = `${baseId}-${count}`;
        } else {
          seenIds.set(baseId, 0);
        }
        
        extractedHeadings.push({ id, text, level });
      }
    });

    setHeadings(extractedHeadings);

    // Set up intersection observer for active state
    const observer = new IntersectionObserver(
      (entries) => {
        // Find all currently intersecting entries
        const visibleEntries = entries.filter(entry => entry.isIntersecting);
        
        if (visibleEntries.length > 0) {
          // Get the topmost visible heading
          const topEntry = visibleEntries.reduce((top, entry) => {
            return entry.boundingClientRect.top < top.boundingClientRect.top ? entry : top;
          });
          
          setActiveId(topEntry.target.id);
        }
      },
      {
        rootMargin: '-80px 0px -80% 0px',
        threshold: [0, 0.25, 0.5, 0.75, 1]
      }
    );

    extractedHeadings.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [content]);

  // Auto-scroll active item into view
  useEffect(() => {
    if (activeId) {
      const activeElement = document.querySelector(`a[href="#${activeId}"]`);
      if (activeElement) {
        activeElement.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'nearest'
        });
      }
    }
  }, [activeId]);

  if (headings.length === 0) {
    return (
      <Card className="bg-card border-border">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <List className="w-5 h-5 text-primary" />
            <CardTitle className="text-base font-bold">Table of Contents</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground text-center py-4">
            No headings found
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <List className="w-5 h-5 text-primary" />
          <CardTitle className="text-base font-bold">Table of Contents</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <nav className="space-y-1 max-h-[60vh] overflow-y-auto custom-scrollbar">
          {headings.map((heading) => (
            <a
              key={heading.id}
              href={`#${heading.id}`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(heading.id)?.scrollIntoView({ 
                  behavior: 'smooth',
                  block: 'start'
                });
                setActiveId(heading.id);
              }}
              className={cn(
                "block py-1.5 px-3 text-sm transition-all duration-200 border-l-2 relative group",
                heading.level === 3 && "pl-6",
                heading.level === 4 && "pl-9",
                heading.level >= 5 && "pl-12",
                activeId === heading.id
                  ? "border-primary text-foreground font-medium bg-primary/10"
                  : "border-transparent text-foreground/70 hover:text-foreground hover:bg-muted/30"
              )}
            >
              {heading.text}
            </a>
          ))}
        </nav>
      </CardContent>
    </Card>
  );
}
