import { InferSelectModel } from 'drizzle-orm';
import { artists } from '../../db/schema';

export type Artist = InferSelectModel<typeof artists>;
