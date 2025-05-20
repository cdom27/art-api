import type { Artist } from '../artists/types';
import type { Artwork } from '../artworks/types';

export type SearchResult = {
  artists: Artist[];
  artworks: Artwork[];
};
