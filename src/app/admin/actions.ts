'use server';

import { login, logout } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { db } from '@/db';
import { blogPosts, blogSeries } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function loginAction(formData: FormData) {
    const password = formData.get('password') as string;
    const success = await login(password);

    if (success) {
        redirect('/admin');
    } else {
        return { error: 'Invalid password' };
    }
}

export async function logoutAction() {
    await logout();
    redirect('/admin/login');
}

export async function createSeriesAction(formData: FormData) {
    const title = formData.get('title') as string;
    const slug = formData.get('slug') as string;
    const description = formData.get('description') as string;
    const published = formData.get('published') === 'on';

    try {
        await db.insert(blogSeries).values({
            title,
            slug,
            description,
            published,
        });
        return { success: true };
    } catch (error) {
        console.error('Failed to create series:', error);
        return { error: 'Failed to create series' };
    }
}

export async function createPostAction(formData: FormData) {
    const title = formData.get('title') as string;
    const slug = formData.get('slug') as string;
    const excerpt = formData.get('excerpt') as string;
    const content = formData.get('content') as string;
    const author = formData.get('author') as string;
    const readTime = formData.get('readTime') as string;
    const tags = formData.get('tags') as string; // Comma separated
    const coverImage = formData.get('coverImage') as string;
    const seriesId = formData.get('seriesId') ? Number(formData.get('seriesId')) : null;
    const seriesOrder = formData.get('seriesOrder') ? Number(formData.get('seriesOrder')) : null;
    const published = formData.get('published') === 'on';

    try {
        await db.insert(blogPosts).values({
            title,
            slug,
            excerpt,
            content,
            author,
            date: new Date().toISOString(),
            readTime,
            tags: JSON.stringify(tags.split(',').map(t => t.trim())),
            coverImage: coverImage || null,
            seriesId,
            seriesOrder,
            published,
        });
        return { success: true };
    } catch (error) {
        console.error('Failed to create post:', error);
        return { error: 'Failed to create post' };
    }
}

export async function updatePostAction(postId: number, formData: FormData) {
    const title = formData.get('title') as string;
    const slug = formData.get('slug') as string;
    const excerpt = formData.get('excerpt') as string;
    const content = formData.get('content') as string;
    const author = formData.get('author') as string;
    const readTime = formData.get('readTime') as string;
    const tags = formData.get('tags') as string; // Comma separated
    const coverImage = formData.get('coverImage') as string;
    const seriesIdValue = formData.get('seriesId') as string;
    const seriesOrderValue = formData.get('seriesOrder') as string;

    // Handle seriesId - convert 'none' or empty string to null, ensure no NaN
    let seriesId: number | null = null;
    if (seriesIdValue && seriesIdValue !== 'none') {
        const parsed = Number(seriesIdValue);
        seriesId = isNaN(parsed) ? null : parsed;
    }

    // Handle seriesOrder - convert empty string to null, ensure no NaN
    let seriesOrder: number | null = null;
    if (seriesOrderValue) {
        const parsed = Number(seriesOrderValue);
        seriesOrder = isNaN(parsed) ? null : parsed;
    }


    const published = formData.get('published') === 'on';

    try {
        await db.update(blogPosts)
            .set({
                title,
                slug,
                excerpt,
                content,
                author,
                readTime,
                tags: JSON.stringify(tags.split(',').map(t => t.trim())),
                coverImage: coverImage || null,
                seriesId,
                seriesOrder,
                published,
                updatedAt: new Date(),
            })
            .where(eq(blogPosts.id, postId));

        return { success: true };
    } catch (error) {
        console.error('Failed to update post:', error);
        return { error: 'Failed to update post' };
    }
}

export async function deletePostAction(postId: number) {
    try {
        await db.delete(blogPosts)
            .where(eq(blogPosts.id, postId));

        return { success: true };
    } catch (error) {
        console.error('Failed to delete post:', error);
        return { error: 'Failed to delete post' };
    }
}
