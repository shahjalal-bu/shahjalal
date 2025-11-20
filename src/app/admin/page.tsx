import { db } from '@/db';
import { blogPosts, blogSeries } from '@/db/schema';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Layers } from 'lucide-react';
import { count } from 'drizzle-orm';

export default async function AdminDashboard() {
  const postsCount = await db.select({ count: count() }).from(blogPosts);
  const seriesCount = await db.select({ count: count() }).from(blogSeries);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white tracking-tight">Dashboard Overview</h1>
        <div className="text-sm text-slate-400">Welcome back, Admin</div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] border-slate-800 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-400 uppercase tracking-wider">Total Posts</CardTitle>
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <FileText className="h-5 w-5 text-blue-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-white mb-1">{postsCount[0].count}</div>
            <p className="text-xs text-slate-500">Published articles</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] border-slate-800 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-400 uppercase tracking-wider">Total Series</CardTitle>
            <div className="p-2 bg-purple-500/10 rounded-lg">
              <Layers className="h-5 w-5 text-purple-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-white mb-1">{seriesCount[0].count}</div>
            <p className="text-xs text-slate-500">Active series</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
