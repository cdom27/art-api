import db from '../../db/client';
import { asc, eq, sql, and, ilike, gte, lte } from 'drizzle-orm';
import { artists } from '../../db/schema';
import { Artist } from './types';
import { ArtistQueryParams } from './querySchema';

export const getFilteredArtists = async (
  filters: ArtistQueryParams
): Promise<Artist[]> => {
  const conditions = [];

  // check filters
  if (filters.name) conditions.push(ilike(artists.name, `%${filters.name}%`));
  if (filters.genre) conditions.push(eq(artists.genre, filters.genre));
  if (filters.nationality)
    conditions.push(eq(artists.nationality, filters.nationality));
  if (filters.birthYearMin)
    conditions.push(gte(artists.birthYear, filters.birthYearMin));
  if (filters.birthYearMax)
    conditions.push(lte(artists.birthYear, filters.birthYearMax));
  if (filters.deathYearMin)
    conditions.push(gte(artists.deathYear, filters.deathYearMin));
  if (filters.deathYearMax)
    conditions.push(lte(artists.deathYear, filters.deathYearMax));

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

export const getRandomArtist = async (): Promise<Artist> => {
  const result = await db
    .select()
    .from(artists)
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
