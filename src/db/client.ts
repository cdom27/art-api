import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import { DB_URL } from '../config/env';
import { schema } from './schema';
import dotenv from 'dotenv';

// determine which env file to load
if (process.env.NODE_ENV === 'test') {
  dotenv.config({ path: '.test.env' });
} else {
  dotenv.config();
}

const pool = new Pool({
  connectionString: DB_URL,
});

(async () => {
  try {
    const client = await pool.connect();
    console.log('Successfully connected to the database');
    client.release();
  } catch (err) {
    console.error('Failed to connect to the database:', err);
  }
})();

const db = drizzle(pool, { schema });

export default db;
