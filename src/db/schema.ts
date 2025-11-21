import { pgTable, text, integer, boolean, timestamp, serial } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const blogSeries = pgTable('blog_series', {
    id: serial('id').primaryKey(),
    slug: text('slug').notNull().unique(),
    title: text('title').notNull(),
    description: text('description').notNull(),
    coverImage: text('cover_image'),
    published: boolean('published').notNull().default(true),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const blogPosts = pgTable('blog_posts', {
    id: serial('id').primaryKey(),
    slug: text('slug').notNull().unique(),
    title: text('title').notNull(),
    excerpt: text('excerpt').notNull(),
    content: text('content').notNull(),
    author: text('author').notNull(),
    date: text('date').notNull(),
    readTime: text('read_time').notNull(),
    tags: text('tags').notNull(), // Stored as JSON string
    coverImage: text('cover_image'),
    published: boolean('published').notNull().default(true),
    seriesId: integer('series_id').references(() => blogSeries.id),
    seriesOrder: integer('series_order'),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
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
