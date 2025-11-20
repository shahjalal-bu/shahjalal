import { NextResponse } from 'next/server';
import { getAllPosts } from '@/db/queries';

export async function GET() {
    try {
        const allPosts = await getAllPosts();
        const latestPosts = allPosts.slice(0, 3);
        return NextResponse.json({ posts: latestPosts });
    } catch (error) {
        console.error('Error fetching latest posts:', error);
        return NextResponse.json({ error: 'Failed to fetch latest posts' }, { status: 500 });
    }
}
