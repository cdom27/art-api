import { InferSelectModel } from 'drizzle-orm';
import { artworks } from '../../db/schema';

export type Artwork = InferSelectModel<typeof artworks>;
