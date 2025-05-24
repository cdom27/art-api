import bcrypt from 'bcrypt';
import db from '../../src/db/client';
import { apiKeys } from '../../src/db/schema';

export const insertTestApiKey = async () => {
  const pubKey = 'test-key-123';
  const secret = await bcrypt.hash(pubKey, 10);

  await db.insert(apiKeys).values({
    domain: 'localhost',
    secret,
  });

  return pubKey;
};
