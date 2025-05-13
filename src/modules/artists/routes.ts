import { Router } from 'express';
import {
  getArtistByIdHandler,
  getArtistsHandler,
  getRandomArtistHandler,
} from './controller';

const router = Router();

// /api/artists

router.get('/', getArtistsHandler);
router.get('/random', getRandomArtistHandler);
router.get('/:id', getArtistByIdHandler);

export default router;
