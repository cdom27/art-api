# Artist API 🖼️

**Artist API** is a free and lightweight RESTful Web API that provides structured information about 50 of the most influential artists in history, along with selected public domain artworks.

Developers can access detailed artist bios, artwork data, and run keyword-based search queries. Whether you’re building educational apps, creative galleries, or simply experimenting, this API is a reliable resource.

You can get started by [generating a free public API key](https://art.cidominguez.com/docs). No sign-in or credit card required.

---

## Table of Contents

- [Tech Stack](#tech-stack)
- [API Information](#api-information)
- [TypeScript Types](#typescript-types)
- [Usage](#usage)
  - [Getting Started](#getting-started)
  - [Making Requests](#making-requests)
- [RESTful Endpoints](#restful-endpoints)
  - [Artists](#artists)
  - [Artworks](#artworks)
  - [Search](#search)
- [Projects Using Artist API](#projects-using-artist-api)
- [Plans for v2](#plans-for-v2)
- [Author](#author)
- [License](#license)

---

## Tech Stack

The current API version (v1) is deployed on **Google Cloud Platform** and built with:

- Node.js / Express.js
- TypeScript
- PostgreSQL
- Drizzle ORM
- Zod (for validation)
- Bcrypt (for secure key generation)

---

## API Information

- **Version**: v1
- **Base URL**: `https://art.cidominguez.com/api/v1/`
- **Authentication**: Requires a [free API key](https://art.cidominguez.com/docs#register). Include it in the request header as 'x-api-key'.
- **Rate Limiting**:
  - 200 requests per 15 minutes
  - After 75 requests, a delay of up to 3 seconds per request is applied
- **Image Licensing**: All images served are from the public domain.
- **Search**: Currently supports **keyword-based** filtering. Full-text search is planned for v2.
- If you use this API in a public or production setting, please consider linking to this repo for credit.

We welcome contributions in the form of data collection (public domain only) or code improvements.

---

## TypeScript Types

These types describe the shape of API responses and entities:

```ts
type Artist = {
  id: number;
  name: string;
  genre: string;
  nationality: string;
  bio: string;
  wikipedia: string; // Extended biography URL
  birthYear: string;
  deathYear: string;
};

type Artwork = {
  id: number;
  title: string;
  medium: string;
  inferredYear: string;
  imageUrl: string;
  thumbnailUrl: string;
  artistId: number;
};

export type ApiResponse<T> = {
  status: number;
  message: string;
  data: T | null;
};
```

---

## Usage

Before making requests, generate your free [API key](https://art.cidominguez.com/docs#register).

This section assumes you're using **Vite** or another build tool that supports `.env` variables. If you're using a different setup (Next.js, raw HTML, etc.), adapt accordingly.

### Getting Started

Create a `.env` file in your root directory and add:

```
VITE_IAA_BASE_URL=https://art.cidominguez.com/api/v1
VITE_IAA_PUBLIC_KEY=<YOUR_API_KEY_HERE>
```

In your code, load these values via `import.meta.env` (in Vite), or however your framework provides env variables.

---

### Making Requests

All requests must include your API key in the **headers** of the request as 'x-api-key':

#### Example: Get French artists

```ts
const response = await fetch(
  'https://art.cidominguez.com/api/v1/artists?nationality=French',
  {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': import.meta.env.VITE_IAA_PUBLIC_KEY,
    },
  }
);

const result = await response.json();
console.log(result);
```

#### Example: Search for artworks by title

```ts
const response = await fetch(
  'https://art.cidominguez.com/api/v1/artworks?title=lilies',
  {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': import.meta.env.VITE_IAA_PUBLIC_KEY,
    },
  }
);

const data = await response.json();
console.log(data);
```

---

## RESTful Endpoints

### Artists

#### Query Parameters

- `name` – Partial match (e.g., `name=van`)
- `genre` – Exact match
- `nationality` – Exact match
- `birthYearMin`, `birthYearMax` – Filter by birth year
- `deathYearMin`, `deathYearMax` – Filter by death year

#### Endpoints

- `GET /artists`
  Returns all artists ordered by `id` ascending.

- `GET /artists/:id`
  Returns a single artist by `id`.

- `GET /artists/random`
  Returns a random artist.

- `GET /artists/:id/full`
  Returns an artist and all their artworks.

---

### Artworks

#### Query Parameters

- `title` – Partial title match
- `medium` – Exact match
- `artistId` – Filter by artist ID

#### Endpoints

- `GET /artworks`
  Returns all artworks ordered by `id`.

- `GET /artworks/:id`
  Returns a single artwork by `id`.

- `GET /artworks/random`
  Returns a random artwork.

---

### Search

Performs a global keyword-based search across both artists and artworks.

#### Query Parameters

- `q` – Keyword string (e.g., `q=van go`)
- All parameters from [Artists](#artists) and [Artworks](#artworks) are supported

#### Example

```ts
const response = await fetch(
  'https://art.cidominguez.com/api/v1/search?q=monet&nationality=French',
  {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': import.meta.env.VITE_IAA_PUBLIC_KEY,
    },
  }
);

const json = await response.json();
console.log(json);
```

---

## Projects Using Artist API

Have you built something with Artist API? Open a PR to be featured here.

---

## Plans for v2

The next release (v2) will prioritize developer experience, performance, and support for additional open data sources.

**Planned features:**

1. **Year Normalization**
   Improve support for inferred or ambiguous artwork dates with partial range support (e.g., `1870s`, `early 1800s`).

2. **Image Proxy Parameters**
   New `imageUrl` generation with support for `width`, `height`, and `fileType` (e.g., WebP, JPEG). This change will remove `primaryUrl` and `thumbnailUrl`.

3. **More Open Sources**
   Additional data sources will be integrated, with proper attribution listed in the documentation.

---

## Author

Maintained by [@cidominguez](https://github.com/cidominguez).
Feel free to open issues or suggest improvements.

---

## License

This project and API are licensed under the [MIT License](LICENSE).
All artwork images are sourced from the public domain.

---
