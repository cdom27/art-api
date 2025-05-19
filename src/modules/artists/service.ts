import db from '../../db/client';
import { asc, eq, sql, and } from 'drizzle-orm';
import { artists } from '../../db/schema';
import { Artist } from './types';
import { ArtistQueryParams } from './querySchema';
import { getArtistConditions } from '../shared/utils/checkFilters';

export const getFilteredArtists = async (
  filters: ArtistQueryParams
): Promise<Artist[]> => {
  const conditions = getArtistConditions(filters);

  const q = db
    .select()
    .from(artists)
    .where(conditions.length ? and(...conditions) : undefined)
    .orderBy(asc(artists.id));

  // paginate query when specified
  if (filters.page !== undefined && filters.limit !== undefined) {
    const offset = (filters.page - 1) * filters.limit;
    q.limit(filters.limit).offset(offset);
  }

  const result = await q;

  console.log('Filtered artists:', result);
  return result;
};

export const getRandomArtist = async (
  filters: ArtistQueryParams
): Promise<Artist> => {
  const conditions = getArtistConditions(filters);

  const result = await db
    .select()
    .from(artists)
    .where(conditions.length ? and(...conditions) : undefined)
    .orderBy(sql`RANDOM()`)
    .limit(1);

  console.log('Fetched random artist:', result[0]);
  return result[0];
};

export const getArtistById = async (id: number): Promise<Artist> => {
  const result = await db
    .select()
    .from(artists)
    .where(eq(artists.id, id))
    .limit(1);
  console.log('Fetched artist:', result[0]);

  return result[0];
};
