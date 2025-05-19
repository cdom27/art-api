import { z, ZodTypeAny } from 'zod';
import { Request, Response } from 'express';
import { failure } from './buildResponse';

export const parseQuery = <T extends ZodTypeAny>(
  schema: T,
  req: Request,
  res: Response
): z.output<T> | undefined => {
  const result = schema.safeParse(req.query);

  if (!result.success) {
    return failure(res, `invalid query params: ${result.error.format()}`, 400);
  }

  return schema.parse(req.query);
};
