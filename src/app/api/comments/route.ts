import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { blogComments } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';

// GET comments for a specific post
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const postSlug = searchParams.get('postSlug');

        if (!postSlug) {
            return NextResponse.json(
                { error: 'postSlug is required' },
                { status: 400 }
            );
        }

        const comments = await db
            .select()
            .from(blogComments)
            .where(eq(blogComments.postSlug, postSlug))
            .orderBy(desc(blogComments.createdAt));

        return NextResponse.json(comments);
    } catch (error) {
        console.error('Error fetching comments:', error);
        return NextResponse.json(
            { error: 'Failed to fetch comments' },
            { status: 500 }
        );
    }
}

// POST a new comment or reply
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { postSlug, author, content, parentId } = body;

        if (!postSlug || !author || !content) {
            return NextResponse.json(
                { error: 'postSlug, author, and content are required' },
                { status: 400 }
            );
        }

        // Validate lengths
        if (author.length > 100) {
            return NextResponse.json(
                { error: 'Author name must be 100 characters or less' },
                { status: 400 }
            );
        }

        if (content.length > 5000) {
            return NextResponse.json(
                { error: 'Comment must be 5000 characters or less' },
                { status: 400 }
            );
        }

        const [newComment] = await db
            .insert(blogComments)
            .values({
                postSlug,
                author: author.trim(),
                content: content.trim(),
                parentId: parentId || null,
            })
            .returning();

        return NextResponse.json(newComment, { status: 201 });
    } catch (error) {
        console.error('Error creating comment:', error);
        return NextResponse.json(
            { error: 'Failed to create comment' },
            { status: 500 }
        );
    }
}
