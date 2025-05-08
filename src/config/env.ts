import dotenv from 'dotenv';

dotenv.config();

export const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME, PORT } =
  process.env;

if (!DB_USER || !DB_PASSWORD || !DB_HOST || !DB_PORT || !DB_NAME)
  throw new Error('Database env vars are not fully defined');
// if (!PORT) throw new Error('PORT is not defined');
