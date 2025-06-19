import { breedMap } from '../server.js';

const UNSPLASH_URL = 'https://api.unsplash.com/search/photos';
const CROP_PARAMS = 'w=640&h=360&fit=crop&crop=faces,entropy';

export default async function fetchCleanPhoto(rawQuery) {
  const term = breedMap[rawQuery] || rawQuery;
  const queries = [
    `${term} isolated minimal background`,
    `${term} white background`,
    'dog white background',
  ];

  for (const q of queries) {
    const url = `${UNSPLASH_URL}?query=${encodeURIComponent(q)}&color=white&orientation=landscape&per_page=1`;
    try {
      const res = await fetch(url, {
        headers: { Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}` },
      });
      if (!res.ok) {
        const text = await res.text().catch(() => '');
        console.error(`Unsplash error for "${q}"`, res.status, text);
        if (res.status === 404) continue;
        continue;
      }
      const data = await res.json();
      if (data.results && data.results[0] && data.results[0].urls) {
        const { raw, regular } = data.results[0].urls;
        if (raw || regular) {
          const baseUrl = raw || regular;
          const join = baseUrl.includes('?') ? '&' : '?';
          return `${baseUrl}${join}${CROP_PARAMS}`;
        }
      }
    } catch (err) {
      console.error(`Fetch failed for "${q}"`, err);
    }
  }
  return '/images/placeholder.png';
}
