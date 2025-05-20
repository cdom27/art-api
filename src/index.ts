import express from 'express';
import { PORT } from './config/env';
import { rateLimiter } from './middlewares/rateLimiter';
import { speedLimiter } from './middlewares/slowDown';
import artistRoutes from './modules/artists/routes';
import artworkRoutes from './modules/artworks/routes';
import apiKeyRoutes from './modules/apiKeys/routes';
import searchRoutes from './modules/search/routes';

const app = express();

// middlewares
app.use(express.json());
app.use(rateLimiter);
app.use(speedLimiter);

// // serve static frontend
// app.use(
//   express.static(path.resolve(__dirname, './client'), {
//     extensions: ['html'],
//   })
// );

app.use('/api/v1/artists', artistRoutes);
app.use('/api/v1/artworks', artworkRoutes);
app.use('/api/v1/search', searchRoutes);

app.use('/api/internal', apiKeyRoutes);

app.listen(PORT || 3000, () => {
  console.log(`Server running on port ${PORT || 3000}`);
});
