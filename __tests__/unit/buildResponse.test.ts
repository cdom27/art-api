import { success, failure } from '../../src/modules/shared/utils/buildResponse';
import { Response } from 'express';
import { describe, vi, it, expect } from 'vitest';

describe('buildResponse', () => {
  const mockResp = () => {
    const res = {} as Response;
    res.status = vi.fn().mockReturnThis();
    res.json = vi.fn().mockReturnThis();
    return res;
  };

  it('should send a success response with custom message and status', () => {
    const res = mockResp();
    const data = ['Monet', 'Manet'];

    success(res, data, 'Fetched artists', 200);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      status: 200,
      message: 'Fetched artists',
      data,
    });
  });

  it('should send a failure response with default message and status', () => {
    const res = mockResp();

    failure(res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      status: 500,
      message: 'Internal server error',
      data: null,
    });
  });

  it('should send a failure response with custom message and status', () => {
    const res = mockResp();

    failure(res, 'Bad request', 400);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      status: 400,
      message: 'Bad request',
      data: null,
    });
  });
});
