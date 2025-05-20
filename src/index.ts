import express from 'express';
import cors from 'cors';
import { PORT } from './config/env';
import { rateLimiter } from './middlewares/rateLimiter';
import { speedLimiter } from './middlewares/slowDown';
import { apiKeyAuth } from './middlewares/apiKeyAuth';
import artistRoutes from './modules/artists/routes';
import artworkRoutes from './modules/artworks/routes';
import apiKeyRoutes from './modules/apiKeys/routes';
import searchRoutes from './modules/search/routes';

const app = express();

app.use(cors());

// middlewares
app.use(express.json());
app.use(rateLimiter);
app.use(speedLimiter);

app.use('/api/v1', apiKeyAuth);

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
