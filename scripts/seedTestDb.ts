import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { artists, artworks } from '../src/db/schema';
import { testArtists, testArtworks } from './testData';

const pool = new Pool({
  connectionString: process.env.TEST_DB_URL,
});

const db = drizzle(pool);

const seedTestDb = async () => {
  console.log('Seeding test DB...');

  // create schema if it doesn't exist
  try {
    console.log('Ensuring database tables exist...');

    // create tables if they don't exist
    await pool.query(`
      CREATE TABLE IF NOT EXISTS artists (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        genre TEXT NOT NULL,
        nationality TEXT NOT NULL,
        bio TEXT NOT NULL,
        wikipedia TEXT NOT NULL,
        birth_year INTEGER NOT NULL,
        death_year INTEGER NOT NULL
      );

      CREATE TABLE IF NOT EXISTS artworks (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        medium TEXT NOT NULL,
        inferred_year TEXT NOT NULL,
        artist_id INTEGER REFERENCES artists(id)
      );

      CREATE TABLE IF NOT EXISTS api_keys (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        domain TEXT NOT NULL,
        secret TEXT NOT NULL,
        request_count INTEGER NOT NULL DEFAULT 0,
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMP NOT NULL DEFAULT NOW()
      );
    `);

    console.log('Tables created or already exist.');
  } catch (error) {
    console.error('Error creating schema:', error);
    throw error;
  }

  // clear existing data
  try {
    await db.delete(artworks);
    await db.delete(artists);
  } catch (error) {
    console.error('Warning: Could not delete existing data:', error);
    // continue anyway
  }

  // insert test data
  await db.insert(artists).values(testArtists);
  await db.insert(artworks).values(testArtworks);

  console.log('Test DB seeded');
  await pool.end();
  process.exit(0);
};

seedTestDb().catch((err) => {
  console.error('Seeding failed:', err);
  process.exit(1);
});
