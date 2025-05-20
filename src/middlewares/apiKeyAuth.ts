import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import { failure } from '../modules/shared/utils/buildResponse';
import {
  getKeyRecords,
  updateKeyRequestCount,
} from '../modules/apiKeys/service';

export const apiKeyAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const apiKey = req.header('x-api-key');
  const origin = req.header('origin');

  if (!apiKey) {
    console.warn('Missing API key');
    return failure(
      res,
      'Api key required. Visit https://art.cidominguez.com for more information.',
      401
    );
  }

  const keyRecords = await getKeyRecords();

  for (const rec of keyRecords) {
    const match = await bcrypt.compare(apiKey, rec.secret);
    if (!match) continue;

    const originHost = origin ? new URL(origin).hostname : null;

    if (rec.domain && originHost && !originHost.includes(rec.domain)) {
      console.warn(
        `API key origin mismatch: expected ${rec.domain}, got ${originHost}`
      );
      return failure(res, 'Invalid origin for this API key', 403);
    }

    await updateKeyRequestCount(rec.id, rec.requestCount + 1);
    return next();
  }

  return failure(res, 'Invalid API key', 401);
};
