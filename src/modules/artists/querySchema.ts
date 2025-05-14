import { z } from 'zod';
import { paginationSchema } from '../shared/querySchema';

export const artistQuerySchema = paginationSchema.extend({
  name: z.string().optional(),
  genre: z.string().optional(),
  nationality: z.string().optional(),
  birthYearMin: z.coerce.number().optional(),
  birthYearMax: z.coerce.number().optional(),
  deathYearMin: z.coerce.number().optional(),
  deathYearMax: z.coerce.number().optional(),
});

export type ArtistQueryParams = z.output<typeof artistQuerySchema>;
