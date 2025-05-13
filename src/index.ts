import express from 'express';
import { PORT } from './config/env';
import pool from './db/client';

const app = express();

app.use(express.json());

app.get('/ping', async (_, res) => {
  const result = await pool.execute('SELECT NOW()');
  res.json({ time: result.rows[0].now });
});

app.listen(PORT || 3000, () => {
  console.log(`Server running on port ${PORT || 3000}`);
});
