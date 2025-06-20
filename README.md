# FlinkDink Flashcards

This project is a simple flashcard app for toddlers built with **React**, **Vite**,
and **Tailwind CSS**. Content is organized in weekly JSON files and progress is
saved locally.

> **Heads up!** Tailwind v4 removes some classic utility classes such as `w-10`
> and `h-10`. If you see "unknown utility" errors during builds, use explicit CSS
> widths/heights or the new `size-*` utilities as shown below.

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

**Width/Height utilities**: Tailwind v4 removed some fixed width and height
classes like `w-10` and `h-10`. When upgrading you may see errors such as
`Cannot apply unknown utility class "w-10"`. Replace these with explicit CSS
properties (e.g. `width: 2.5rem; height: 2.5rem;`) or use the new `size-*`
utilities.

You can modify default styles by editing `tailwind.config.cjs`. Add new colors
or font families under the `extend` section. Reusable custom classes should be
placed inside the `@layer components` block in `src/index.css`.

Lint the code with ESLint:

```bash
npm run lint
```

Before running the tests make sure all dependencies are installed:

```bash
npm install
```

With everything installed you can run the Jest suite manually:

```bash
npm test
```

The `postinstall` script also invokes `npm test` automatically, so simply
running `npm install` will execute the suite in CI environments.

CI pipelines can also invoke `scripts/ci-test.sh` which installs
dependencies and runs the tests in one step.

The tests use **Jest** with **Supertest** and an in-memory SQLite database for
the API routes, while React components rely on **React Testing Library**.

## Project Structure

- `src/contexts` – global `ContentProvider` that loads week data and tracks progress
- `src/modules` – individual learning modules (Language, Math, Encyclopedia)
- `src/screens` – page components for the router
- `public/terms/term*/weeks` – JSON data files grouped by term. Each
  week file lives inside its term folder. Encyclopedia cards include a
  `query` field with an English search term used for fetching photos
- `src/utils/fetchWeek.js` – helper to fetch a week's JSON by number
- `src/utils/encyclopediaImages.js` – imports encyclopedia images using Vite's glob feature
 - Language words now display in a very large lowercase font so toddlers
   can easily read them

## Curriculum Files

Week data lives under `public/terms` as `termN/weeks/weekXXX.json` (e.g.
`terms/term1/weeks/week001.json`).
Each file defines three keys:

- `language` – array of 10 words for the Language module
- `mathWindowStart` – first number in the 10-number math window
- `encyclopedia` – array of fact objects with `id`, `title`, `query`, `fact` and `image`

The application loads weeks 1–46. When adding or removing weeks, update the
`TOTAL_WEEKS` constant in `src/contexts/ContentProvider.jsx`. Completing the
final week keeps progress locked at week 46 and logs **"Course Finished!"** in
the browser console.

Weeks are grouped into four terms of twelve weeks each. The helper
`getTermForWeek` in `src/utils/termHelpers.js` converts a week number to its
term, using the `WEEKS_PER_TERM` constant.

## Progress Storage

User progress is stored in `localStorage` under the key `progress-v1`. Each saved record contains a `version` field. If the stored version does not match the current application version, progress is reset to defaults. Bump the version when changing the progress schema.

## Home Screen

The top of the page includes a sticky `NavBar` with a centered **FlinkDink**
title and a circular settings button. When viewing a session, the bar shows a
home icon on the left so you can navigate back.

Below the navigation is the main content area. A `Hero` component displays a
static headline and tagline welcoming toddlers to the flashcards.

Progress for the day is visualized by the `ProgressStrip` which renders three
session dots. Underneath, `ThemeList` previews upcoming module titles such as
Language, Math and Knowledge.

A large `CTAButton` starts or continues the current session depending on your
progress.

The math module's red dots are styled inline with explicit dimensions so they
remain visible even if Tailwind utilities are unavailable. A tiny black number
is absolutely positioned in the slide's top-right corner (about 10&nbsp;px) so
it never shifts when the dot board is centered. The count indicates how many
dots appear on the current slide. Term&nbsp;1 now introduces numbers gradually:

- **Week&nbsp;1** – numbers 1–5 in order
- **Week&nbsp;2** – numbers 1–5 shuffled, followed by 6–10
- **Week&nbsp;3** – numbers 6–10 shuffled, followed by 11–15
- **Week&nbsp;4** – numbers 11–15 shuffled, followed by 16–20

- **Week&nbsp;5** – numbers 16–20 shuffled, followed by 21–25
- **Week&nbsp;6** – numbers 21–25 shuffled, followed by 26–30
- **Week&nbsp;7** – numbers 26–30 shuffled, followed by 31–35
- **Week&nbsp;8** – numbers 31–35 shuffled, followed by 36–40
- **Week&nbsp;9** – numbers 36–40 shuffled, followed by 41–45
- **Week&nbsp;10** – numbers 41–45 shuffled, followed by 46–50

