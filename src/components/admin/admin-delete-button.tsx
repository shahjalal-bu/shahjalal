"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { deletePostAction } from '@/app/admin/actions';

interface AdminDeleteButtonProps {
  postId: number;
  postTitle: string;
}

export default function AdminDeleteButton({ postId, postTitle }: AdminDeleteButtonProps) {
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
      router.refresh(); // Refresh the current page to update the list
    } else {
      alert(result.error || 'Failed to delete post');
      setIsDeleting(false);
    }
  };

  return (
    <Button 
      variant="outline" 
      size="sm" 
      className="gap-2 bg-red-500/10 border-red-500/30 hover:bg-red-500/20 text-red-400"
      onClick={handleDelete}
      disabled={isDeleting}
    >
      <Trash2 className="w-4 h-4" />
      {isDeleting ? 'Deleting...' : 'Delete'}
    </Button>
  );
}
