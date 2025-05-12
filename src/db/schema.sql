CREATE TABLE artists (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    genre TEXT,
    nationality TEXT,
    bio TEXT,
    wikipedia TEXT,
    painting_count INT,
    birth_year INT,
    death_year INT
);

CREATE TABLE paintings (
    id SERIAL PRIMARY KEY,
    title TEXT,
    medium TEXT,
    description TEXT,
    style TEXT,
    inferred_year INT,
    image_url TEXT,
    thumbnail_url TEXT,
    artist_id INTEGER REFERENCES artists (id)
);
