import Link from 'next/link';
import { logoutAction } from './actions';
import { Button } from "@/components/ui/button";
import { LayoutDashboard, PlusCircle, Layers, LogOut, Settings, FileText } from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-black flex">
      {/* Sidebar */}
      <aside className="w-72 bg-[#0f172a] border-r border-slate-800 fixed h-full hidden md:flex flex-col">
        <div className="p-6 border-b border-slate-800">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
            Admin Panel
          </h1>
          <p className="text-xs text-slate-500 mt-1">Manage your content</p>
        </div>
        
        <div className="flex-1 py-6 px-4 space-y-6 overflow-y-auto">
          <div>
            <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 px-2">Overview</h2>
            <nav className="space-y-1">
              <Link href="/admin">
                <Button variant="ghost" className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-800/50 transition-all">
                  <LayoutDashboard className="mr-3 h-4 w-4 text-amber-500" />
                  Dashboard
                </Button>
              </Link>
            </nav>
          </div>

          <div>
            <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 px-2">Content</h2>
            <nav className="space-y-1">
              <Link href="/admin/posts/new">
                <Button variant="ghost" className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-800/50 transition-all">
                  <PlusCircle className="mr-3 h-4 w-4 text-blue-400" />
                  New Post
                </Button>
              </Link>
              <Link href="/admin/series/new">
                <Button variant="ghost" className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-800/50 transition-all">
                  <Layers className="mr-3 h-4 w-4 text-purple-400" />
                  New Series
                </Button>
              </Link>
            </nav>
          </div>
        </div>

        <div className="p-4 border-t border-slate-800 bg-slate-900/50">
          <form action={logoutAction}>
            <Button variant="destructive" className="w-full justify-start bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:text-red-300 border border-red-500/20">
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-72 min-h-screen bg-gradient-to-br from-slate-950 to-black">
        <div className="p-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
