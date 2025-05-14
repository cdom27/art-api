import { ilike, eq } from 'drizzle-orm';
import { artworks } from '../../db/schema';
import { ArtworkQueryParams } from './querySchema';

export const checkFilters = (filters: ArtworkQueryParams) => {
  const conditions = [];

  if (filters.title)
    conditions.push(ilike(artworks.title, `%${filters.title}%`));
  if (filters.medium) conditions.push(eq(artworks.medium, filters.medium));
  if (filters.artistId)
    conditions.push(eq(artworks.artistId, filters.artistId));

  return conditions;
};
