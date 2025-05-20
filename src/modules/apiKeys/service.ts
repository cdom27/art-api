import { eq } from 'drizzle-orm';
import db from '../../db/client';
import { apiKeys } from '../../db/schema';

export const storeSecret = async (domain: string, secret: string) => {
  const result = await db
    .insert(apiKeys)
    .values({
      domain,
      secret,
    })
    .returning({ id: apiKeys.id });

  return result;
};

export const getKeyRecords = async () => {
  const result = await db.select().from(apiKeys);

  return result;
};

export const updateKeyRequestCount = async (id: string, amount: number) => {
  await db
    .update(apiKeys)
    .set({ requestCount: amount, updatedAt: new Date() })
    .where(eq(apiKeys.id, id));
};
