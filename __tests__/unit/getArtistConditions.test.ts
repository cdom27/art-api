import { getArtistConditions } from '../../src/modules/shared/utils/checkFilters';
import { describe, it, expect } from 'vitest';

describe('getArtistConditions', () => {
  it('returns empty array for no filters', () => {
    const filters = {};
    const conditions = getArtistConditions(filters);
    expect(conditions).toEqual([]);
  });

  it('creates name ilike condition', () => {
    const filters = { name: 'vangogh' };
    const conditions = getArtistConditions(filters);
    expect(conditions.length).toBe(1);
  });

  it('creates multiple conditions for name and nationality', () => {
    const filters = {
      name: 'claude',
      nationality: 'French',
    };
    const conditions = getArtistConditions(filters);
    expect(conditions.length).toBe(2);
  });

  it('creates correct number of conditions for range fields', () => {
    const filters = {
      birthYearMin: 1800,
      birthYearMax: 1900,
      deathYearMin: 1850,
      deathYearMax: 1950,
    };
    const conditions = getArtistConditions(filters);
    expect(conditions.length).toBe(4);
  });

  it('handles all filters together', () => {
    const filters = {
      name: 'monet',
      genre: 'impressionism',
      nationality: 'French',
      birthYearMin: 1800,
      birthYearMax: 1900,
    };
    const conditions = getArtistConditions(filters);
    expect(conditions.length).toBe(5);
  });
});
