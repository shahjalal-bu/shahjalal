'use client';

import Link from 'next/link';
import { BlogPost } from '@/db/queries';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

interface BlogListItemProps {
  post: BlogPost;
}

export default function BlogListItem({ post }: BlogListItemProps) {
  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  return (
    <Link href={`/blog/${post.slug}`}>
      <Card className="group overflow-hidden hover:shadow-2xl transition-all duration-300 hover:border-primary/50 bg-card border-border">
        <div className="flex flex-col md:flex-row gap-0">
          {/* Cover Image */}
          {post.coverImage && (
            <div className="relative w-full md:w-72 h-48 md:h-auto overflow-hidden bg-muted flex-shrink-0">
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-card/20" />
            </div>
          )}

          {/* Content */}
          <div className="flex-1 p-6 flex flex-col">
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-3">
              {post.tags.slice(0, 3).map((tag, index) => (
                <Badge 
                  key={index} 
                  variant="secondary" 
                  className="bg-primary/10 text-primary hover:bg-primary/20 text-xs"
                >
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Title */}
            <h2 className="text-2xl md:text-3xl font-bold text-foreground group-hover:text-primary transition-colors mb-3 line-clamp-2">
              {post.title}
            </h2>

            {/* Excerpt */}
            <p className="text-muted-foreground mb-4 line-clamp-2 flex-grow">
              {post.excerpt}
            </p>

            {/* Footer */}
            <div className="flex items-center justify-between border-t border-border pt-4 mt-auto">
              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">
                    {post.author.charAt(0)}
                  </div>
                  <span className="font-medium text-foreground">{post.author}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{formattedDate}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{post.readTime}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-primary font-semibold group-hover:gap-3 transition-all">
                <span className="hidden sm:inline">Read More</span>
                <ArrowRight className="w-5 h-5" />
              </div>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}
