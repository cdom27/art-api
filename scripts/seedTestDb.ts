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
  await db.delete(artworks);
  await db.delete(artists);

  await db.insert(artists).values(testArtists);
  await db.insert(artworks).values(testArtworks);

  console.log('✅ Test DB seeded.');
  process.exit(0);
};

seedTestDb().catch((err) => {
  console.error('❌ Seeding failed:', err);
  process.exit(1);
});
