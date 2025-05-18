import { useCallback, useState } from 'react';
import type { ApiResponse } from '../lib/types/apiResponse';
import type { Artist } from '../lib/types/artist';

export default function useArtist() {
  //   const [artist, setArtist] = useState<Artist | null>(null);
  const [artists, setArtists] = useState<Artist[]>([]);
  const [artistsMessage, setArtistsMessage] = useState<string | null>(null);
  const [artistsLoading, setArtistsLoading] = useState(false);

  const fetchArtists = useCallback(async () => {
    setArtistsLoading(true);
    setArtistsMessage(null);

    try {
      const resp = await fetch(`/api/v1/artists`, {
        method: 'GET',
        headers: { 'Content-Type': 'applications/json' },
      });

      const result: ApiResponse<Artist[]> = await resp.json();

      if (!resp.ok || !result.data) {
        throw new Error(
          `${result.status}: ${result.message}` || 'Failed to fetched artists.'
        );
      }

      console.log('Fetched artists:', result.data);
      setArtistsMessage(result.message);
      setArtists(result.data);
    } catch (error) {
      console.log('Failed to fetch artists', error);
      setArtistsMessage(`Failed to fetch artists: ${error}`);
    } finally {
      setArtistsLoading(false);
    }
  }, []);

  return { artists, artistsMessage, artistsLoading, fetchArtists };
}
