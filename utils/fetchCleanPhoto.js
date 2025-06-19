import { breedMap } from './breedMap.js';

// Use the Unsplash random photo endpoint so repeated requests
// yield different images even for the same search term.
const UNSPLASH_URL = 'https://api.unsplash.com/photos/random';
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
    const url = `${UNSPLASH_URL}?query=${encodeURIComponent(q)}&orientation=landscape&count=1`;
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
      // The random endpoint returns either a single object or an array when
      // the `count` parameter is used. Normalise it to a single photo object.
      const photo = Array.isArray(data) ? data[0] : data;
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
