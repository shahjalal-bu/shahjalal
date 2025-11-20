import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';

export const blogSeries = sqliteTable('blog_series', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    slug: text('slug').notNull().unique(),
    title: text('title').notNull(),
    description: text('description').notNull(),
    coverImage: text('cover_image'),
    published: integer('published', { mode: 'boolean' }).notNull().default(true),
    createdAt: text('created_at').notNull().default('CURRENT_TIMESTAMP'),
    updatedAt: text('updated_at').notNull().default('CURRENT_TIMESTAMP'),
});

export const blogPosts = sqliteTable('blog_posts', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    slug: text('slug').notNull().unique(),
    title: text('title').notNull(),
    excerpt: text('excerpt').notNull(),
    content: text('content').notNull(),
    author: text('author').notNull(),
    date: text('date').notNull(),
    readTime: text('read_time').notNull(),
    tags: text('tags').notNull(), // Stored as JSON string
    coverImage: text('cover_image'),
    published: integer('published', { mode: 'boolean' }).notNull().default(true),
    seriesId: integer('series_id').references(() => blogSeries.id),
    seriesOrder: integer('series_order'),
    createdAt: text('created_at').notNull().default('CURRENT_TIMESTAMP'),
    updatedAt: text('updated_at').notNull().default('CURRENT_TIMESTAMP'),
});

export const seriesRelations = relations(blogSeries, ({ many }) => ({
    posts: many(blogPosts),
}));

export const postsRelations = relations(blogPosts, ({ one }) => ({
    series: one(blogSeries, {
        fields: [blogPosts.seriesId],
        references: [blogSeries.id],
    }),
}));

export type BlogSeries = typeof blogSeries.$inferSelect;


export type BlogPost = typeof blogPosts.$inferSelect;
export type NewBlogPost = typeof blogPosts.$inferInsert;
