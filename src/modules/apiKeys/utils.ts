import crypto from 'node:crypto';
import bcrypt from 'bcrypt';
import { KeyPair } from './types';

export const generateAndHashKey = async (): Promise<KeyPair> => {
  const pubKey = crypto.randomBytes(32).toString('hex');

  const secret = await bcrypt.hash(pubKey, 10);

  return { pubKey, secret };
};

export const normalizeDomain = (input: string) => {
  try {
    const url = new URL(input.includes('://') ? input : `https://${input}`);

    return url.hostname.toLowerCase();
  } catch (error) {
    console.log('Error normalizing domain:', error);
    return null;
  }
};
