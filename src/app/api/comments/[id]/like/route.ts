import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { blogComments } from '@/db/schema';
import { eq, sql } from 'drizzle-orm';

export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const commentId = parseInt(id);

        if (isNaN(commentId)) {
            return NextResponse.json(
                { error: 'Invalid comment ID' },
                { status: 400 }
            );
        }

        // Increment likes
        const [updated] = await db
            .update(blogComments)
            .set({ likes: sql`${blogComments.likes} + 1` })
            .where(eq(blogComments.id, commentId))
            .returning();

        if (!updated) {
            return NextResponse.json(
                { error: 'Comment not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(updated);
    } catch (error) {
        console.error('Error liking comment:', error);
        return NextResponse.json(
            { error: 'Failed to like comment' },
            { status: 500 }
        );
    }
}
