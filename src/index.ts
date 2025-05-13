import express from 'express';
import { PORT } from './config/env';
import artistRoutes from './modules/artists/routes';
import artworkRoutes from './modules/artworks/routes';

const app = express();

app.use(express.json());

app.use('/api/artists', artistRoutes);
app.use('/api/artworks', artworkRoutes);

app.listen(PORT || 3000, () => {
  console.log(`Server running on port ${PORT || 3000}`);
});
