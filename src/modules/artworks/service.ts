import db from '../../db/client';
import { asc, eq, sql, and } from 'drizzle-orm';
import { artworks } from '../../db/schema';
import { Artwork } from './types';
import { ArtistQueryParams } from '../artists/querySchema';
import { getArtworkConditions } from '../shared/utils/checkFilters';

export const getFilteredArtworks = async (
  filters: ArtistQueryParams
): Promise<Artwork[]> => {
  const conditions = getArtworkConditions(filters);

  const q = db
    .select()
    .from(artworks)
    .where(conditions.length ? and(...conditions) : undefined)
    .orderBy(asc(artworks.id));

  // paginate query when specified
  if (filters.page !== undefined && filters.limit !== undefined) {
    const offset = (filters.page - 1) * filters.limit;
    q.limit(filters.limit).offset(offset);
  }

  const result = await q;

  console.log('Fetched artworks:', result);
  return result;
};

export const getRandomArtwork = async (
  filters: ArtistQueryParams
): Promise<Artwork> => {
  const conditions = getArtworkConditions(filters);

  const result = await db
    .select()
    .from(artworks)
    .orderBy(sql`RANDOM()`)
    .limit(1);
  console.log('Fetched random artwork:', result[0]);

  return result[0];
};

export const getArtworkById = async (id: number): Promise<Artwork> => {
  const result = await db
    .select()
    .from(artworks)
    .where(eq(artworks.id, id))
    .limit(1);
  console.log('Fetched artwork:', result[0]);

  return result[0];
};

export const getArtworksByArtistId = async (
  artistId: number
): Promise<Artwork[]> => {
  const result = await db
    .select()
    .from(artworks)
    .where(eq(artworks.artistId, artistId));
  console.log('Fetched artworks:', result);

  return result;
};
