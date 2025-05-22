import dotenv from 'dotenv';

dotenv.config();

export const { DB_URL, PORT } = process.env;

if (!DB_URL) {
  throw new Error(
    'Database env vars are not fully defined (missing DB_URL or individual credentials)'
  );
}
