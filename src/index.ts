import express from 'express';
import cors from 'cors';
import path from 'path';
import { PORT } from './config/env';
import { rateLimiter } from './middlewares/rateLimiter';
import { speedLimiter } from './middlewares/slowDown';
import { apiKeyAuth } from './middlewares/apiKeyAuth';
import artistRoutes from './modules/artists/routes';
import artworkRoutes from './modules/artworks/routes';
import apiKeyRoutes from './modules/apiKeys/routes';
import searchRoutes from './modules/search/routes';

const app = express();

// trust cloud run reverse proxy
app.set('trust proxy', 1);

app.use(cors());

// middlewares
app.use(express.json());
app.use(rateLimiter);
app.use(speedLimiter);

app.use('/api/v1', apiKeyAuth);

// serve client
const staticPath = path.join(__dirname, '../client');
app.use(express.static(staticPath));
app.get('/', (req, res) => {
  res.sendFile(path.join(staticPath, 'index.html'));
});

app.use('/api/v1/artists', artistRoutes);
app.use('/api/v1/artworks', artworkRoutes);
app.use('/api/v1/search', searchRoutes);

app.use('/api/internal', apiKeyRoutes);

app.listen(PORT || 8080, () => {
  console.log(`Server running on port ${PORT || 8080}`);
});

export default app;
