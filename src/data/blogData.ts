export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  tags: string[];
  coverImage?: string;
  published: boolean;
}

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "getting-started-with-nextjs",
    title: "Getting Started with Next.js 13: A Comprehensive Guide",
    excerpt: "Learn how to build modern web applications with Next.js 13, including the new app directory, server components, and more.",
    author: "Md Shahjalal",
    date: "2025-11-15",
    readTime: "8 min read",
    tags: ["Next.js", "React", "Web Development"],
    published: true,
    content: `# Getting Started with Next.js 13

Next.js 13 introduces revolutionary features that change how we build React applications. In this guide, we'll explore the key features and best practices.

## What's New in Next.js 13?

Next.js 13 brings several groundbreaking features:

- **App Directory**: A new way to structure your application
- **Server Components**: Render components on the server by default
- **Streaming**: Improved loading states and performance
- **Turbopack**: The new Rust-based bundler (beta)

## The App Directory

The app directory is a new paradigm for building Next.js applications. Here's a simple example:

\`\`\`typescript
// app/page.tsx
export default function Home() {
  return (
    <main>
      <h1>Welcome to Next.js 13</h1>
    </main>
  );
}
\`\`\`

### Key Benefits

1. **Layouts**: Share UI between routes
2. **Loading States**: Built-in loading UI
3. **Error Handling**: Automatic error boundaries
4. **Nested Routes**: Intuitive file-based routing

## Server Components

Server Components are rendered on the server, reducing the JavaScript bundle size:

\`\`\`tsx
// This is a Server Component by default
async function BlogPost({ id }: { id: string }) {
  const post = await fetchPost(id);
  
  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </article>
  );
}
\`\`\`

## Data Fetching

Next.js 13 simplifies data fetching with async/await:

\`\`\`typescript
async function getData() {
  const res = await fetch('https://api.example.com/data', {
    cache: 'no-store' // Always fetch fresh data
  });
  
  return res.json();
}
\`\`\`

## Conclusion

Next.js 13 represents a major leap forward in React development. The app directory and Server Components make it easier to build fast, modern web applications.

**Happy coding!** 🚀
`
  },
  {
    id: "2",
    slug: "mastering-typescript",
    title: "Mastering TypeScript: Advanced Types and Patterns",
    excerpt: "Deep dive into TypeScript's advanced type system, including generics, conditional types, and utility types.",
    author: "Md Shahjalal",
    date: "2025-11-10",
    readTime: "12 min read",
    tags: ["TypeScript", "JavaScript", "Programming"],
    published: true,
    content: `# Mastering TypeScript: Advanced Types and Patterns

TypeScript's type system is incredibly powerful. Let's explore some advanced patterns that will level up your TypeScript skills.

## Generics

Generics allow you to write reusable, type-safe code:

\`\`\`typescript
function identity<T>(arg: T): T {
  return arg;
}

// Usage
const result = identity<string>("Hello");
const number = identity<number>(42);
\`\`\`

### Generic Constraints

You can constrain generics to specific types:

\`\`\`typescript
interface Lengthwise {
  length: number;
}

function logLength<T extends Lengthwise>(arg: T): T {
  console.log(arg.length);
  return arg;
}

logLength("Hello"); // ✅ Works
logLength([1, 2, 3]); // ✅ Works
logLength(42); // ❌ Error: number doesn't have length
\`\`\`

## Conditional Types

Conditional types enable type-level logic:

\`\`\`typescript
type IsString<T> = T extends string ? true : false;

type A = IsString<string>; // true
type B = IsString<number>; // false
\`\`\`

### Practical Example

\`\`\`typescript
type Flatten<T> = T extends Array<infer U> ? U : T;

type Str = Flatten<string[]>; // string
type Num = Flatten<number>; // number
\`\`\`

## Utility Types

TypeScript provides built-in utility types:

### Partial<T>

Makes all properties optional:

\`\`\`typescript
interface User {
  name: string;
  email: string;
  age: number;
}

type PartialUser = Partial<User>;
// { name?: string; email?: string; age?: number; }
\`\`\`

### Pick<T, K>

Select specific properties:

\`\`\`typescript
type UserPreview = Pick<User, 'name' | 'email'>;
// { name: string; email: string; }
\`\`\`

### Omit<T, K>

Exclude specific properties:

\`\`\`typescript
type UserWithoutAge = Omit<User, 'age'>;
// { name: string; email: string; }
\`\`\`

## Mapped Types

Create new types by transforming existing ones:

\`\`\`typescript
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

type ReadonlyUser = Readonly<User>;
\`\`\`

## Template Literal Types

Combine string literals at the type level:

\`\`\`typescript
type Color = "red" | "blue" | "green";
type Quantity = "one" | "two";

type ColorfulQuantity = \`\${Quantity}-\${Color}\`;
// "one-red" | "one-blue" | "one-green" | "two-red" | "two-blue" | "two-green"
\`\`\`

## Best Practices

1. **Use strict mode**: Enable \`strict: true\` in tsconfig.json
2. **Avoid \`any\`**: Use \`unknown\` when type is truly unknown
3. **Leverage inference**: Let TypeScript infer types when possible
4. **Use const assertions**: For literal types

\`\`\`typescript
const config = {
  endpoint: "https://api.example.com",
  timeout: 5000
} as const;
\`\`\`

## Conclusion

TypeScript's advanced type system enables you to catch bugs at compile time and write more maintainable code. Master these patterns to become a TypeScript expert!
`
  },
  {
    id: "3",
    slug: "react-performance-optimization",
    title: "React Performance Optimization: Tips and Tricks",
    excerpt: "Learn practical techniques to optimize your React applications for better performance and user experience.",
    author: "Md Shahjalal",
    date: "2025-11-05",
    readTime: "10 min read",
    tags: ["React", "Performance", "Optimization"],
    published: true,
    content: `# React Performance Optimization: Tips and Tricks

Performance is crucial for user experience. Let's explore proven techniques to make your React apps blazing fast! ⚡

## 1. Use React.memo

Prevent unnecessary re-renders with \`React.memo\`:

\`\`\`tsx
const ExpensiveComponent = React.memo(({ data }) => {
  // This component only re-renders when 'data' changes
  return <div>{data}</div>;
});
\`\`\`

### When to Use

- Components that render often
- Components with expensive render logic
- Pure components (same props = same output)

## 2. useMemo Hook

Cache expensive calculations:

\`\`\`tsx
function DataTable({ items }) {
  const sortedItems = useMemo(() => {
    return items.sort((a, b) => a.value - b.value);
  }, [items]);
  
  return <Table data={sortedItems} />;
}
\`\`\`

## 3. useCallback Hook

Memoize callback functions:

\`\`\`tsx
function Parent() {
  const [count, setCount] = useState(0);
  
  const handleClick = useCallback(() => {
    console.log('Clicked!');
  }, []); // Only created once
  
  return <Child onClick={handleClick} />;
}
\`\`\`

## 4. Code Splitting

Split your code into smaller chunks:

\`\`\`tsx
import { lazy, Suspense } from 'react';

const HeavyComponent = lazy(() => import('./HeavyComponent'));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <HeavyComponent />
    </Suspense>
  );
}
\`\`\`

## 5. Virtual Lists

Render only visible items in long lists:

\`\`\`tsx
import { FixedSizeList } from 'react-window';

function VirtualList({ items }) {
  return (
    <FixedSizeList
      height={600}
      itemCount={items.length}
      itemSize={50}
      width="100%"
    >
      {({ index, style }) => (
        <div style={style}>{items[index]}</div>
      )}
    </FixedSizeList>
  );
}
\`\`\`

## 6. Debounce Input

Reduce unnecessary updates:

\`\`\`tsx
import { useState, useEffect } from 'react';

function SearchInput() {
  const [value, setValue] = useState('');
  const [debouncedValue, setDebouncedValue] = useState('');
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [value]);
  
  return <input value={value} onChange={(e) => setValue(e.target.value)} />;
}
\`\`\`

## 7. Image Optimization

Use Next.js Image component:

\`\`\`tsx
import Image from 'next/image';

function Avatar() {
  return (
    <Image
      src="/avatar.jpg"
      width={200}
      height={200}
      alt="Avatar"
      loading="lazy"
    />
  );
}
\`\`\`

## Performance Checklist

- [ ] Profile with React DevTools
- [ ] Minimize bundle size
- [ ] Lazy load components
- [ ] Optimize images
- [ ] Use production build
- [ ] Enable compression (gzip/brotli)
- [ ] Implement caching strategies
- [ ] Monitor Core Web Vitals

## Measuring Performance

Use the Profiler API:

\`\`\`tsx
import { Profiler } from 'react';

function onRenderCallback(
  id, phase, actualDuration, baseDuration, startTime, commitTime
) {
  console.log(\`\${id} took \${actualDuration}ms\`);
}

<Profiler id="App" onRender={onRenderCallback}>
  <App />
</Profiler>
\`\`\`

## Conclusion

Performance optimization is an ongoing process. Start with measuring, identify bottlenecks, and apply these techniques strategically. Remember: **premature optimization is the root of all evil** - optimize what matters!

Happy optimizing! 🚀
`
  }
];

// Utility functions
export function getAllPosts(): BlogPost[] {
  return blogPosts.filter(post => post.published).sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find(post => post.slug === slug && post.published);
}

export function getPostsByTag(tag: string): BlogPost[] {
  return blogPosts.filter(post => 
    post.published && post.tags.includes(tag)
  ).sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getAllTags(): string[] {
  const tags = new Set<string>();
  blogPosts.forEach(post => {
    if (post.published) {
      post.tags.forEach(tag => tags.add(tag));
    }
  });
  return Array.from(tags).sort();
}

export function searchPosts(query: string): BlogPost[] {
  const lowerQuery = query.toLowerCase();
  return blogPosts.filter(post => 
    post.published && (
      post.title.toLowerCase().includes(lowerQuery) ||
      post.excerpt.toLowerCase().includes(lowerQuery) ||
      post.content.toLowerCase().includes(lowerQuery) ||
      post.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
    )
  ).sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}
