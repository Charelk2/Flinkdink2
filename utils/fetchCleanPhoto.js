import { breedMap } from '../server.js';
const UNSPLASH_URL = 'https://api.unsplash.com/search/photos';

const CROP = '&w=640&h=360&fit=crop&crop=faces,entropy';

export default async function fetchCleanPhoto(rawQuery) {
  const term = (breedMap[rawQuery] || rawQuery).trim();
  const queries = [
    // 1) portrait
    { qs: term, params: '&orientation=portrait' },
    // 2) portrait + white bg
    { qs: term, params: '&orientation=portrait&color=white' },
    // 3) clean studio‐look
    { qs: `${term} isolated minimal background`, params: '&orientation=landscape&color=white' },
    // 4) any landscape
    { qs: term, params: '&orientation=landscape' },
  ];

  for (const { qs, params } of queries) {
    const url = `${UNSPLASH_URL}` +
                `?query=${encodeURIComponent(qs)}` +
                `&per_page=3` +
                params +
                CROP;
    console.log('[fetchCleanPhoto] trying →', qs, url);
    try {
      const res = await fetch(url, {
        headers: { Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}` },
      });
      console.log('[fetchCleanPhoto] status', res.status);
      if (!res.ok) {
        console.warn('[fetchCleanPhoto] bad status, continuing…');
        continue;
      }
      const { results } = await res.json();
      console.log('[fetchCleanPhoto] got', results.length, 'results');
      if (results.length > 0 && results[0].urls?.small) {
        return results[0].urls.small;
      }
    } catch (err) {
      console.error('[fetchCleanPhoto] fetch error, continuing…', err);
    }
  }

  console.warn('[fetchCleanPhoto] all queries failed, falling back to placeholder');
  return '/images/placeholder.png';
}
