import db from '../../db/client';
import { asc, eq, sql } from 'drizzle-orm';
import { artists } from '../../db/schema';
import { Artist } from './types';

export const getAllArtists = async (): Promise<Artist[]> => {
  const result = await db.select().from(artists).orderBy(asc(artists.id));
  console.log('Fetched artists:', result);

  return result;
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

export const getRandomArtist = async (): Promise<Artist> => {
  const result = await db
    .select()
    .from(artists)
    .orderBy(sql`RANDOM()`)
    .limit(1);
  console.log('Fetched random artist:', result[0]);

  return result[0];
};

// TODO: getAllArtistArtwork, getArtistAndArtwork, searchArtist
