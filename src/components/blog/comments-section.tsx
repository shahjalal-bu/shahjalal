'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { MessageSquare, ThumbsUp, Reply } from 'lucide-react';

interface Comment {
  id: number;
  author: string;
  date: string;
  content: string;
  likes: number;
}

// Sample comments
const sampleComments: Comment[] = [
  {
    id: 1,
    author: 'John Doe',
    date: '2 days ago',
    content: 'Great article! This really helped me understand the concepts better. Looking forward to more content like this.',
    likes: 12,
  },
  {
    id: 2,
    author: 'Jane Smith',
    date: '1 week ago',
    content: 'Very informative and well-written. The code examples were particularly helpful.',
    likes: 8,
  },
  {
    id: 3,
    author: 'Mike Johnson',
    date: '2 weeks ago',
    content: 'Thanks for sharing this! I was struggling with this exact problem and your solution worked perfectly.',
    likes: 15,
  },
];

export default function CommentsSection() {
  const [comments, setComments] = useState<Comment[]>(sampleComments);
  const [newComment, setNewComment] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !name.trim()) return;

    const comment: Comment = {
      id: comments.length + 1,
      author: name,
      date: 'Just now',
      content: newComment,
      likes: 0,
    };

    setComments([comment, ...comments]);
    setNewComment('');
    setName('');
  };

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <div className="flex items-center gap-2">
          <MessageSquare className="w-6 h-6 text-primary" />
          <CardTitle className="text-xl">
            Comments ({comments.length})
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Comment Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <Textarea
            placeholder="Write your comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            required
            className="min-h-[100px]"
          />
          <Button type="submit" className="bg-primary text-primary-foreground hover:bg-primary/90">
            Post Comment
          </Button>
        </form>

        {/* Divider */}
        <div className="border-t border-border" />

        {/* Comments List */}
        <div className="space-y-6">
          {comments.map((comment) => (
            <div key={comment.id} className="space-y-3">
              <div className="flex items-start gap-4">
                {/* Avatar */}
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                  {comment.author.charAt(0)}
                </div>

                {/* Content */}
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-foreground">{comment.author}</span>
                    <span className="text-sm text-muted-foreground">•</span>
                    <span className="text-sm text-muted-foreground">{comment.date}</span>
                  </div>
                  <p className="text-muted-foreground">{comment.content}</p>
                  
                  {/* Actions */}
                  <div className="flex items-center gap-4">
                    <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors">
                      <ThumbsUp className="w-4 h-4" />
                      <span>{comment.likes}</span>
                    </button>
                    <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors">
                      <Reply className="w-4 h-4" />
                      <span>Reply</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
