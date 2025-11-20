"use client"

import Link from 'next/link';
import { BlogPost } from '@/db/queries';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from 'lucide-react';

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <Link href={`/blog/${post.slug}`}>
      <Card className="bg-card border-2 border-border h-full flex flex-col hover:shadow-xl transition-all duration-300 hover:translate-y-2 overflow-hidden group">
        <CardHeader className="p-6 pb-2">
          <div className="flex flex-wrap gap-2 mb-3">
            {post.tags.slice(0, 3).map((tag, index) => (
              <Badge key={index} variant="secondary" className="bg-secondary text-secondary-foreground hover:bg-secondary/80">
                {tag}
              </Badge>
            ))}
          </div>
          <CardTitle className="text-2xl font-bold text-card-foreground group-hover:text-amber-500 transition-colors line-clamp-2">
            {post.title}
          </CardTitle>
        </CardHeader>
        
        <CardContent className="p-6 pt-0 flex-grow">
          <p className="text-muted-foreground line-clamp-3">
            {post.excerpt}
          </p>
        </CardContent>

        <CardFooter className="p-6 pt-4 border-t border-border mt-auto flex flex-col gap-4">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-400 flex items-center justify-center text-black font-bold">
                {post.author.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-semibold text-card-foreground">{post.author}</p>
                <p className="text-xs text-muted-foreground">{formattedDate}</p>
              </div>
            </div>
            <div className="text-sm text-muted-foreground">
              {post.readTime}
            </div>
          </div>
          
          <div className="flex items-center text-amber-500 font-semibold group-hover:translate-x-2 transition-transform w-full">
            <span>Read More</span>
            <ArrowRight className="ml-2 w-5 h-5" />
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
