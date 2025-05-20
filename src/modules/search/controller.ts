import { Request, Response } from 'express';
import { parseQuery } from '../shared/utils/parseQuery';
import { searchQuerySchema } from './querySchema';
import { failure, success } from '../shared/utils/buildResponse';
import { search } from './service';

export const searchHandler = async (req: Request, res: Response) => {
  // parse query params
  const q = parseQuery(searchQuerySchema, req, res);
  if (!q) return;

  try {
    const searchResults = await search(q);

    return success(res, searchResults, 'Successfully searched data.');
  } catch (error) {
    console.log('Error fetching artists:', error);
    return failure(res, 'Internal error searching for results.');
  }
};
