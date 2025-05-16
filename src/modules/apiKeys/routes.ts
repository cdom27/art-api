import { Router } from 'express';
import { registerDomainHandler } from './controller';

const router = Router();

// /api/internal
router.post('/register-domain', registerDomainHandler);

export default router;
