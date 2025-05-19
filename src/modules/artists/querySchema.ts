import { z } from 'zod';
import { paginationSchema } from '../shared/querySchema';

export const artistFilterSchema = z.object({
  name: z.string().optional(),
  genre: z.string().optional(),
  nationality: z.string().optional(),
  birthYearMin: z.coerce.number().optional(),
  birthYearMax: z.coerce.number().optional(),
  deathYearMin: z.coerce.number().optional(),
  deathYearMax: z.coerce.number().optional(),
});

export const artistQuerySchema = paginationSchema.merge(artistFilterSchema);

export type ArtistQueryParams = z.output<typeof artistQuerySchema>;
