import { NextResponse } from 'next/server';
import { getAllPosts, searchPosts, getAllTags, getPostsByTag } from '@/db/queries';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query');
    const tag = searchParams.get('tag');

    try {
        let posts;

        if (query) {
            posts = await searchPosts(query);
        } else if (tag) {
            posts = await getPostsByTag(tag);
        } else {
            posts = await getAllPosts();
        }

        return NextResponse.json({ posts });
    } catch (error) {
        console.error('Error fetching posts:', error);
        return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
    }
}
