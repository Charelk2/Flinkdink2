import { breedMap } from './breedMap.js';

// Use the Unsplash search endpoint for more relevant results. The API
// returns a list of photos ordered by relevance. We take the first item
// to avoid displaying completely unrelated images.
const UNSPLASH_URL = 'https://api.unsplash.com/search/photos';
const CROP_PARAMS = 'w=640&h=360&fit=crop&crop=faces,entropy';

export default async function fetchCleanPhoto(rawQuery) {
  const term = (breedMap[rawQuery] || rawQuery).trim();
  const queries = [
    `${term} isolated minimal background`,
    `${term} white background`,
    term,
  ];

  let lastError = null;
  for (const q of queries) {
    const url = `${UNSPLASH_URL}?query=${encodeURIComponent(q)}&orientation=landscape&per_page=1&page=1`;
    try {
      const res = await fetch(url, {
        headers: { Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}` },
      });
      if (!res.ok) {
        const text = await res.text().catch(() => '');
        console.error(`Unsplash error for "${q}"`, res.status, text);
        if (res.status === 404) continue;
        lastError = new Error(text || `Unsplash request failed with status ${res.status}`);
        lastError.code = res.status;
        continue;
      }
      const data = await res.json();
      // The search endpoint returns `{ results: [...] }`. Grab the first
      // result and return its raw URL if present.
      const photo = data && (Array.isArray(data.results) ? data.results[0] : data);
      if (photo && photo.urls && photo.urls.raw) {
        const { raw } = photo.urls;
        const join = raw.includes('?') ? '&' : '?';
        return `${raw}${join}${CROP_PARAMS}`;
      }
    } catch (err) {
      console.error(`Fetch failed for "${q}"`, err);
      lastError = err;
    }
  }
  if (lastError) {
    console.error('All Unsplash requests failed, returning placeholder', lastError);
  }
  return '/images/placeholder.png';
}
