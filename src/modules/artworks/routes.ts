import { Router } from 'express';
import {
  getArtworkByIdHandler,
  getArtworksHandler,
  getRandomArtworkHandler,
} from './controller';

const router = Router();

// /api/artworks

router.get('/', getArtworksHandler);
router.get('/random', getRandomArtworkHandler);
router.get('/:id', getArtworkByIdHandler);

export default router;
