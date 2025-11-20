'use server';

import { login, logout } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { db } from '@/db';
import { blogPosts, blogSeries } from '@/db/schema';

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
