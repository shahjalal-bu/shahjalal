import { db } from './index';
import { blogPosts, blogSeries } from './schema';
import { eq } from 'drizzle-orm';

async function seedSeries() {
    console.log('🌱 Seeding series data...');

    // 1. Create a new series
    const seriesData = {
        slug: 'nextjs-mastery',
        title: 'Next.js Mastery',
        description: 'A complete guide to building modern web applications with Next.js 13+, covering everything from App Router to Server Actions.',
        published: true,
    };

    // Check if series exists
    const existingSeries = await db.select().from(blogSeries).where(eq(blogSeries.slug, seriesData.slug)).limit(1);
    let seriesId;

    if (existingSeries.length > 0) {
        console.log('Series already exists, updating...');
        await db.update(blogSeries).set(seriesData).where(eq(blogSeries.id, existingSeries[0].id));
        seriesId = existingSeries[0].id;
    } else {
        console.log('Creating new series...');
        const result = await db.insert(blogSeries).values(seriesData).returning({ id: blogSeries.id });
        seriesId = result[0].id;
    }

    console.log(`Series ID: ${seriesId}`);

    // 2. Create posts for the series
    const posts = [
        {
            slug: 'nextjs-getting-started',
            title: 'Part 1: Getting Started with Next.js 13',
            excerpt: 'Introduction to the new App Router and project structure.',
            content: `# Getting Started with Next.js 13

## Introduction
Next.js 13 introduces a new paradigm for building React applications.

## Prerequisites
- Node.js 16.8+
- Basic React knowledge

## Installation
\`\`\`bash
npx create-next-app@latest my-app
\`\`\`
      `,
            author: 'Md Shahjalal',
            date: '2025-11-21',
            readTime: '5 min read',
            tags: JSON.stringify(['Next.js', 'React']),
            seriesId: seriesId,
            seriesOrder: 1,
            published: true,
        },
        {
            slug: 'nextjs-server-components',
            title: 'Part 2: Understanding Server Components',
            excerpt: 'Deep dive into React Server Components and how they change data fetching.',
            content: `# Server Components

## What are Server Components?
Server Components allow you to render components on the server, reducing the amount of JavaScript sent to the client.

## Benefits
1. Smaller bundle size
2. Direct backend access
3. Improved performance
      `,
            author: 'Md Shahjalal',
            date: '2025-11-22',
            readTime: '8 min read',
            tags: JSON.stringify(['Next.js', 'RSC']),
            seriesId: seriesId,
            seriesOrder: 2,
            published: true,
        },
        {
            slug: 'nextjs-server-actions',
            title: 'Part 3: Server Actions and Mutations',
            excerpt: 'Learn how to handle form submissions and data mutations with Server Actions.',
            content: `# Server Actions

## Introduction
Server Actions are asynchronous functions that are executed on the server. They can be used in Server and Client Components to handle form submissions and data mutations.

## Example
\`\`\`tsx
async function createPost(formData: FormData) {
  'use server'
  // Mutate data
}
\`\`\`
      `,
            author: 'Md Shahjalal',
            date: '2025-11-23',
            readTime: '10 min read',
            tags: JSON.stringify(['Next.js', 'Server Actions']),
            seriesId: seriesId,
            seriesOrder: 3,
            published: true,
        }
    ];

    for (const post of posts) {
        const existingPost = await db.select().from(blogPosts).where(eq(blogPosts.slug, post.slug)).limit(1);

        if (existingPost.length > 0) {
            console.log(`Updating post: ${post.title}`);
            await db.update(blogPosts).set(post).where(eq(blogPosts.id, existingPost[0].id));
        } else {
            console.log(`Creating post: ${post.title}`);
            await db.insert(blogPosts).values(post);
        }
    }

    console.log('✅ Series and posts seeded successfully!');
}

seedSeries()
    .catch((error) => {
        console.error('❌ Failed to seed series:', error);
        process.exit(1);
    })
    .finally(() => {
        process.exit(0);
    });
