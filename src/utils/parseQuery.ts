import { z, ZodTypeAny } from 'zod';
import { Request, Response } from 'express';

export const parseQuery = <T extends ZodTypeAny>(
  schema: T,
  req: Request,
  res: Response
): z.output<T> | undefined => {
  const result = schema.safeParse(req.query);

  if (!result.success) {
    res
      .status(400)
      .json({ error: 'Invalid query params', issues: result.error.format() });
    return;
  }

  return schema.parse(req.query);
};
