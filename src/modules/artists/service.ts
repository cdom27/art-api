import db from '../../db/client';
import { asc } from 'drizzle-orm';
import { artists } from '../../db/schema';
import { Artist } from './types';

export const getAllArtists = async (): Promise<Artist[]> => {
  const result = await db.select().from(artists).orderBy(asc(artists.id));
  console.log('Fetched artists:', result);

  return result;
};
