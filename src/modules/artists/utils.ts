import { ilike, eq, gte, lte } from 'drizzle-orm';
import { artists } from '../../db/schema';
import { ArtistQueryParams } from './querySchema';

export const checkFilters = (filters: ArtistQueryParams) => {
  const conditions = [];

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

  return conditions;
};
