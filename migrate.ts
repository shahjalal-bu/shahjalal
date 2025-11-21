import { drizzle } from 'drizzle-orm/neon-serverless';
import { Pool } from '@neondatabase/serverless';
import { migrate } from 'drizzle-orm/neon-serverless/migrator';
import * as schema from './src/db/schema';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

async function main() {
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    const db = drizzle(pool, { schema });

    console.log('Creating tables...');

    // Create blog_series table
    await pool.query(`
    CREATE TABLE IF NOT EXISTS blog_series (
      id SERIAL PRIMARY KEY,
      slug TEXT NOT NULL UNIQUE,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      cover_image TEXT,
      published BOOLEAN DEFAULT true NOT NULL,
      created_at TIMESTAMP DEFAULT now() NOT NULL,
      updated_at TIMESTAMP DEFAULT now() NOT NULL
    )
  `);

    // Create blog_posts table
    await pool.query(`
    CREATE TABLE IF NOT EXISTS blog_posts (
      id SERIAL PRIMARY KEY,
      slug TEXT NOT NULL UNIQUE,
      title TEXT NOT NULL,
      excerpt TEXT NOT NULL,
      content TEXT NOT NULL,
      author TEXT NOT NULL,
      date TEXT NOT NULL,
      read_time TEXT NOT NULL,
      tags TEXT NOT NULL,
      cover_image TEXT,
      published BOOLEAN DEFAULT true NOT NULL,
      series_id INTEGER REFERENCES blog_series(id),
      series_order INTEGER,
      created_at TIMESTAMP DEFAULT now() NOT NULL,
      updated_at TIMESTAMP DEFAULT now() NOT NULL
    )
  `);

    console.log('✅ Tables created successfully!');

    await pool.end();
}

main().catch((err) => {
    console.error('Error:', err);
    process.exit(1);
});
