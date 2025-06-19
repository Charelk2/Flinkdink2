import { breedMap } from '../server.js'

const UNSPLASH_URL = 'https://api.unsplash.com/search/photos'

export default async function fetchCleanPhoto(rawQuery) {
  const term = breedMap[rawQuery] || rawQuery
  const queries = [
    `${term} isolated minimal background`,
    `${term} white background`,
    'dog white background',
  ]

  for (const q of queries) {
    const url = `${UNSPLASH_URL}?query=${encodeURIComponent(q)}&color=white&orientation=landscape&per_page=1&w=640&h=360&fit=crop&crop=faces,entropy`
    try {
      const res = await fetch(url, {
        headers: { Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}` },
      })
      if (!res.ok) {
        const text = await res.text().catch(() => '')
        console.error(`Unsplash error for "${q}"`, res.status, text)
        if (res.status === 404) continue
        continue
      }
      const data = await res.json()
      if (data.results && data.results[0] && data.results[0].urls && data.results[0].urls.small) {
        return data.results[0].urls.small
      }
    } catch (err) {
      console.error('Fetch failed', err)
    }
  }
  return '/images/placeholder.png'
}
