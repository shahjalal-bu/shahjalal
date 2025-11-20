import { getAllSeries } from '@/db/queries';
import NewPostForm from './form';

export default async function NewPostPage() {
  const series = await getAllSeries();

  return (
    <div className="w-full">
      <h1 className="text-3xl font-bold text-foreground mb-8">Create New Post</h1>
      <NewPostForm series={series} />
    </div>
  );
}
