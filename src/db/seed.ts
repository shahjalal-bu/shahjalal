import { db } from './index';
import { blogPosts } from './schema';
import { blogPosts as blogData } from '../data/blogData';

async function seed() {
    console.log('🌱 Seeding database...');

    // Clear existing data
    await db.delete(blogPosts);

    // Insert blog posts
    for (const post of blogData) {
        await db.insert(blogPosts).values({
            slug: post.slug,
            title: post.title,
            excerpt: post.excerpt,
            content: post.content,
            author: post.author,
            date: post.date,
            readTime: post.readTime,
            tags: JSON.stringify(post.tags),
            coverImage: post.coverImage || null,
            published: post.published,
        });
    }

    console.log('✅ Database seeded successfully!');
    console.log(`   - ${blogData.length} blog posts inserted`);
}

seed()
    .catch((error) => {
        console.error('❌ Seed failed:', error);
        process.exit(1);
    })
    .finally(() => {
        process.exit(0);
    });
