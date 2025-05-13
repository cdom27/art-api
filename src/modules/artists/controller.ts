import { Request, Response } from 'express';
import { getAllArtists, getArtistById, getRandomArtist } from './service';

export const getArtistsHandler = async (req: Request, res: Response) => {
  try {
    const artists = await getAllArtists();

    res.status(200).json({ data: artists });
  } catch (error) {
    console.log('Error getting artists:', error);
    res.status(500).json({ error: `Internal error getting artist.` });
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
    res.status(500).json({ error: `Internal error getting random artist.` });
    return;
  }
};
