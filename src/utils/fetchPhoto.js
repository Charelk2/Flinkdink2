/* global __API_BASE_URL__ */
export async function fetchPhoto(query) {
  // `__API_BASE_URL__` is replaced by Vite during the build. Jest and Node
  // fall back to `process.env` when the global constant is undefined.
  const baseUrl =
    (typeof __API_BASE_URL__ !== 'undefined' && __API_BASE_URL__) ||
    process.env.VITE_API_BASE_URL ||
    '';

  try {
    const res = await fetch(
      `${baseUrl}/api/photos?query=${encodeURIComponent(query)}`,
    );
    const body = await res.text();
    console.log('Unsplash status', res.status);
    console.log('Unsplash body', body);

    if (!res.ok) {
      return {
        avif: '/images/placeholder.png',
        webp: '/images/placeholder.png',
        fallback: '/images/placeholder.png',
      };
    }

    const data = JSON.parse(body);
    const regular = data.regular || data.url;
    const small = data.small || regular;

    if (!regular) {
      return {
        avif: '/images/placeholder.png',
        webp: '/images/placeholder.png',
        fallback: '/images/placeholder.png',
      };
    }

    return {
      avif: `${regular}&fm=avif`,
      webp: `${regular}&fm=webp`,
      fallback: small,
    };
  } catch (err) {
    console.error('Photo fetch failed', err);
    return {
      avif: '/images/placeholder.png',
      webp: '/images/placeholder.png',
      fallback: '/images/placeholder.png',
    };
  }
}
