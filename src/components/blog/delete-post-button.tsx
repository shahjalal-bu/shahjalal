"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { deletePostAction } from '@/app/admin/actions';

interface DeletePostButtonProps {
  postId: number;
  postTitle: string;
}

export default function DeletePostButton({ postId, postTitle }: DeletePostButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    const confirmed = confirm(
      `Are you sure you want to delete "${postTitle}"?\n\nThis will permanently delete the blog post and all its comments. This action cannot be undone.`
    );
    
    if (!confirmed) return;
    
    setIsDeleting(true);
    
    const result = await deletePostAction(postId);
    
    if (result.success) {
      router.push('/blog');
      router.refresh();
    } else {
      alert(result.error || 'Failed to delete post');
      setIsDeleting(false);
    }
  };

  return (
    <Button 
      variant="destructive" 
      size="sm" 
      className="gap-2"
      onClick={handleDelete}
      disabled={isDeleting}
    >
      <Trash2 className="w-4 h-4" />
      {isDeleting ? 'Deleting...' : 'Delete Post'}
    </Button>
  );
}
