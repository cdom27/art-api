import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import { DB_URL } from '../config/env';
import { schema } from './schema';

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
