import express from 'express';
import { PORT } from './config/env';
import { rateLimiter } from './middlewares/rateLimiter';
import { speedLimiter } from './middlewares/slowDown';
import artistRoutes from './modules/artists/routes';
import artworkRoutes from './modules/artworks/routes';

const app = express();

// middlewares
app.use(express.json());
app.use(rateLimiter);
app.use(speedLimiter);

app.use('/api/artists', artistRoutes);
app.use('/api/artworks', artworkRoutes);

app.listen(PORT || 3000, () => {
  console.log(`Server running on port ${PORT || 3000}`);
});
