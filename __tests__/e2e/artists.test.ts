import request from 'supertest';
import app from '../../src/index';
import db from '../../src/db/client';
import bcrypt from 'bcrypt';
import { apiKeys } from '../../src/db/schema';
import { beforeAll, describe, it, expect } from 'vitest';

const TEST_KEY = 'test-key-123';
let apiKey = TEST_KEY;

beforeAll(async () => {
  const hashed = await bcrypt.hash(TEST_KEY, 10);

  await db.insert(apiKeys).values({
    domain: 'localhost',
    secret: hashed,
  });
});

describe('GET /api/v1/artists', () => {
  it('should return Italian artists', async () => {
    const res = await request(app)
      .get('/api/v1/artists?nationality=Italian')
      .set('x-api-key', apiKey);

    expect(res.status).toBe(200);
    expect(res.body.status).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.length).toBeGreaterThan(0);
    expect(res.body.data[0].nationality).toBe('Italian');
  });

  it('should fail without API key', async () => {
    const res = await request(app).get('/api/v1/artists');
    expect(res.status).toBe(401);
  });

  it('should return artist by ID', async () => {
    const res = await request(app)
      .get('/api/v1/artists/0')
      .set('x-api-key', apiKey);

    expect(res.status).toBe(200);
    expect(res.body.data.id).toBe(0);
    expect(res.body.data.name).toContain('Modigliani');
  });

  it('should return full artist info', async () => {
    const res = await request(app)
      .get('/api/v1/artists/0/full')
      .set('x-api-key', apiKey);

    expect(res.status).toBe(200);
    expect(res.body.data.id).toBe(0);
    expect(Array.isArray(res.body.data.artworks)).toBe(true);
  });

  it('should return random artist', async () => {
    const res = await request(app)
      .get('/api/v1/artists/random')
      .set('x-api-key', apiKey);

    expect(res.status).toBe(200);
    expect(res.body.data).toHaveProperty('name');
  });

  it('should fail on invalid ID', async () => {
    const res = await request(app)
      .get('/api/v1/artists/invalid')
      .set('x-api-key', apiKey);

    expect(res.status).toBe(400);
  });
});
