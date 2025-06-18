import { generateSignedUrl } from './generateSignedUrl';
import { Artwork, ArtworkWithSignedImageUrls } from '../../artworks/types';

export const enrichArtwork = async (
  artwork: Artwork
): Promise<ArtworkWithSignedImageUrls> => {
  const [fullImageUrl, thumbnailImageUrl] = await Promise.all([
    generateSignedUrl(`images/${artwork.id}/full.webp`),
    generateSignedUrl(`images/${artwork.id}/thumb.webp`),
  ]);

  const enrichedArtwork = {
    ...artwork,
    fullImageUrl,
    thumbnailImageUrl,
  };

  console.log('Enriched artwork:', enrichedArtwork);

  return enrichedArtwork;
};

export const enrichArtworks = async (
  artworks: Artwork[]
): Promise<ArtworkWithSignedImageUrls[]> => {
  return Promise.all(artworks.map(enrichArtwork));
};
