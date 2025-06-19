export async function fetchPhoto(query) {
  const baseUrl = process.env.VITE_API_BASE_URL || ''
  const res = await fetch(`${baseUrl}/api/photos?query=${encodeURIComponent(query)}`);
  if (!res.ok) {
    const message = await res.text();
    console.error('Photo fetch failed', message);
    throw new Error(message || `HTTP ${res.status}`);
  }
  const data = await res.json();
  return data.url;
}
