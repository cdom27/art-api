import db from '../../db/client';
import { asc, eq, sql } from 'drizzle-orm';
import { artworks } from '../../db/schema';
import { Artwork } from './types';

export const getAllArtworks = async (): Promise<Artwork[]> => {
  const result = await db.select().from(artworks).orderBy(asc(artworks.id));
  console.log('Fetched artworks:', result);

  return result;
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

export const getRandomArtwork = async (): Promise<Artwork> => {
  const result = await db
    .select()
    .from(artworks)
    .orderBy(sql`RANDOM()`)
    .limit(1);
  console.log('Fetched random artwork:', result[0]);

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

//TODO: searchArtwork
