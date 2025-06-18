# FlinkDink Flashcards

This project is a simple flashcard app for toddlers built with **React**, **Vite**, and **Tailwind CSS**. Content is organized in weekly JSON files and progress is saved locally.

## Development

Install dependencies (including the `@tailwindcss/postcss` plugin) and start the development server:

```bash
npm install
npm run dev
```

Tailwind CSS is processed with `@tailwindcss/postcss`. If you encounter a build
error about unknown utility classes, verify the plugin is installed and listed
in `postcss.config.js`.

Lint the code with ESLint:

```bash
npm run lint
```

Run the unit tests with Jest:

```bash
npm test
```

The suite uses **Jest** alongside **React Testing Library** for component tests.

## Project Structure

- `src/contexts` – global `ContentProvider` that loads week data and tracks progress
- `src/modules` – individual learning modules (Language, Math, Encyclopedia)
- `src/screens` – page components for the router
- `public/weeks` – JSON data files per week

## Progress Storage

User progress is stored in `localStorage` under the key `progress-v1`. Each saved record contains a `version` field. If the stored version does not match the current application version, progress is reset to defaults. Bump the version when changing the progress schema.

## Home Screen

The home page now shows three inline circles representing the number of completed sessions for the day. A button labeled with the exact week, day, and session starts the next session. Below the button is a short list of the upcoming module titles: Language, Math, and Knowledge.

guteek-codex/update-mathmodule-and-extend-tests
The math module's red dots are now styled entirely inline. Each dot uses `inline-block` positioning with explicit width, height, background color, and border radius so they remain visible even if Tailwind utilities are unavailable.


## Header

A fixed header at the top of every page displays the current week, day, and session along with a home icon link back to the main menu.

## Accessibility

Carousel navigation buttons now include descriptive ARIA labels and retain their focus outlines for improved keyboard navigation.

## Loading States

All screens now display a reusable skeleton placeholder while week data loads.
The skeleton uses an animated shimmer and sets `aria-busy="true"` for assistive
technology. If loading fails, an error message is displayed.

## Error Handling

When week data fails to load, a red banner appears below the header with the
HTTP status or message. The banner includes a **Retry** button that re-runs the
`loadWeek` request.

## License

Images used in the encyclopedia module are loaded from Unsplash using CC-licensed URLs.
