import { ilike, SQL, and, or, Column } from 'drizzle-orm';

export const buildSearchConditions = (
  fields: (Column | SQL)[],
  query: string,
  mode: 'AND' | 'OR' = 'AND'
): SQL => {
  const terms = query.trim().split(/\s+/).filter(Boolean);

  const conditions = terms.map((term) =>
    or(...fields.map((field) => ilike(field, `%${term}%`)))
  );

  if (!conditions.length) return ilike(fields[0], '%%');

  return mode === 'AND' ? and(...conditions)! : or(...conditions)!;
};
