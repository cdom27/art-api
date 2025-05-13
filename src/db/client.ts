import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } from '../config/env';

const pool = new Pool({
  user: DB_USER,
  password: DB_PASSWORD,
  host: DB_HOST,
  port: Number(DB_PORT),
  database: DB_NAME,
});

pool.on('connect', () => console.log('Database connection successful'));

const db = drizzle({ client: pool });

export default db;
