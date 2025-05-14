import { Request, Response } from 'express';
import { getArtistById, getFilteredArtists, getRandomArtist } from './service';
import { getArtworksByArtistId } from '../artworks/service';
import { parseQuery } from '../../utils/parseQuery';
import { artistQuerySchema } from './querySchema';

export const getArtistsHandler = async (req: Request, res: Response) => {
  // parse query params
  const q = parseQuery(artistQuerySchema, req, res);
  if (!q) return;

  try {
    const artists = await getFilteredArtists(q);

    res.status(200).json({ data: artists });
  } catch (error) {
    console.log('Error getting artists:', error);
    res.status(500).json({ error: 'Internal error getting artists.' });
    return;
  }
};

export const getArtistByIdHandler = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  // get id param and verify that it's a number
  const parsedId = Number(req.params.id);
  if (Number.isNaN(parsedId)) {
    res.status(400).json({ error: 'Invalid artist ID.' });
    return;
  }

  try {
    const artist = await getArtistById(parsedId);

    if (!artist) {
      res
        .status(404)
        .json({ error: `Artist with id ${parsedId} was not found.` });
      return;
    }

    res.status(200).json({ data: artist });
  } catch (error) {
    console.log(`Error getting artist with id ${parsedId}:`, error);
    res
      .status(500)
      .json({ error: `Internal error getting artist with id ${parsedId}.` });
    return;
  }
};

export const getRandomArtistHandler = async (req: Request, res: Response) => {
  try {
    const artist = await getRandomArtist();

    res.status(200).json({ data: artist });
  } catch (error) {
    console.log('Error getting random artist:', error);
    res.status(500).json({ error: 'Internal error getting random artist.' });
    return;
  }
};

export const getFullArtistInfoHandler = async (req: Request, res: Response) => {
  // get id param and verify that it's a number
  const parsedId = Number(req.params.id);
  if (Number.isNaN(parsedId)) {
    res.status(400).json({ error: 'Invalid artist ID.' });
    return;
  }

  try {
    // get and verify both artist and artwork info
    const artist = await getArtistById(parsedId);

    if (!artist) {
      res
        .status(404)
        .json({ error: `Artist with id ${parsedId} was not found.` });
      return;
    }

    const artworks = await getArtworksByArtistId(parsedId);

    if (!artworks) {
      res
        .status(404)
        .json({ error: `Artwork for artist ${parsedId} was not found.` });
      return;
    }

    // compose full artist info object
    const fullArtistInfo = { ...artist, artworks };

    res.status(200).json({ data: fullArtistInfo });
  } catch (error) {
    console.log('Error getting full artist info:', error);
    res.status(500).json({
      error: `Internal error getting full info for artist with id ${parsedId}`,
    });
  }
};
