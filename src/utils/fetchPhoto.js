export async function fetchPhoto(query) {
  // Vite injects environment variables via `import.meta.env` in the browser.
  // During Jest tests or Node usage `import.meta` is undefined, so fall back to
  // `process.env` to keep the function working in all environments.
  const baseUrl =
    (typeof import.meta !== 'undefined' && import.meta.env.VITE_API_BASE_URL) ||
    process.env.VITE_API_BASE_URL ||
    ''
  const res = await fetch(`${baseUrl}/api/photos?query=${encodeURIComponent(query)}`);
  if (!res.ok) {
    const message = await res.text();
    console.error('Photo fetch failed', message);
    throw new Error(message || `HTTP ${res.status}`);
  }
  const data = await res.json();
  return data.url;
}
