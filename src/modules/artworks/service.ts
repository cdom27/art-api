import db from '../../db/client';
import { asc, eq, sql, and } from 'drizzle-orm';
import { artworks } from '../../db/schema';
import { Artwork, ArtworkWithSignedImageUrls } from './types';
import { ArtworkQueryParams } from './querySchema';
import { getArtworkConditions } from '../shared/utils/checkFilters';
import { enrichArtwork, enrichArtworks } from '../shared/utils/enrichArtwork';

export const getFilteredArtworks = async (
  filters: ArtworkQueryParams
): Promise<Artwork[]> => {
  const conditions = getArtworkConditions(filters);

  const q = db.select().from(artworks);

  if (conditions.length) {
    q.where(and(...conditions));
  }

  // paginate query when specified
  if (filters.page !== undefined && filters.limit !== undefined) {
    const offset = (filters.page - 1) * filters.limit;
    q.limit(filters.limit).offset(offset);
  }

  const result = await q.orderBy(asc(artworks.title));

  console.log('Fetched artworks:', result);
  return await enrichArtworks(result);
};

export const getRandomArtwork = async (
  filters: ArtworkQueryParams
): Promise<ArtworkWithSignedImageUrls> => {
  const conditions = getArtworkConditions(filters);

  const q = db.select().from(artworks);

  if (conditions.length) {
    q.where(and(...conditions));
  }

  const result = await q.orderBy(sql`RANDOM()`).limit(1);

  console.log('Fetched random artwork:', result[0]);

  return await enrichArtwork(result[0]);
};

export const getArtworkById = async (id: number): Promise<Artwork> => {
  const result = await db
    .select()
    .from(artworks)
    .where(eq(artworks.id, id))
    .limit(1);
  console.log('Fetched artwork:', result[0]);

  return await enrichArtwork(result[0]);
};

export const getArtworksByArtistId = async (
  artistId: number
): Promise<Artwork[]> => {
  const result = await db
    .select()
    .from(artworks)
    .where(eq(artworks.artistId, artistId));
  console.log('Fetched artworks:', result);

  return await enrichArtworks(result);
};
