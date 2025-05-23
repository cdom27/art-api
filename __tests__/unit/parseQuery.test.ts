import { parseQuery } from '../../src/modules/shared/utils/parseQuery';
import { Request, Response } from 'express';
import { z } from 'zod';
import { describe, vi, it, expect } from 'vitest';

describe('parseQuery', () => {
  const schema = z.object({
    page: z.coerce.number().int().positive().optional(),
    limit: z.coerce.number().int().positive().optional(),
    name: z.string().optional(),
  });

  const mockResp = () => {
    const resp = {} as Response;
    resp.status = vi.fn().mockReturnThis();
    resp.json = vi.fn().mockReturnThis();
    return resp;
  };

  it('should parse valid query params correctly', () => {
    const req = {
      query: {
        page: '1',
        limit: '10',
        name: 'Monet',
      },
    } as unknown as Request;

    const res = mockResp();

    const result = parseQuery(schema, req, res);
    expect(result).toEqual({ page: 1, limit: 10, name: 'Monet' });
  });

  it('should return undefined and send failure response for invalid params', () => {
    const req = {
      query: {
        page: '-5',
        limit: 'abc',
      },
    } as unknown as Request;

    const res = mockResp();

    const result = parseQuery(schema, req, res);
    expect(result).toBeUndefined();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        status: 400,
        message: expect.stringContaining('invalid query params'),
        data: null,
      })
    );
  });
});
