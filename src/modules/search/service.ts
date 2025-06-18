import db from '../../db/client';
import { and, asc, eq } from 'drizzle-orm';
import { artists, artworks } from '../../db/schema';
import {
  getArtistConditions,
  getArtworkConditions,
} from '../shared/utils/checkFilters';
import { SearchQueryParams } from './querySchema';
import { SearchResult } from './types';
import { buildSearchConditions } from '../shared/utils/buildSearchConditions';
import { enrichArtworks } from '../shared/utils/enrichArtwork';

export const search = async (filters: SearchQueryParams) => {
  // prep response data structure
  const types = filters.types?.split(',') ?? ['artists', 'artworks'];
  const result: SearchResult = { artists: [], artworks: [] };

  // fetch artists and artworks based on filter conditions
  if (types.includes('artists')) {
    const artistConditions = getArtistConditions(filters);
    if (filters.q) {
      artistConditions.push(buildSearchConditions([artists.name], filters.q));
    }

    const artistQ = db
      .select()
      .from(artists)
      .where(artistConditions.length ? and(...artistConditions) : undefined)
      .orderBy(asc(artists.name));

    // paginate query to specified amount
    if (filters.page !== undefined && filters.limit !== undefined) {
      const offset = (filters.page - 1) * filters.limit;
      artistQ.limit(filters.limit).offset(offset);
    } else {
      //force pagination if not specified
      artistQ.limit(20).offset(0);
    }

    result.artists = await artistQ;
  }

  if (types.includes('artworks')) {
    const artworkConditions = getArtworkConditions(filters);

    const artworkQ = db
      .select({
        id: artworks.id,
        title: artworks.title,
        medium: artworks.medium,
        inferredYear: artworks.inferredYear,
        artistId: artworks.artistId,
        artistName: artists.name,
      })
      .from(artworks)
      .innerJoin(artists, eq(artworks.artistId, artists.id));

    if (filters.q) {
      artworkConditions.push(
        buildSearchConditions([artworks.title, artists.name], filters.q)
      );
    }

    if (artworkConditions.length) {
      artworkQ.where(and(...artworkConditions));
    }

    // paginate query to specified amount
    if (filters.page !== undefined && filters.limit !== undefined) {
      const offset = (filters.page - 1) * filters.limit;
      artworkQ.limit(filters.limit).offset(offset);
    } else {
      //force pagination if not specified
      artworkQ.limit(20).offset(0);
    }

    result.artworks = await artworkQ;

    //enrich artworks with signed urls
    result.artworks = await enrichArtworks(result.artworks);
  }

  return result;
};
