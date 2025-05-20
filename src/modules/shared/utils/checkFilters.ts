import { eq, gte, lte } from 'drizzle-orm';
import { artists, artworks } from '../../../db/schema';
import { ArtistQueryParams } from '../../artists/querySchema';
import { ArtworkQueryParams } from '../../artworks/querySchema';
import { buildSearchConditions } from './buildSearchConditions';

export const getArtistConditions = (filters: ArtistQueryParams) => {
  const conditions = [];

  if (filters.name)
    conditions.push(buildSearchConditions([artists.name], filters.name));

  if (filters.genre)
    conditions.push(buildSearchConditions([artists.genre], filters.genre));

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

export const getArtworkConditions = (filters: ArtworkQueryParams) => {
  const conditions = [];

  if (filters.title)
    conditions.push(buildSearchConditions([artworks.title], filters.title));

  if (filters.medium)
    conditions.push(buildSearchConditions([artworks.medium], filters.medium));

  if (filters.artistId)
    conditions.push(eq(artworks.artistId, filters.artistId));

  return conditions;
};
