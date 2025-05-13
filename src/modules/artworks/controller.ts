import { Request, Response } from 'express';
import { getAllArtworks, getArtworkById, getRandomArtwork } from './service';

export const getArtworksHandler = async (req: Request, res: Response) => {
  try {
    const artworks = await getAllArtworks();

    res.status(200).json({ data: artworks });
  } catch (error) {
    console.log('Error getting artworks:', error);
    res.status(500).json({ error: `Internal error getting artworks.` });
    return;
  }
};

export const getArtworkByIdHandler = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  // get id param and verify that it's a number
  const parsedId = Number(req.params.id);
  if (Number.isNaN(parsedId)) {
    res.status(400).json({ error: 'Invalid artwork ID.' });
    return;
  }

  try {
    const artwork = await getArtworkById(parsedId);

    if (!artwork) {
      res
        .status(404)
        .json({ error: `Artwork with id ${parsedId} was not found.` });
      return;
    }

    res.status(200).json({ data: artwork });
  } catch (error) {
    console.log(`Error getting artwork with id ${parsedId}:`, error);
    res
      .status(500)
      .json({ error: `Internal error getting artwork with id ${parsedId}.` });
    return;
  }
};

export const getRandomArtworkHandler = async (req: Request, res: Response) => {
  try {
    const artwork = await getRandomArtwork();

    res.status(200).json({ data: artwork });
  } catch (error) {
    console.log('Error getting random artwork:', error);
    res.status(500).json({ error: `Internal error getting random artwork.` });
    return;
  }
};
