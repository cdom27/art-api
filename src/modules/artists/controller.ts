import { Request, Response } from 'express';
import { getArtistById, getFilteredArtists, getRandomArtist } from './service';
import { getArtworksByArtistId } from '../artworks/service';
import { parseQuery } from '../../utils/parseQuery';
import { artistQuerySchema } from './querySchema';
import { failure, success } from '../../utils/buildResponse';

export const getArtistsHandler = async (req: Request, res: Response) => {
  // parse query params
  const q = parseQuery(artistQuerySchema, req, res);
  if (!q) return;

  try {
    const artists = await getFilteredArtists(q);

    return success(res, artists, 'Successfully fetched artists.');
  } catch (error) {
    console.log('Error fetching artists:', error);
    return failure(res, 'Internal error fetching artists.');
  }
};

export const getRandomArtistHandler = async (req: Request, res: Response) => {
  // parse query params
  const q = parseQuery(artistQuerySchema, req, res);
  if (!q) return;

  try {
    const artist = await getRandomArtist(q);

    return success(res, artist, 'Successfully fetched random artist.');
  } catch (error) {
    console.log('Error fetching random artist:', error);
    return failure(res, 'Internal error fetching random artist.');
  }
};

export const getFullArtistInfoHandler = async (req: Request, res: Response) => {
  // get id param and verify that it's a number
  const parsedId = Number(req.params.id);

  if (Number.isNaN(parsedId)) {
    return failure(res, 'Invalid artist ID', 400);
  }

  try {
    // get and verify both artist and artwork info
    const artist = await getArtistById(parsedId);

    if (!artist) {
      return failure(res, 'Artist not found.', 404);
    }

    const artworks = await getArtworksByArtistId(parsedId);

    if (!artworks) {
      return failure(res, 'Artworks for artist not found.', 404);
    }

    // compose full artist info object
    const fullArtistInfo = { ...artist, artworks };

    return success(
      res,
      fullArtistInfo,
      'Successfully fetching full artist info'
    );
  } catch (error) {
    console.log('Error getting full artist info:', error);
    return failure(res, 'Internal error fetching full artist info.');
  }
};

export const getArtistByIdHandler = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  // get id param and verify that it's a number
  const parsedId = Number(req.params.id);
  if (Number.isNaN(parsedId)) {
    return failure(res, 'Invalid artist ID.', 400);
  }

  try {
    const artist = await getArtistById(parsedId);

    if (!artist) {
      return failure(res, 'Artist not found.', 404);
    }

    return success(res, artist, 'Successfully fetched artist.');
  } catch (error) {
    console.log(`Error getting artist with id ${parsedId}:`, error);
    return failure(res, 'Error getting artist by id.');
  }
};
