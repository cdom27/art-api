import { Router } from 'express';
import { searchHandler } from './controller';

const router = Router();

// /api/v1/search

router.get('/', searchHandler);

export default router;
