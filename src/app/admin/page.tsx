import { db } from '@/db';
import { blogPosts, blogSeries } from '@/db/schema';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Layers, Edit, Eye } from 'lucide-react';
import { count, desc } from 'drizzle-orm';
import Link from 'next/link';

export default async function AdminDashboard() {
  const postsCount = await db.select({ count: count() }).from(blogPosts);
  const seriesCount = await db.select({ count: count() }).from(blogSeries);
  
  // Get recent posts
  const recentPosts = await db.select({
    id: blogPosts.id,
    title: blogPosts.title,
    slug: blogPosts.slug,
    published: blogPosts.published,
    createdAt: blogPosts.createdAt,
  })
  .from(blogPosts)
  .orderBy(desc(blogPosts.createdAt))
  .limit(10);

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

      {/* Recent Posts Section */}
      <Card className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] border-slate-800 shadow-xl">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-white">Recent Posts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentPosts.map((post) => (
              <div 
                key={post.id} 
                className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg hover:bg-slate-800 transition-colors border border-slate-700/50"
              >
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-medium truncate">{post.title}</h3>
                  <div className="flex items-center gap-3 mt-1">
                    <p className="text-xs text-slate-400">
                      {new Date(post.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </p>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      post.published 
                        ? 'bg-green-500/10 text-green-400' 
                        : 'bg-yellow-500/10 text-yellow-400'
                    }`}>
                      {post.published ? 'Published' : 'Draft'}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <Link href={`/blog/${post.slug}`} target="_blank">
                    <Button variant="outline" size="sm" className="gap-2 bg-slate-700 border-slate-600 hover:bg-slate-600 text-slate-200">
                      <Eye className="w-4 h-4" />
                      View
                    </Button>
                  </Link>
                  <Link href={`/admin/posts/edit/${post.id}`}>
                    <Button variant="outline" size="sm" className="gap-2 bg-blue-500/10 border-blue-500/30 hover:bg-blue-500/20 text-blue-400">
                      <Edit className="w-4 h-4" />
                      Edit
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
