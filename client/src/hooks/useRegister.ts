import { useState } from 'react';
import type { ApiResponse } from '../lib/types/apiResponse';

export default function useRegister() {
  const [pubKey, setPubKey] = useState<string | null>(null);
  const [respMessage, setRespMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const registerDomain = async (domain: string) => {
    setIsLoading(true);
    try {
      const resp = await fetch(`/api/internal/register-domain`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ domain }),
      });
      const result: ApiResponse<string> = await resp.json();

      console.log('Api response:', result);

      if (!resp.ok || !result.data) {
        throw new Error(
          `${result.status}: ${result.message}` || 'Failed to register dev site'
        );
      }

      // set pubKey to the generate key recieved
      setPubKey(result.data);
    } catch (error) {
      console.error('Error registering your dev site:', error);
      setRespMessage('Error registering your dev site');
    } finally {
      setIsLoading(false);
    }
  };

  return { registerDomain, pubKey, isLoading, respMessage };
}
