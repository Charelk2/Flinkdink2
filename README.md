# FlinkDink Flashcards

This project is a simple flashcard app for toddlers built with **React**, **Vite**, and **Tailwind CSS**. Content is organized in weekly JSON files and progress is saved locally.

## Development

Install dependencies (including the `@tailwindcss/postcss` plugin) and start the development server:

```bash
npm install
npm run dev
```

This launches a hot-reloading dev server so you can iterate quickly.

Tailwind CSS is processed with `@tailwindcss/postcss`. If you see a build error
about unknown utilities (for example `bg-orange-500`), make sure the plugin is
installed and listed in `postcss.config.js`. When a particular utility still
fails to apply, replace it with an equivalent CSS declaration inside a `@layer`
block.

You can modify default styles by editing `tailwind.config.cjs`. Add new colors
or font families under the `extend` section. Reusable custom classes should be
placed inside the `@layer components` block in `src/index.css`.

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

The top of the page includes a compact `NavBar` with a home icon on the left,
the **FlinkDink** title in the center and a `SettingsButton` on the right.

Below the navigation is the main content area. A `Hero` component displays the
headline and the current week/day. If multiple days are completed in a row a
small flame badge shows the streak count.

Progress for the day is visualized by the `ProgressStrip` which renders three
session dots. Underneath, `ThemeList` previews upcoming module titles such as
Language, Math and Knowledge.

A large `CTAButton` starts the next session. When past week one, an additional
button allows you to revisit the previous week's content.

The math module's red dots are now styled inline with explicit dimensions so
they remain visible even if Tailwind utilities are unavailable. Math slides use
a sliding window of ten numbers; starting on week two the first five appear in a
random order while the upper five stay sequential.


## Navigation

The application now uses a `NavBar` component on the home screen. It shows a back/home icon, a centered **FlinkDink** title, and a circular settings button. Other screens continue to display the progress header with week, day, and session information.

## Accessibility

Carousel navigation buttons now include descriptive ARIA labels and retain their focus outlines for improved keyboard navigation.

Finishing a session triggers a short confetti toast before returning to the home screen.

## Loading States

All screens now display a reusable skeleton placeholder while week data loads.
The skeleton uses an animated shimmer and sets `aria-busy="true"` for assistive
technology. If loading fails, an error message is displayed.


An optional `/dashboard` route is protected by a simple PIN entry form. It shows a 7-day progress grid where completed modules are highlighted in green, along with buttons to reset progress or print awards.


## Error Handling

When week data fails to load, a red banner appears below the header with the
HTTP status or message. The banner includes a **Retry** button that re-runs the
`loadWeek` request.

## License

Images used in the encyclopedia module are stored locally under `public/images`.
Each file is a small SVG placeholder so the app works without internet access.
