import { Router } from 'express';
import { getArtistsHandler } from './controller';

const router = Router();

router.get('/', getArtistsHandler);

export default router;
