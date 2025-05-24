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

describe('GET /api/v1/artworks', () => {
  it('should return artwork made with Oil on canvas', async () => {
    const res = await request(app)
      .get('/api/v1/artworks?medium=Oil on canvas')
      .set('x-api-key', apiKey);

    expect(res.status).toBe(200);
    expect(res.body.status).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.length).toBeGreaterThan(0);
    expect(res.body.data[0].medium).toBe('Oil on canvas');
  });
});

it('should fail without API key', async () => {
  const res = await request(app).get('/api/v1/artworks');
  expect(res.status).toBe(401);
});

it('should return artwork by ID', async () => {
  const res = await request(app)
    .get('/api/v1/artworks/0')
    .set('x-api-key', apiKey);

  expect(res.status).toBe(200);
  expect(res.body.data.id).toBe(0);
  expect(res.body.data.title).toContain('Jeanne Hébuterne');
});

it('should return random artwork', async () => {
  const res = await request(app)
    .get('/api/v1/artworks/random')
    .set('x-api-key', apiKey);

  expect(res.status).toBe(200);
  expect(res.body.data).toHaveProperty('title');
});

it('should fail on invalid ID', async () => {
  const res = await request(app)
    .get('/api/v1/artworks/invalid')
    .set('x-api-key', apiKey);

  expect(res.status).toBe(400);
});