Weeks&nbsp;11 onward continue sliding the window by five while keeping the lower half
randomized.

### Term 2 Week 1 Addition

Term&nbsp;2 continues math practice with short addition sums. Each day has
three sessions and the dot counter represents the numbers visually.

**Day&nbsp;1**
- Session&nbsp;1 – `1 + 2 = 3` (1 dot, 2 dots, 3 dots)
- Session&nbsp;2 – `9 + 3 = 12` (9 dots, 3 dots, 12 dots)
- Session&nbsp;3 – `4 + 3 = 7` (4 dots, 3 dots, 7 dots)

**Day&nbsp;2**
- Session&nbsp;1 – `2 + 3 = 5` (2 dots, 3 dots, 5 dots)
- Session&nbsp;2 – `6 + 9 = 15` (6 dots, 9 dots, 15 dots)
- Session&nbsp;3 – `4 + 10 = 14` (4 dots, 10 dots, 14 dots)

**Day&nbsp;3**
- Session&nbsp;1 – `8 + 9 = 17` (8 dots, 9 dots, 17 dots)
- Session&nbsp;2 – `19 + 1 = 20` (19 dots, 1 dot, 20 dots)
- Session&nbsp;3 – `7 + 4 = 11` (7 dots, 4 dots, 11 dots)

**Day&nbsp;4**
- Session&nbsp;1 – `14 + 5 = 19` (14 dots, 5 dots, 19 dots)
- Session&nbsp;2 – `4 + 2 = 6` (4 dots, 2 dots, 6 dots)
- Session&nbsp;3 – `9 + 9 = 18` (9 dots, 9 dots, 18 dots)

**Day&nbsp;5**
- Session&nbsp;1 – `3 + 4 = 7` (3 dots, 4 dots, 7 dots)
- Session&nbsp;2 – `5 + 5 = 10` (5 dots, 5 dots, 10 dots)
- Session&nbsp;3 – `8 + 1 = 9` (8 dots, 1 dot, 9 dots)

**Day&nbsp;6**
- Session&nbsp;1 – `7 + 6 = 13` (7 dots, 6 dots, 13 dots)
- Session&nbsp;2 – `3 + 3 = 6` (3 dots, 3 dots, 6 dots)
- Session&nbsp;3 – `15 + 4 = 19` (15 dots, 4 dots, 19 dots)

**Day&nbsp;7**
- Session&nbsp;1 – `10 + 10 = 20` (10 dots, 10 dots, 20 dots)
- Session&nbsp;2 – `8 + 5 = 13` (8 dots, 5 dots, 13 dots)
- Session&nbsp;3 – `6 + 9 = 15` (6 dots, 9 dots, 15 dots)


## Navigation

The application now uses a `NavBar` component on the home screen. It shows a back/home icon, a centered **FlinkDink** title, and a circular settings button. Other screens continue to display the progress header with week, day, and session information.
Clicking the settings button now opens a simple **Dashboard** route showing overall progress and reset options.
Parents can also jump to any of the 46 weeks from the Dashboard. Selecting a week now reveals a simple confirmation panel with **Continue** and **Cancel** buttons. The page automatically scrolls this panel into view so parents don't miss it on long lists. Choosing Continue jumps directly to the session while Cancel keeps you on the Dashboard. If you try to jump outside the available range, the app logs a warning in the browser console.
When unlocked, the Dashboard now shows a large progress header with your current week, day, session and streak. It reuses the same session dots as the home screen.
Daily modules are listed in a small table labelled **"Weekly progress"**, where completed cells appear green.

Below the table is a row of control buttons arranged with `flex` and `flex-wrap` so they stack neatly on narrow screens. Each button label now starts with a small emoji, for example **"🔄 Reset Today"** and **"🗑️ Reset All"**. Selecting **Reset All** opens a confirmation dialog before all progress is cleared.

## Accessibility

Carousel navigation buttons now include descriptive ARIA labels and retain their focus outlines for improved keyboard navigation.

Finishing a session triggers a short confetti toast before returning to the home screen. The animation respects the user's `prefers-reduced-motion` setting to reduce movement.

## Loading States

Most screens display a reusable skeleton placeholder while week data loads.
The skeleton uses an animated shimmer and sets `aria-busy="true"` for assistive technology. If loading fails, an error message is displayed.
Encyclopedia images are lazy loaded to keep initial renders snappy.


## Error Handling

When week data fails to load, a red banner appears below the header with the
HTTP status or message. The banner includes a **Retry** button that re-runs the
`loadWeek` request.

## Authentication

