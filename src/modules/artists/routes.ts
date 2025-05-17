import { Router } from 'express';
import {
  getArtistByIdHandler,
  getArtistsHandler,
  getFullArtistInfoHandler,
  getRandomArtistHandler,
} from './controller';

const router = Router();

// /api/v1/artists

router.get('/', getArtistsHandler);
router.get('/random', getRandomArtistHandler);
router.get('/:id/full', getFullArtistInfoHandler);
router.get('/:id', getArtistByIdHandler);

export default router;
