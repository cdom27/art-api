import { ZodSchema } from 'zod';
import { Request, Response } from 'express';

export const parseQuery = <T>(
  schema: ZodSchema<T>,
  req: Request,
  res: Response
): T | undefined => {
  const result = schema.safeParse(req.query);

  if (!result.success) {
    res
      .status(400)
      .json({ error: 'Invalid query params', issues: result.error.format() });
    return;
  }

  return result.data;
};
