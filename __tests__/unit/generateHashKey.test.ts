import { generateAndHashKey } from '../../src/modules/apiKeys/utils';
import bcrypt from 'bcrypt';
import { it, expect } from 'vitest';

it('generates a valid key pair with hashed secret', async () => {
  const { pubKey, secret } = await generateAndHashKey();

  expect(pubKey).toMatch(/^[a-f0-9]{64}$/); // hex
  const match = await bcrypt.compare(pubKey, secret);
  expect(match).toBe(true);
});