Run a small API server to handle login and registration requests:

```bash
npm run server
```

Create a `.env` file in the project root with the following variables:

```bash
PORT=3001
JWT_SECRET=your-secret
DB_PATH=./users.db
VITE_API_BASE_URL=http://localhost:3001
```



The default credentials are **demo@example.com** / **password**. You can also
register a new account using the **Sign Up** page. Successful authentication
returns a token stored in `localStorage` by the `AuthProvider`.
Access this context via the `useAuth` hook exported from
`src/contexts/authHelpers.js`.

During development the API server runs on `http://localhost:3001`, so the
`VITE_API_BASE_URL` variable should point there. For production builds set it to
the full URL of your deployed API server.
The frontend reads this value via the `__API_BASE_URL__` constant defined by Vite.

### Encyclopedia Images

Images for the encyclopedia module are stored locally under `src/assets/encyclopedia`.

The `src/utils/encyclopediaImages.js` module uses Vite's `import.meta.glob` with
`eager: true`, `query: '?url'` and `import: 'default'` to load every file in that
directory and build an object keyed by slug. React components can look up a
matching image by its slug without explicit import statements.

### Interpreting Server Logs
The server uses the `morgan` middleware in the `combined` format to log every
incoming HTTP request. Each line shows the method, URL, response status and
response time. In addition, the generic error handler prints any unexpected
errors. If something goes wrong you'll see a message in the console and the API
responds with JSON like `{ "detail": "Database error" }` along with the relevant
status code.

## Mobile Usage

FlinkDink is a Progressive Web App. You can add it to your home screen from the
browser share menu or package it as a native app using **Capacitor**.

Math practice screens now size their dot container responsively using
`h-[60vw] sm:h-[40vh]`. Dots are positioned with a new algorithm that retries
until each one is at least eight percent away from the others, preventing
overlap on small displays.
Red dots specify their width, height and color inline so builds without
Tailwind still display them correctly.
The Dashboard now uses a responsive week grid that shows seven columns on small
screens and thirteen on larger displays. Each week button has a subtle hover
state, and the active week appears in bold with `aria-current="true"` for
accessibility. The carousel height now uses `min-h-[50vh]` and login/signup
forms are `w-full max-w-xs` so they fit on narrow devices. The PIN input on the
Dashboard also uses these classes so it stretches across narrow screens without
exceeding `max-w-xs`.
The progress table now uses `table-fixed` so its seven columns fit within a
360&nbsp;px wide viewport, and the action buttons are arranged in a single-column
grid that expands to four columns on larger screens.
Encyclopedia images now use an `.encyclopedia-thumb` class with
`aspect-ratio: 16 / 9` so photos scale consistently on mobile devices. This
matches the 640×360 smart-crop returned by `/api/photos`. A `zoom-img` class
adds a gentle scale animation on hover starting at the `md` breakpoint,
leaving touch devices unaffected.

Full-screen areas leverage viewport units so layouts adapt to device height.
The math board scales with the viewport width while carousels always take up at
least half of the viewport height. Week buttons switch between seven and
thirteen columns depending on the viewport width. Dots will never overlap
because positions are regenerated until the minimum eight percent spacing is
met.

**Small screen layout**: On a 360 px wide phone the Dashboard displays two
short rows of seven week buttons with progress info below. The math practice
screen shows four non-overlapping dots inside a square area roughly 60 % of the
viewport width. Forms and buttons stretch across the width but remain capped at
`max-w-xs`. These layouts were verified with browser device emulation to ensure
no horizontal scrolling occurs.

### Build for Android or iOS

Install Capacitor and sync the project:

```bash
npm install
npm run build
npx cap sync
```

Before building the native projects, make sure a `.env` file exists in the
project root so both the frontend and API server share the correct values:

```bash
PORT=3001
JWT_SECRET=your-secret
DB_PATH=./users.db
VITE_API_BASE_URL=https://your-server.com
```

Whenever you change these variables run `npx cap sync` again so Capacitor copies
them into the platform folders.

Open the project in Android Studio or Xcode:

```bash
npx cap open android
npx cap open ios
```

From there you can build and publish the app to the Play Store or App Store. For
release builds remember to configure signing keys:

- **Android** – create a keystore and reference it from
  `android/gradle.properties` or `signing.properties`.
- **iOS** – add your certificates and provisioning profiles in Xcode.

The backend requires a Node.js environment with SQLite support. Deploy
`server.js` to a Node host (such as Railway or a small VPS) and ensure the
database file is writable. Update `VITE_API_BASE_URL` in your `.env` to point to
the deployed server.

## License

Images used in the encyclopedia module are stored locally under `src/assets/encyclopedia`.
Each file is a small SVG placeholder so the app works without internet access.
