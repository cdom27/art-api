import { z } from 'zod';
import { paginationSchema } from '../shared/querySchema';

export const artworkFilterSchema = z.object({
  title: z.string().optional(),
  medium: z.string().optional(),
  artistId: z.coerce.number().optional(),
});

export const artworkQuerySchema = paginationSchema.merge(artworkFilterSchema);

export type ArtworkQueryParams = z.output<typeof artworkQuerySchema>;
