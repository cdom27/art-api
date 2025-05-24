import request from 'supertest';
import app from '../../src/index';
import { describe, it, expect } from 'vitest';

describe('POST /api/internal/register-domain', () => {
  it('creates and returns a public key for valid domain', async () => {
    const res = await request(app)
      .post('/api/internal/register-domain')
      .send({ domain: 'https://testdomain.com' });

    expect(res.status).toBe(200);
    expect(res.body.data).toMatch(/^[a-f0-9]{64}$/);
  });

  it('fails when domain is missing', async () => {
    const res = await request(app)
      .post('/api/internal/register-domain')
      .send({});

    expect(res.status).toBe(400);
    expect(res.body.message).toMatch(/domain missing/i);
  });

  it('fails when domain is invalid', async () => {
    const res = await request(app)
      .post('/api/internal/register-domain')
      .send({ domain: '%%%invalid%%%' });

    expect(res.status).toBe(400);
    expect(res.body.message).toMatch(/normalize/i);
  });
});
