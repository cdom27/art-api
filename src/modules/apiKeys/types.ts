import { InferSelectModel } from 'drizzle-orm';
import { apiKeys } from '../../db/schema';

export type ApiKey = InferSelectModel<typeof apiKeys>;

export type KeyPair = { pubKey: string; secret: string };
