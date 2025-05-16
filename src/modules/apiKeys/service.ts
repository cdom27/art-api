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
