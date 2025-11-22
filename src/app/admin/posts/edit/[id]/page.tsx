import { getAllSeries, getPostById } from '@/db/queries';
import EditPostForm from './form';
import { notFound } from 'next/navigation';

interface EditPostPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditPostPage({ params }: EditPostPageProps) {
  const { id } = await params;
  const postId = parseInt(id);
  
  const [post, series] = await Promise.all([
    getPostById(postId),
    getAllSeries()
  ]);

  if (!post) {
    notFound();
  }

  return (
    <div className="w-full">
      <h1 className="text-3xl font-bold text-foreground mb-8">Edit Post</h1>
      <EditPostForm post={post} series={series} />
    </div>
  );
}
