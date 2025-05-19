import { z } from 'zod';
import { paginationSchema } from '../shared/querySchema';
import { artistFilterSchema } from '../artists/querySchema';
import { artworkFilterSchema } from '../artworks/querySchema';

const allowedTypes = ['artists', 'artworks'] as const;

export const searchQuerySchema = paginationSchema
  .merge(artistFilterSchema)
  .merge(artworkFilterSchema)
  .extend({
    q: z.string().min(1).optional(),
    types: z
      .string()
      .optional()
      .refine(
        (val) =>
          !val ||
          val.split(',').every((type) => allowedTypes.includes(type as any)),
        {
          message: `types must be a comma-separated list of 'artists' and/or 'artworks'`,
        }
      ),
  });

export type SearchQueryParams = z.output<typeof searchQuerySchema>;
