import { Request, Response, NextFunction } from 'express';
import { getAllArtists } from './service';

export const getArtistsHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const artists = await getAllArtists();
    res.status(200).json({ data: artists });
  } catch (error) {
    console.log('Error getting artists:', error);
    next(error);
  }
};
