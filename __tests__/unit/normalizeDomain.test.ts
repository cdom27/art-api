import { normalizeDomain } from '../../src/modules/apiKeys/utils';
import { it, expect } from 'vitest';

it('normalizes domain with protocol', () => {
  expect(normalizeDomain('https://Example.com')).toBe('example.com');
});

it('normalizes domain without protocol', () => {
  expect(normalizeDomain('example.com')).toBe('example.com');
});

it('returns null for invalid input', () => {
  expect(normalizeDomain('%%%')).toBe(null);
});
