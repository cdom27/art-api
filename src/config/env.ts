import dotenv from 'dotenv';

dotenv.config();

// for CI/CD environments, we use TEST_DB_URL for NODE_ENV=test
// for local development, we use DB_URL
const dbUrl =
  process.env.NODE_ENV === 'test'
    ? process.env.TEST_DB_URL || process.env.DB_URL
    : process.env.DB_URL;

export const DB_URL = dbUrl;
export const { PORT } = process.env;

if (!DB_URL) {
  throw new Error(
    'Database env vars are not fully defined (missing DB_URL or TEST_DB_URL)',
  );
}
