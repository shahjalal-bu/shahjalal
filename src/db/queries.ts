import { db } from './index';
import { blogPosts, blogSeries } from './schema';
import { eq, like, or, desc, asc } from 'drizzle-orm';

export interface BlogPost {
    id: number;
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    author: string;
    date: string;
    readTime: string;
    tags: string[];
    coverImage?: string | null;
    published: boolean;
    seriesId?: number | null;
    seriesOrder?: number | null;
    createdAt: string;
    updatedAt: string;
    series?: {
        id: number;
        title: string;
        slug: string;
    } | null;
}

export interface BlogSeries {
    id: number;
    slug: string;
    title: string;
    description: string;
    coverImage?: string | null;
    published: boolean;
    createdAt: string;
    updatedAt: string;
}

// Helper function to parse tags
function parseTags(tagsString: string): string[] {
    try {
        return JSON.parse(tagsString);
    } catch {
        return [];
    }
}

// Helper function to format blog post
function formatBlogPost(post: any): BlogPost {
    return {
        ...post,
        tags: parseTags(post.tags),
        coverImage: post.coverImage || undefined,
        series: post.series ? {
            id: post.series.id,
            title: post.series.title,
            slug: post.series.slug,
        } : null,
    };
}

export async function getAllPosts(): Promise<BlogPost[]> {
    const posts = await db.query.blogPosts.findMany({
        where: eq(blogPosts.published, true),
        orderBy: [desc(blogPosts.date)],
        with: {
            series: true,
        },
    });

    return posts.map(formatBlogPost);
}

export async function getPostBySlug(slug: string): Promise<BlogPost | undefined> {
    const post = await db.query.blogPosts.findFirst({
        where: eq(blogPosts.slug, slug),
        with: {
            series: true,
        },
    });

    return post ? formatBlogPost(post) : undefined;
}

export async function getAllSeries(): Promise<BlogSeries[]> {
    const series = await db.select()
        .from(blogSeries)
        .where(eq(blogSeries.published, true))
        .orderBy(desc(blogSeries.createdAt));

    return series.map(s => ({
        ...s,
        coverImage: s.coverImage || undefined,
    }));
}

export async function getSeriesBySlug(slug: string): Promise<BlogSeries | undefined> {
    const series = await db.select()
        .from(blogSeries)
        .where(eq(blogSeries.slug, slug))
        .limit(1);

    return series.length > 0 ? {
        ...series[0],
        coverImage: series[0].coverImage || undefined,
    } : undefined;
}

export async function getPostsBySeries(seriesId: number): Promise<BlogPost[]> {
    const posts = await db.query.blogPosts.findMany({
        where: eq(blogPosts.seriesId, seriesId),
        orderBy: [asc(blogPosts.seriesOrder)],
        with: {
            series: true,
        },
    });

    return posts.map(formatBlogPost);
}

export async function getPostsByTag(tag: string): Promise<BlogPost[]> {
    const allPosts = await getAllPosts();
    return allPosts
        .filter(post => post.tags.includes(tag))
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getAllTags(): Promise<string[]> {
    const posts = await getAllPosts();
    const tags = new Set<string>();

    posts.forEach(post => {
        post.tags.forEach(tag => tags.add(tag));
    });

    return Array.from(tags).sort();
}

export async function searchPosts(query: string): Promise<BlogPost[]> {
    const lowerQuery = query.toLowerCase();
    const allPosts = await getAllPosts();

    return allPosts.filter(post =>
        post.title.toLowerCase().includes(lowerQuery) ||
        post.excerpt.toLowerCase().includes(lowerQuery) ||
        post.content.toLowerCase().includes(lowerQuery) ||
        post.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
    ).sort((a, b) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
    );
}
