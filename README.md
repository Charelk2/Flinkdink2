# FlinkDink Flashcards

This project is a simple flashcard app for toddlers built with **React**, **Vite**, and **Tailwind CSS**. Content is organized in weekly JSON files and progress is saved locally.

## Development

Install dependencies (including the new `@tailwindcss/postcss` plugin) and start the dev server:

```bash
npm install
npm run dev
```

Tailwind CSS 4.x requires any files using `@apply` to be included in the
`content` array of `tailwind.config.js`. The configuration already references
`src/index.css`, so unknown utility class errors should not occur during
development.

Lint the code with ESLint:

```bash
npm run lint
```

Run the unit tests:

```bash
npm test
```

## Project Structure

- `src/contexts` – global `ContentProvider` that loads week data and tracks progress
- `src/modules` – individual learning modules (Language, Math, Encyclopedia)
- `src/screens` – page components for the router
- `public/weeks` – JSON data files per week

## Progress Storage

User progress is stored in `localStorage` under the key `progress-v1`. The app automatically advances sessions, days, and weeks.

## Home Screen

The home page now shows three inline circles representing the number of completed sessions for the day. A button labeled with the exact week, day, and session starts the next session. Below the button is a short list of the upcoming module titles: Language, Math, and Knowledge.

## Header

A fixed header at the top of every page displays the current week, day, and session along with a home icon link back to the main menu.

## Accessibility

Carousel navigation buttons now include descriptive ARIA labels and retain their focus outlines for improved keyboard navigation.

## Loading States

The session screen shows a skeleton placeholder while week data loads. If loading fails, an error message is displayed.

## License

Images used in the encyclopedia module are loaded from Unsplash using CC-licensed URLs.
