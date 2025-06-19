import { breedMap } from './breedMap.js';

// Use the Unsplash search endpoint for more relevant results. The API
// returns a list of photos ordered by relevance. We take the first item
// to avoid displaying completely unrelated images.
const UNSPLASH_URL = 'https://api.unsplash.com/search/photos';
const CROP_PARAMS = 'w=640&h=360&fit=crop&crop=faces,entropy';

export default async function fetchCleanPhoto(rawQuery) {
  const term = (breedMap[rawQuery] || rawQuery).trim();
  // 1) Portrait photo  2) White background  3) Studio isolation  4) Plain term
  const queries = [
    { q: term, orientation: 'portrait' },
    { q: `${term} white background`, color: 'white', orientation: 'landscape' },
    { q: `${term} isolated minimal background`, orientation: 'landscape' },
    { q: term, orientation: 'landscape' },
  ];

  let lastError = null;
  for (const { q, color, orientation } of queries) {
    const params = new URLSearchParams({
      query: q,
      per_page: '3',
      orientation,
      ...(color ? { color } : {}),
    });
    const url = `${UNSPLASH_URL}?${params.toString()}`;

    try {
      const res = await fetch(url, {
        headers: { Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}` },
      });
      if (!res.ok) continue;

      const { results } = await res.json();
      if (!results?.length) continue;

      const pick =
        results.find((img) =>
          img.tags?.some((t) => t.title.toLowerCase().includes(term.toLowerCase())),
        ) || results[0];

      const raw = pick.urls.raw;
      const sep = raw.includes('?') ? '&' : '?';
      return `${raw}${sep}${CROP_PARAMS}`;
    } catch (err) {
      lastError = err;
    }
  }

  if (lastError) {
    console.error('All Unsplash requests failed, returning placeholder', lastError);
  }

  return '/images/placeholder.png';
}
