import express from 'express';
import { PORT } from './config/env';
import artistRoutes from './modules/artists/routes';

const app = express();

app.use(express.json());

app.use('/api/artists', artistRoutes);

app.listen(PORT || 3000, () => {
  console.log(`Server running on port ${PORT || 3000}`);
});
