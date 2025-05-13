import { defineConfig } from 'drizzle-kit';
import {
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT,
  DB_NAME,
} from './src/config/env';

export default defineConfig({
  out: './drizzle',
  schema: './src/db/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    user: DB_USER!,
    password: DB_PASSWORD!,
    host: DB_HOST!,
    port: Number(DB_PORT)!,
    database: DB_NAME!,
    ssl: false,
  },
});
