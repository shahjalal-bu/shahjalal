import { Pool } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const blogSeries = [
    {
        slug: 'next-js-mastery',
        title: 'Next.js 14 Mastery',
        description: 'A comprehensive guide to building modern web applications with Next.js 14, covering App Router, Server Components, and more.',
        coverImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800',
        published: true,
    },
    {
        slug: 'postgresql-deep-dive',
        title: 'PostgreSQL Deep Dive',
        description: 'Master PostgreSQL from basics to advanced topics including query optimization, indexing strategies, and database design.',
        coverImage: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800',
        published: true,
    },
];

const blogPosts = [
    {
        slug: 'getting-started-with-nextjs-14',
        title: 'Getting Started with Next.js 14: A Complete Guide',
        excerpt: 'Learn how to build modern, performant web applications with Next.js 14. This guide covers everything from setup to deployment.',
        content: `# Getting Started with Next.js 14

## Introduction

Next.js 14 brings powerful features that make building React applications easier and more performant than ever. In this comprehensive guide, we'll explore the fundamentals of Next.js 14 and build a real-world application.

## What's New in Next.js 14?

Next.js 14 introduces several exciting features:

- **Turbopack**: A new Rust-based bundler that's significantly faster than Webpack
- **Server Actions**: Simplified data mutations without API routes
- **Partial Prerendering**: Combine static and dynamic content seamlessly
- **Improved Image Optimization**: Better performance with the Image component

## Setting Up Your Project

First, create a new Next.js project:

\`\`\`bash
npx create-next-app@latest my-app
cd my-app
npm run dev
\`\`\`

## Understanding the App Router

The App Router introduces a new paradigm for building Next.js applications. Here's the basic structure:

\`\`\`
app/
  layout.tsx    # Root layout
  page.tsx      # Home page
  about/
    page.tsx    # About page
\`\`\`

## Server Components vs Client Components

By default, all components in the App Router are Server Components. This means they:

- Run only on the server
- Don't increase the JavaScript bundle size
- Can directly access backend resources

To use Client Components, add the \`"use client"\` directive:

\`\`\`tsx
"use client"

import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
\`\`\`

## Data Fetching

Next.js 14 makes data fetching simple with async Server Components:

\`\`\`tsx
async function getData() {
  const res = await fetch('https://api.example.com/data');
  return res.json();
}

export default async function Page() {
  const data = await getData();
  return <div>{JSON.stringify(data)}</div>;
}
\`\`\`

## Conclusion

Next.js 14 is a powerful framework that simplifies building modern web applications. With features like Server Components, Server Actions, and Turbopack, you can build faster, more efficient applications with less code.

Stay tuned for more posts in this series where we'll dive deeper into advanced topics!`,
        author: 'Md Shahjalal',
        date: '2024-11-15',
        readTime: '8 min read',
        tags: JSON.stringify(['Next.js', 'React', 'Web Development', 'JavaScript']),
        coverImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800',
        published: true,
        seriesOrder: 1,
    },
    {
        slug: 'server-actions-nextjs-14',
        title: 'Mastering Server Actions in Next.js 14',
        excerpt: 'Server Actions revolutionize how we handle data mutations in Next.js. Learn how to use them effectively in your applications.',
        content: `# Mastering Server Actions in Next.js 14

## What are Server Actions?

Server Actions are a new feature in Next.js 14 that allow you to define server-side functions that can be called directly from your components. They eliminate the need for API routes for simple data mutations.

## Benefits of Server Actions

1. **Simplified Code**: No need to create separate API routes
2. **Type Safety**: Full TypeScript support
3. **Progressive Enhancement**: Works without JavaScript enabled
4. **Built-in Security**: Automatic CSRF protection

## Creating Your First Server Action

Here's a simple example:

\`\`\`tsx
// app/actions.ts
'use server'

export async function createPost(formData: FormData) {
  const title = formData.get('title');
  const content = formData.get('content');
  
  // Save to database
  await db.insert(posts).values({ title, content });
  
  revalidatePath('/blog');
}
\`\`\`

## Using Server Actions in Forms

\`\`\`tsx
// app/new-post/page.tsx
import { createPost } from '../actions';

export default function NewPost() {
  return (
    <form action={createPost}>
      <input name="title" required />
      <textarea name="content" required />
      <button type="submit">Create Post</button>
    </form>
  );
}
\`\`\`

## Advanced Patterns

### Error Handling

\`\`\`tsx
'use server'

export async function updateUser(userId: string, formData: FormData) {
  try {
    const name = formData.get('name');
    await db.update(users).set({ name }).where(eq(users.id, userId));
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Failed to update user' };
  }
}
\`\`\`

### With Client Components

\`\`\`tsx
'use client'

import { updateUser } from './actions';
import { useFormStatus } from 'react-dom';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button disabled={pending}>
      {pending ? 'Saving...' : 'Save'}
    </button>
  );
}

export default function UserForm({ userId }: { userId: string }) {
  return (
    <form action={updateUser.bind(null, userId)}>
      <input name="name" />
      <SubmitButton />
    </form>
  );
}
\`\`\`

## Best Practices

1. Always validate input data
2. Use revalidatePath or revalidateTag after mutations
3. Handle errors gracefully
4. Consider using optimistic updates for better UX
5. Use TypeScript for type safety

## Conclusion

Server Actions are a game-changer for Next.js applications. They simplify data mutations while maintaining security and type safety. Start using them in your projects today!`,
        author: 'Md Shahjalal',
        date: '2024-11-18',
        readTime: '10 min read',
        tags: JSON.stringify(['Next.js', 'Server Actions', 'React', 'Web Development']),
        coverImage: 'https://images.unsplash.com/photo-1618477247222-acbdb0e159b3?w=800',
        published: true,
        seriesOrder: 2,
    },
    {
        slug: 'postgresql-optimization-guide',
        title: 'PostgreSQL Query Optimization: A Practical Guide',
        excerpt: 'Learn how to optimize your PostgreSQL queries for better performance. Includes indexing strategies, query analysis, and real-world examples.',
        content: `# PostgreSQL Query Optimization: A Practical Guide

## Introduction

Database performance is crucial for any application. In this guide, we'll explore practical techniques to optimize your PostgreSQL queries.

## Understanding EXPLAIN

The \`EXPLAIN\` command is your best friend for query optimization:

\`\`\`sql
EXPLAIN ANALYZE
SELECT * FROM users WHERE email = 'test@example.com';
\`\`\`

Key metrics to look for:
- **Seq Scan**: Sequential scan (slow for large tables)
- **Index Scan**: Using an index (fast)
- **Cost**: Estimated query cost
- **Rows**: Number of rows processed

## Indexing Strategies

### Basic Indexes

\`\`\`sql
CREATE INDEX idx_users_email ON users(email);
\`\`\`

### Composite Indexes

\`\`\`sql
CREATE INDEX idx_posts_user_date ON posts(user_id, created_at DESC);
\`\`\`

### Partial Indexes

\`\`\`sql
CREATE INDEX idx_active_users ON users(id) WHERE active = true;
\`\`\`

## Query Optimization Techniques

### 1. Avoid SELECT *

Instead of:
\`\`\`sql
SELECT * FROM users;
\`\`\`

Use:
\`\`\`sql
SELECT id, name, email FROM users;
\`\`\`

### 2. Use LIMIT

\`\`\`sql
SELECT * FROM posts ORDER BY created_at DESC LIMIT 10;
\`\`\`

### 3. Optimize JOINs

\`\`\`sql
-- Good: Use proper indexes
SELECT u.name, p.title
FROM users u
INNER JOIN posts p ON u.id = p.user_id
WHERE u.active = true;
\`\`\`

### 4. Use CTEs for Complex Queries

\`\`\`sql
WITH recent_users AS (
  SELECT id, name FROM users WHERE created_at > NOW() - INTERVAL '30 days'
)
SELECT ru.name, COUNT(p.id) as post_count
FROM recent_users ru
LEFT JOIN posts p ON ru.id = p.user_id
GROUP BY ru.id, ru.name;
\`\`\`

## Monitoring and Maintenance

### Analyze Tables

\`\`\`sql
ANALYZE users;
\`\`\`

### Vacuum

\`\`\`sql
VACUUM ANALYZE posts;
\`\`\`

### Check Index Usage

\`\`\`sql
SELECT schemaname, tablename, indexname, idx_scan
FROM pg_stat_user_indexes
ORDER BY idx_scan;
\`\`\`

## Real-World Example

Before optimization:
\`\`\`sql
-- Slow: 2500ms
SELECT * FROM posts WHERE LOWER(title) LIKE '%nextjs%';
\`\`\`

After optimization:
\`\`\`sql
-- Fast: 15ms
CREATE INDEX idx_posts_title_gin ON posts USING gin(to_tsvector('english', title));

SELECT * FROM posts WHERE to_tsvector('english', title) @@ to_tsquery('nextjs');
\`\`\`

## Best Practices

1. **Always use indexes** on foreign keys
2. **Monitor slow queries** regularly
3. **Update statistics** with ANALYZE
4. **Use connection pooling** for better resource management
5. **Partition large tables** when appropriate

## Conclusion

Query optimization is an ongoing process. Use these techniques to keep your database performant as your application grows!`,
        author: 'Md Shahjalal',
        date: '2024-11-10',
        readTime: '12 min read',
        tags: JSON.stringify(['PostgreSQL', 'Database', 'Performance', 'Optimization']),
        coverImage: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800',
        published: true,
        seriesOrder: 1,
    },
    {
        slug: 'typescript-best-practices-2024',
        title: 'TypeScript Best Practices for 2024',
        excerpt: 'Modern TypeScript patterns and practices to write better, more maintainable code. Learn advanced types, utility types, and more.',
        content: `# TypeScript Best Practices for 2024

## Introduction

TypeScript has become essential for modern JavaScript development. Let's explore the best practices that will make your code more robust and maintainable.

## Use Strict Mode

Always enable strict mode in your \`tsconfig.json\`:

\`\`\`json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitOverride": true
  }
}
\`\`\`

## Type vs Interface

### Use Type for

Unions and intersections:
\`\`\`typescript
type ID = string | number;
type User = Person & { role: string };
\`\`\`

### Use Interface for

Object shapes and class contracts:
\`\`\`typescript
interface User {
  id: string;
  name: string;
  email: string;
}
\`\`\`

## Advanced Type Patterns

### Conditional Types

\`\`\`typescript
type IsString<T> = T extends string ? true : false;

type A = IsString<string>; // true
type B = IsString<number>; // false
\`\`\`

### Mapped Types

\`\`\`typescript
type Readonly<T> = {
  readonly [K in keyof T]: T[K];
};

type User = { id: string; name: string };
type ReadonlyUser = Readonly<User>;
\`\`\`

### Template Literal Types

\`\`\`typescript
type EventName = \`on\${Capitalize<string>}\`;

const event: EventName = 'onClick'; // Valid
const invalid: EventName = 'click'; // Error
\`\`\`

## Utility Types

### Pick and Omit

\`\`\`typescript
interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

type PublicUser = Omit<User, 'password'>;
type UserCredentials = Pick<User, 'email' | 'password'>;
\`\`\`

### Required and Partial

\`\`\`typescript
type UpdateUser = Partial<User>;
type RequiredUser = Required<User>;
\`\`\`

## Type Guards

\`\`\`typescript
function isString(value: unknown): value is string {
  return typeof value === 'string';
}

function processValue(value: string | number) {
  if (isString(value)) {
    // TypeScript knows value is string here
    console.log(value.toUpperCase());
  }
}
\`\`\`

## Generic Constraints

\`\`\`typescript
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user = { name: 'John', age: 30 };
const name = getProperty(user, 'name'); // string
const age = getProperty(user, 'age'); // number
\`\`\`

## Discriminated Unions

\`\`\`typescript
type Success = { status: 'success'; data: string };
type Error = { status: 'error'; error: string };
type Result = Success | Error;

function handleResult(result: Result) {
  if (result.status === 'success') {
    console.log(result.data); // TypeScript knows data exists
  } else {
    console.log(result.error); // TypeScript knows error exists
  }
}
\`\`\`

## Best Practices

1. **Avoid \`any\`**: Use \`unknown\` instead
2. **Use const assertions**: For literal types
3. **Prefer readonly**: For immutable data
4. **Use satisfies operator**: For type checking without widening
5. **Enable strict null checks**: Catch null/undefined errors

## Conclusion

These TypeScript patterns will help you write safer, more maintainable code. Practice them regularly and they'll become second nature!`,
        author: 'Md Shahjalal',
        date: '2024-11-12',
        readTime: '15 min read',
        tags: JSON.stringify(['TypeScript', 'JavaScript', 'Programming', 'Best Practices']),
        coverImage: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800',
        published: true,
    },
    {
        slug: 'building-restful-apis-nodejs',
        title: 'Building RESTful APIs with Node.js and Express',
        excerpt: 'A comprehensive guide to building production-ready REST APIs using Node.js, Express, and modern best practices.',
        content: `# Building RESTful APIs with Node.js and Express

## Introduction

REST APIs are the backbone of modern web applications. In this guide, we'll build a production-ready API using Node.js and Express.

## Project Setup

\`\`\`bash
mkdir my-api
cd my-api
npm init -y
npm install express typescript @types/node @types/express
npm install -D ts-node nodemon
\`\`\`

## Basic Server

\`\`\`typescript
import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'OK' });
});

app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});
\`\`\`

## RESTful Routes

\`\`\`typescript
// GET all users
app.get('/api/users', async (req, res) => {
  const users = await db.query('SELECT * FROM users');
  res.json(users);
});

// GET single user
app.get('/api/users/:id', async (req, res) => {
  const { id } = req.params;
  const user = await db.query('SELECT * FROM users WHERE id = $1', [id]);
  
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  
  res.json(user);
});

// POST create user
app.post('/api/users', async (req, res) => {
  const { name, email } = req.body;
  
  const newUser = await db.query(
    'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
    [name, email]
  );
  
  res.status(201).json(newUser);
});

// PUT update user
app.put('/api/users/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  
  const updated = await db.query(
    'UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *',
    [name, email, id]
  );
  
  res.json(updated);
});

// DELETE user
app.delete('/api/users/:id', async (req, res) => {
  const { id } = req.params;
  await db.query('DELETE FROM users WHERE id = $1', [id]);
  res.status(204).send();
});
\`\`\`

## Middleware

### Authentication

\`\`\`typescript
import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};
\`\`\`

### Error Handling

\`\`\`typescript
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});
\`\`\`

## Validation

\`\`\`typescript
import { z } from 'zod';

const userSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
});

app.post('/api/users', async (req, res) => {
  try {
    const validated = userSchema.parse(req.body);
    // Save to database
    res.status(201).json(validated);
  } catch (error) {
    res.status(400).json({ error: error.errors });
  }
});
\`\`\`

## Rate Limiting

\`\`\`typescript
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

app.use('/api/', limiter);
\`\`\`

## Best Practices

1. **Use environment variables** for configuration
2. **Validate all inputs** before processing
3. **Use proper HTTP status codes**
4. **Implement rate limiting**
5. **Add comprehensive logging**
6. **Use CORS properly**
7. **Secure with HTTPS**
8. **Version your API** (/api/v1/)

## Conclusion

Building REST APIs with Node.js and Express is straightforward when you follow best practices. This foundation will help you create scalable, maintainable APIs!`,
        author: 'Md Shahjalal',
        date: '2024-11-08',
        readTime: '11 min read',
        tags: JSON.stringify(['Node.js', 'Express', 'REST API', 'Backend']),
        coverImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800',
        published: true,
    },
];

