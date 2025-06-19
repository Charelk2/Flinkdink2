import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react()],
    define: {
      'import.meta.env.VITE_API_BASE_URL': JSON.stringify(env.VITE_API_BASE_URL),
      __API_BASE_URL__: JSON.stringify(env.VITE_API_BASE_URL),
      'import.meta.env.VITE_UNSPLASH_ACCESS_KEY': JSON.stringify(env.UNSPLASH_ACCESS_KEY),
      'import.meta.env.VITE_UNSPLASH_SECRET_KEY': JSON.stringify(env.UNSPLASH_SECRET_KEY),
    },
  };
});
