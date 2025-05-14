CREATE TABLE artists (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    genre TEXT NOT NULL,
    nationality TEXT NOT NULL,
    bio TEXT NOT NULL,
    wikipedia TEXT NOT NULL,
    birth_year INT NOT NULL,
    death_year INT NOT NULL
);

CREATE TABLE artworks (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    medium TEXT NOT NULL,
    description TEXT NOT NULL,
    style TEXT NOT NULL,
    inferred_year TEXT NOT NULL,
    image_url TEXT,
    thumbnail_url TEXT,
    artist_id INTEGER REFERENCES artists (id)
);