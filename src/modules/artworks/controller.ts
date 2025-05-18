import { Request, Response } from 'express';
import {
  getArtworkById,
  getFilteredArtworks,
  getRandomArtwork,
} from './service';
import { parseQuery } from '../../utils/parseQuery';
import { artworkQuerySchema } from './querySchema';
import { failure, success } from '../../utils/buildResponse';

export const getArtworksHandler = async (req: Request, res: Response) => {
  // parse query params
  const q = parseQuery(artworkQuerySchema, req, res);
  if (!q) return;

  try {
    const artworks = await getFilteredArtworks(q);

    return success(res, artworks, 'Successfully fetched artworks.');
  } catch (error) {
    console.log('Error getting artworks:', error);
    return failure(res, 'Internal error fetching artworks.');
  }
};

export const getRandomArtworkHandler = async (req: Request, res: Response) => {
  // parse query params
  const q = parseQuery(artworkQuerySchema, req, res);
  if (!q) return;

  try {
    const artwork = await getRandomArtwork(q);

    return success(res, artwork, 'Successfully fetched random artwork.');
  } catch (error) {
    console.log('Error getting random artwork:', error);
    return failure(res, 'Internal error fetching random artwork.');
  }
};

export const getArtworkByIdHandler = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  // get id param and verify that it's a number
  const parsedId = Number(req.params.id);
  if (Number.isNaN(parsedId)) {
    return failure(res, 'Invalid artwork ID.', 400);
  }

  try {
    const artwork = await getArtworkById(parsedId);

    if (!artwork) {
      return failure(res, 'Artwork not found.', 404);
    }

    return success(res, artwork, 'Successfully fetched artwork.');
  } catch (error) {
    console.log(`Error getting artwork with id ${parsedId}:`, error);
    return failure(res, 'Error getting artwork by id.');
  }
};
