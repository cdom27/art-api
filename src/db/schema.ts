import {
  pgTable,
  serial,
  text,
  integer,
  uuid,
  timestamp,
} from 'drizzle-orm/pg-core';

export const artists = pgTable('artists', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  genre: text('genre').notNull(),
  nationality: text('nationality').notNull(),
  bio: text('bio').notNull(),
  wikipedia: text('wikipedia').notNull(),
  birthYear: integer('birth_year').notNull(),
  deathYear: integer('death_year').notNull(),
});

export const artworks = pgTable('artworks', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  medium: text('medium').notNull(),
  inferredYear: text('inferred_year').notNull(),
  artistId: integer('artist_id').references(() => artists.id),
});

export const apiKeys = pgTable('api_keys', {
  id: uuid('id').defaultRandom().primaryKey(),
  domain: text('domain').notNull(),
  secret: text('secret').notNull(),
  requestCount: integer('request_count').notNull().default(0),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const schema = {
  artists,
  artworks,
  apiKeys,
};
