import { pgTable, serial, text, integer } from 'drizzle-orm/pg-core';

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
  imageUrl: text('image_url'),
  thumbnailUrl: text('thumbnail_url'),
  artistId: integer('artist_id').references(() => artists.id),
});
