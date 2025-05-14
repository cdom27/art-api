import db from '../../db/client';
import { asc, eq, sql, and } from 'drizzle-orm';
import { artists } from '../../db/schema';
import { Artist } from './types';
import { ArtistQueryParams } from './querySchema';
import { checkFilters } from './utils';

export const getFilteredArtists = async (
  filters: ArtistQueryParams
): Promise<Artist[]> => {
  const conditions = checkFilters(filters);

  const offset = (filters.page - 1) * filters.limit;

  const result = await db
    .select()
    .from(artists)
    .where(conditions.length ? and(...conditions) : undefined)
    .orderBy(asc(artists.id))
    .limit(filters.limit)
    .offset(offset);

  console.log('Filtered artists:', result);
  return result;
};

export const getRandomArtist = async (
  filters: ArtistQueryParams
): Promise<Artist> => {
  const conditions = checkFilters(filters);

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
