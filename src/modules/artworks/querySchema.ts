import { z } from 'zod';
import { paginationSchema } from '../shared/querySchema';

export const artworkQuerySchema = paginationSchema.extend({
  title: z.string().optional(),
  medium: z.string().optional(),
  artistId: z.coerce.number().optional(),
});

export type ArtworkQueryParams = z.output<typeof artworkQuerySchema>;
