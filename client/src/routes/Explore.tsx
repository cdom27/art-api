import SiteLayout from '../layouts/SiteLayout';
import useArtist from '../hooks/useArtist';
import { useEffect } from 'react';

export default function Explore() {
  const { artists, artistsMessage, artistsLoading, fetchArtists } = useArtist();

  useEffect(() => {
    fetchArtists();
  }, []);

  return (
    <SiteLayout>
      <h1 className='text-4xl'>Explore page!</h1>
      {artistsLoading ? (
        <p>Fetching artists...</p>
      ) : (
        artistsMessage && <p>{artistsMessage}</p>
      )}
      <div>
        {artists.map((a) => {
          return <h2 key={a.name}>{a.name}</h2>;
        })}
      </div>
    </SiteLayout>
  );
}
