import { buildSearchConditions } from '../../src/modules/shared/utils/buildSearchConditions';
import { describe, it, expect } from 'vitest';
import { sql } from 'drizzle-orm';

describe('buildSearchConditions', () => {
  const field = sql`"name"`;

  it('returns a valid SQL object for single term', () => {
    const result = buildSearchConditions([field], 'monet');
    expect(result).toBeDefined();
    expect(typeof result).toBe('object');
  });

  it('returns a SQL object even if query is empty', () => {
    const result = buildSearchConditions([field], '   ');
    expect(result).toBeDefined();
  });

  it('does not throw for multiple terms and fields', () => {
    const result = buildSearchConditions([field, sql`"genre"`], 'van gogh');
    expect(result).toBeDefined();
  });
});