async function seed() {
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });

    try {
        console.log('🌱 Seeding database...\n');

        // Insert blog series
        console.log('📚 Creating blog series...');
        const seriesIds: { [key: string]: number } = {};

        for (const series of blogSeries) {
            const result = await pool.query(
                `INSERT INTO blog_series (slug, title, description, cover_image, published, created_at, updated_at)
         VALUES ($1, $2, $3, $4, $5, NOW(), NOW())
         RETURNING id`,
                [series.slug, series.title, series.description, series.coverImage, series.published]
            );
            seriesIds[series.slug] = result.rows[0].id;
            console.log(`  ✓ Created series: ${series.title}`);
        }

        // Insert blog posts
        console.log('\n📝 Creating blog posts...');
        for (const post of blogPosts) {
            const seriesId = post.seriesOrder ? seriesIds['next-js-mastery'] : null;

            await pool.query(
                `INSERT INTO blog_posts (slug, title, excerpt, content, author, date, read_time, tags, cover_image, published, series_id, series_order, created_at, updated_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, NOW(), NOW())`,
                [
                    post.slug,
                    post.title,
                    post.excerpt,
                    post.content,
                    post.author,
                    post.date,
                    post.readTime,
                    post.tags,
                    post.coverImage,
                    post.published,
                    seriesId,
                    post.seriesOrder || null,
                ]
            );
            console.log(`  ✓ Created post: ${post.title}`);
        }

        console.log('\n✅ Database seeded successfully!');
        console.log(`\n📊 Summary:`);
        console.log(`  - ${blogSeries.length} blog series created`);
        console.log(`  - ${blogPosts.length} blog posts created`);

    } catch (error) {
        console.error('❌ Error seeding database:', error);
        throw error;
    } finally {
        await pool.end();
    }
}

seed().catch((err) => {
    console.error(err);
    process.exit(1);
});
