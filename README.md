# FlinkDink Flashcards

This project is a simple flashcard app for toddlers built with **React**, **Vite**, and **Tailwind CSS**. Content is organized in weekly JSON files and progress is saved locally.

## Development

Install dependencies (including the new `@tailwindcss/postcss` plugin) and start the dev server:

```bash
npm install
npm run dev
```

Lint the code with ESLint:

```bash
npm run lint
```

## Project Structure

- `src/contexts` – global `ContentProvider` that loads week data and tracks progress
- `src/modules` – individual learning modules (Language, Math, Encyclopedia)
- `src/screens` – page components for the router
- `public/weeks` – JSON data files per week

## Progress Storage

User progress is stored in `localStorage` under the key `progress-v1`. The app automatically advances sessions, days, and weeks.

## License

Images used in the encyclopedia module are loaded from Unsplash using CC-licensed URLs.
