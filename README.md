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

Counting practice stops here. Starting with Week&nbsp;13, the Math module shows
only short addition sums.

### Term 2 Week 1 Addition

Term&nbsp;2 continues math practice with short addition sums. Each day has
three sessions and the dot counter represents the numbers visually. During the
Math module the dots appear across three slides: first the initial number, then
the second number, and finally the total.


The sum slides now display at the end of the Math module so there are still
only three learning modules each day. The dot boards let toddlers count each
number before seeing the answer.
For example, the sum `1 + 2 = 3` is rendered as a row of dot boards:
one dot, two dots, then three dots for the answer. This visual layout helps
kids match each numeral to a tangible count.

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

### Term 2 Week 2 Addition

**Day&nbsp;1**
- Session&nbsp;1 – `2 + 5 = 7` (2 dots, 5 dots, 7 dots)
- Session&nbsp;2 – `20 + 3 = 23` (20 dots, 3 dots, 23 dots)
- Session&nbsp;3 – `2 + 1 = 3` (2 dots, 1 dot, 3 dots)

**Day&nbsp;2**
- Session&nbsp;1 – `8 + 1 = 9` (8 dots, 1 dot, 9 dots)
- Session&nbsp;2 – `19 + 2 = 21` (19 dots, 2 dots, 21 dots)
- Session&nbsp;3 – `18 + 6 = 24` (18 dots, 6 dots, 24 dots)

**Day&nbsp;3**
- Session&nbsp;1 – `3 + 8 = 11` (3 dots, 8 dots, 11 dots)
- Session&nbsp;2 – `5 + 10 = 15` (5 dots, 10 dots, 15 dots)
- Session&nbsp;3 – `4 + 4 = 8` (4 dots, 4 dots, 8 dots)

**Day&nbsp;4**
- Session&nbsp;1 – `12 + 5 = 17` (12 dots, 5 dots, 17 dots)
- Session&nbsp;2 – `9 + 4 = 13` (9 dots, 4 dots, 13 dots)
- Session&nbsp;3 – `2 + 2 = 4` (2 dots, 2 dots, 4 dots)

**Day&nbsp;5**
- Session&nbsp;1 – `6 + 2 = 8` (6 dots, 2 dots, 8 dots)
- Session&nbsp;2 – `13 + 5 = 18` (13 dots, 5 dots, 18 dots)
- Session&nbsp;3 – `24 + 1 = 25` (24 dots, 1 dot, 25 dots)

**Day&nbsp;6**
- Session&nbsp;1 – `7 + 6 = 13` (7 dots, 6 dots, 13 dots)
- Session&nbsp;2 – `3 + 3 = 6` (3 dots, 3 dots, 6 dots)
- Session&nbsp;3 – `15 + 4 = 19` (15 dots, 4 dots, 19 dots)

**Day&nbsp;7**
- Session&nbsp;1 – `10 + 10 = 20` (10 dots, 10 dots, 20 dots)
- Session&nbsp;2 – `8 + 5 = 13` (8 dots, 5 dots, 13 dots)
- Session&nbsp;3 – `6 + 9 = 15` (6 dots, 9 dots, 15 dots)

### Term 2 Week 3 Addition

**Day&nbsp;1**
- Session&nbsp;1 – `3 + 3 = 6` (3 dots, 3 dots, 6 dots)
- Session&nbsp;2 – `2 + 5 = 7` (2 dots, 5 dots, 7 dots)
- Session&nbsp;3 – `7 + 9 = 16` (7 dots, 9 dots, 16 dots)

**Day&nbsp;2**
- Session&nbsp;1 – `20 + 10 = 30` (20 dots, 10 dots, 30 dots)
- Session&nbsp;2 – `4 + 19 = 23` (4 dots, 19 dots, 23 dots)
- Session&nbsp;3 – `19 + 3 = 22` (19 dots, 3 dots, 22 dots)

**Day&nbsp;3**
- Session&nbsp;1 – `15 + 14 = 29` (15 dots, 14 dots, 29 dots)
- Session&nbsp;2 – `16 + 10 = 26` (16 dots, 10 dots, 26 dots)
- Session&nbsp;3 – `6 + 4 = 10` (6 dots, 4 dots, 10 dots)

**Day&nbsp;4**
- Session&nbsp;1 – `14 + 14 = 28` (14 dots, 14 dots, 28 dots)
- Session&nbsp;2 – `1 + 1 = 2` (1 dot, 1 dot, 2 dots)
- Session&nbsp;3 – `15 + 5 = 20` (15 dots, 5 dots, 20 dots)

**Day&nbsp;5**
- Session&nbsp;1 – `14 + 3 = 17` (14 dots, 3 dots, 17 dots)
- Session&nbsp;2 – `13 + 14 = 27` (13 dots, 14 dots, 27 dots)
- Session&nbsp;3 – `10 + 1 = 11` (10 dots, 1 dot, 11 dots)

**Day&nbsp;6**
- Session&nbsp;1 – `8 + 7 = 15` (8 dots, 7 dots, 15 dots)
- Session&nbsp;2 – `9 + 12 = 21` (9 dots, 12 dots, 21 dots)
- Session&nbsp;3 – `11 + 6 = 17` (11 dots, 6 dots, 17 dots)

**Day&nbsp;7**
- Session&nbsp;1 – `18 + 2 = 20` (18 dots, 2 dots, 20 dots)
- Session&nbsp;2 – `5 + 15 = 20` (5 dots, 15 dots, 20 dots)
- Session&nbsp;3 – `4 + 11 = 15` (4 dots, 11 dots, 15 dots)

### Term 2 Week 4 Addition

**Day&nbsp;1**
- Session&nbsp;1 – `11 + 2 = 13` (11 dots, 2 dots, 13 dots)
- Session&nbsp;2 – `2 + 13 = 15` (2 dots, 13 dots, 15 dots)
- Session&nbsp;3 – `18 + 11 = 29` (18 dots, 11 dots, 29 dots)

**Day&nbsp;2**
- Session&nbsp;1 – `19 + 13 = 32` (19 dots, 13 dots, 32 dots)
- Session&nbsp;2 – `16 + 9 = 25` (16 dots, 9 dots, 25 dots)
- Session&nbsp;3 – `9 + 24 = 33` (9 dots, 24 dots, 33 dots)

**Day&nbsp;3**
- Session&nbsp;1 – `30 + 5 = 35` (30 dots, 5 dots, 35 dots)
- Session&nbsp;2 – `2 + 10 = 12` (2 dots, 10 dots, 12 dots)
- Session&nbsp;3 – `17 + 14 = 31` (17 dots, 14 dots, 31 dots)

**Day&nbsp;4**
- Session&nbsp;1 – `1 + 27 = 28` (1 dot, 27 dots, 28 dots)
- Session&nbsp;2 – `3 + 10 = 13` (3 dots, 10 dots, 13 dots)
- Session&nbsp;3 – `16 + 5 = 21` (16 dots, 5 dots, 21 dots)

**Day&nbsp;5**
- Session&nbsp;1 – `4 + 3 = 7` (4 dots, 3 dots, 7 dots)
- Session&nbsp;2 – `15 + 17 = 32` (15 dots, 17 dots, 32 dots)
- Session&nbsp;3 – `18 + 6 = 24` (18 dots, 6 dots, 24 dots)

**Day&nbsp;6**
- Session&nbsp;1 – `12 + 9 = 21` (12 dots, 9 dots, 21 dots)
- Session&nbsp;2 – `25 + 4 = 29` (25 dots, 4 dots, 29 dots)
- Session&nbsp;3 – `7 + 8 = 15` (7 dots, 8 dots, 15 dots)

**Day&nbsp;7**
- Session&nbsp;1 – `14 + 16 = 30` (14 dots, 16 dots, 30 dots)
- Session&nbsp;2 – `6 + 13 = 19` (6 dots, 13 dots, 19 dots)
- Session&nbsp;3 – `20 + 7 = 27` (20 dots, 7 dots, 27 dots)

### Term 2 Week 5 Addition

**Day&nbsp;1**
- Session&nbsp;1 – `1 + 2 = 3` (1 dot, 2 dots, 3 dots)
- Session&nbsp;2 – `12 + 3 = 15` (12 dots, 3 dots, 15 dots)
- Session&nbsp;3 – `35 + 5 = 40` (35 dots, 5 dots, 40 dots)

**Day&nbsp;2**
- Session&nbsp;1 – `17 + 5 = 22` (17 dots, 5 dots, 22 dots)
- Session&nbsp;2 – `6 + 19 = 25` (6 dots, 19 dots, 25 dots)
- Session&nbsp;3 – `20 + 10 = 30` (20 dots, 10 dots, 30 dots)

**Day&nbsp;3**
- Session&nbsp;1 – `23 + 16 = 39` (23 dots, 16 dots, 39 dots)
- Session&nbsp;2 – `14 + 20 = 34` (14 dots, 20 dots, 34 dots)
- Session&nbsp;3 – `7 + 3 = 10` (7 dots, 3 dots, 10 dots)

**Day&nbsp;4**
- Session&nbsp;1 – `24 + 5 = 29` (24 dots, 5 dots, 29 dots)
- Session&nbsp;2 – `19 + 9 = 28` (19 dots, 9 dots, 28 dots)
- Session&nbsp;3 – `15 + 20 = 35` (15 dots, 20 dots, 35 dots)

**Day&nbsp;5**
- Session&nbsp;1 – `4 + 12 = 16` (4 dots, 12 dots, 16 dots)
- Session&nbsp;2 – `3 + 2 = 5` (3 dots, 2 dots, 5 dots)
- Session&nbsp;3 – `18 + 19 = 37` (18 dots, 19 dots, 37 dots)

**Day&nbsp;6**
- Session&nbsp;1 – `8 + 11 = 19` (8 dots, 11 dots, 19 dots)
- Session&nbsp;2 – `22 + 6 = 28` (22 dots, 6 dots, 28 dots)
- Session&nbsp;3 – `5 + 25 = 30` (5 dots, 25 dots, 30 dots)

**Day&nbsp;7**
- Session&nbsp;1 – `10 + 14 = 24` (10 dots, 14 dots, 24 dots)
- Session&nbsp;2 – `16 + 7 = 23` (16 dots, 7 dots, 23 dots)
- Session&nbsp;3 – `9 + 27 = 36` (9 dots, 27 dots, 36 dots)

### Term 2 Week 6 Addition

**Day&nbsp;1**
- Session&nbsp;1 – `11 + 12 = 23` (11 dots, 12 dots, 23 dots)
- Session&nbsp;2 – `16 + 13 = 29` (16 dots, 13 dots, 29 dots)
- Session&nbsp;3 – `40 + 4 = 44` (40 dots, 4 dots, 44 dots)

**Day&nbsp;2**
- Session&nbsp;1 – `2 + 6 = 8` (2 dots, 6 dots, 8 dots)
- Session&nbsp;2 – `5 + 9 = 14` (5 dots, 9 dots, 14 dots)
- Session&nbsp;3 – `41 + 1 = 42` (41 dots, 1 dot, 42 dots)

**Day&nbsp;3**
- Session&nbsp;1 – `20 + 23 = 43` (20 dots, 23 dots, 43 dots)
- Session&nbsp;2 – `4 + 4 = 8` (4 dots, 4 dots, 8 dots)
- Session&nbsp;3 – `17 + 2 = 19` (17 dots, 2 dots, 19 dots)

**Day&nbsp;4**
- Session&nbsp;1 – `4 + 5 = 9` (4 dots, 5 dots, 9 dots)
- Session&nbsp;2 – `6 + 6 = 12` (6 dots, 6 dots, 12 dots)
- Session&nbsp;3 – `2 + 5 = 7` (2 dots, 5 dots, 7 dots)

**Day&nbsp;5**
- Session&nbsp;1 – `15 + 30 = 45` (15 dots, 30 dots, 45 dots)
- Session&nbsp;2 – `23 + 14 = 37` (23 dots, 14 dots, 37 dots)
- Session&nbsp;3 – `9 + 19 = 28` (9 dots, 19 dots, 28 dots)

**Day&nbsp;6**
- Session&nbsp;1 – `12 + 18 = 30` (12 dots, 18 dots, 30 dots)
- Session&nbsp;2 – `25 + 5 = 30` (25 dots, 5 dots, 30 dots)
- Session&nbsp;3 – `3 + 32 = 35` (3 dots, 32 dots, 35 dots)

**Day&nbsp;7**
- Session&nbsp;1 – `8 + 27 = 35` (8 dots, 27 dots, 35 dots)
- Session&nbsp;2 – `22 + 9 = 31` (22 dots, 9 dots, 31 dots)
- Session&nbsp;3 – `13 + 17 = 30` (13 dots, 17 dots, 30 dots)

### Term 2 Week 7 Subtraction

**Day&nbsp;1**
- Session&nbsp;1 – `2 - 1 = 1` (2 dots, minus 1 dot, 1 dot)
- Session&nbsp;2 – `25 - 20 = 5` (25 dots, minus 20 dots, 5 dots)
- Session&nbsp;3 – `18 - 9 = 9` (18 dots, minus 9 dots, 9 dots)

**Day&nbsp;2**
- Session&nbsp;1 – `14 - 4 = 10` (14 dots, minus 4 dots, 10 dots)
- Session&nbsp;2 – `9 - 8 = 1` (9 dots, minus 8 dots, 1 dot)
- Session&nbsp;3 – `29 - 22 = 7` (29 dots, minus 22 dots, 7 dots)

**Day&nbsp;3**
- Session&nbsp;1 – `28 - 17 = 11` (28 dots, minus 17 dots, 11 dots)
- Session&nbsp;2 – `14 - 10 = 4` (14 dots, minus 10 dots, 4 dots)
- Session&nbsp;3 – `17 - 4 = 13` (17 dots, minus 4 dots, 13 dots)

**Day&nbsp;4**
- Session&nbsp;1 – `24 - 5 = 19` (24 dots, minus 5 dots, 19 dots)
- Session&nbsp;2 – `19 - 10 = 9` (19 dots, minus 10 dots, 9 dots)
- Session&nbsp;3 – `15 - 5 = 10` (15 dots, minus 5 dots, 10 dots)

**Day&nbsp;5**
- Session&nbsp;1 – `14 - 2 = 12` (14 dots, minus 2 dots, 12 dots)
- Session&nbsp;2 – `5 - 2 = 3` (5 dots, minus 2 dots, 3 dots)
- Session&nbsp;3 – `18 - 1 = 17` (18 dots, minus 1 dot, 17 dots)

**Day&nbsp;6**
- Session&nbsp;1 – `30 - 12 = 18` (30 dots, minus 12 dots, 18 dots)
- Session&nbsp;2 – `27 - 20 = 7` (27 dots, minus 20 dots, 7 dots)
- Session&nbsp;3 – `21 - 6 = 15` (21 dots, minus 6 dots, 15 dots)

**Day&nbsp;7**
- Session&nbsp;1 – `40 - 25 = 15` (40 dots, minus 25 dots, 15 dots)
- Session&nbsp;2 – `33 - 30 = 3` (33 dots, minus 30 dots, 3 dots)
- Session&nbsp;3 – `22 - 11 = 11` (22 dots, minus 11 dots, 11 dots)

### Term 2 Week 8 Subtraction

**Day&nbsp;1**
- Session&nbsp;1 – `42 - 2 = 40` (42 dots, minus 2 dots, 40 dots)
- Session&nbsp;2 – `35 - 22 = 13` (35 dots, minus 22 dots, 13 dots)
- Session&nbsp;3 – `38 - 9 = 29` (38 dots, minus 9 dots, 29 dots)

**Day&nbsp;2**
- Session&nbsp;1 – `50 - 20 = 30` (50 dots, minus 20 dots, 30 dots)
- Session&nbsp;2 – `49 - 8 = 41` (49 dots, minus 8 dots, 41 dots)
- Session&nbsp;3 – `30 - 22 = 8` (30 dots, minus 22 dots, 8 dots)

**Day&nbsp;3**
- Session&nbsp;1 – `28 - 5 = 23` (28 dots, minus 5 dots, 23 dots)
- Session&nbsp;2 – `24 - 13 = 11` (24 dots, minus 13 dots, 11 dots)
- Session&nbsp;3 – `17 - 8 = 9` (17 dots, minus 8 dots, 9 dots)

**Day&nbsp;4**
- Session&nbsp;1 – `44 - 5 = 39` (44 dots, minus 5 dots, 39 dots)
- Session&nbsp;2 – `8 - 2 = 6` (8 dots, minus 2 dots, 6 dots)
- Session&nbsp;3 – `7 - 2 = 5` (7 dots, minus 2 dots, 5 dots)

**Day&nbsp;5**
- Session&nbsp;1 – `34 - 12 = 22` (34 dots, minus 12 dots, 22 dots)
- Session&nbsp;2 – `6 - 3 = 3` (6 dots, minus 3 dots, 3 dots)
- Session&nbsp;3 – `37 - 11 = 26` (37 dots, minus 11 dots, 26 dots)

**Day&nbsp;6**
- Session&nbsp;1 – `41 - 15 = 26` (41 dots, minus 15 dots, 26 dots)
- Session&nbsp;2 – `32 - 14 = 18` (32 dots, minus 14 dots, 18 dots)
- Session&nbsp;3 – `29 - 9 = 20` (29 dots, minus 9 dots, 20 dots)

**Day&nbsp;7**
- Session&nbsp;1 – `48 - 24 = 24` (48 dots, minus 24 dots, 24 dots)
- Session&nbsp;2 – `27 - 6 = 21` (27 dots, minus 6 dots, 21 dots)
- Session&nbsp;3 – `33 - 18 = 15` (33 dots, minus 18 dots, 15 dots)

### Term 2 Week 9 Subtraction

**Day&nbsp;1**
- Session&nbsp;1 – `45 - 5 = 40` (45 dots, minus 5 dots, 40 dots)
- Session&nbsp;2 – `26 - 3 = 23` (26 dots, minus 3 dots, 23 dots)
- Session&nbsp;3 – `17 - 16 = 1` (17 dots, minus 16 dots, 1 dot)

**Day&nbsp;2**
- Session&nbsp;1 – `49 - 19 = 30` (49 dots, minus 19 dots, 30 dots)
- Session&nbsp;2 – `38 - 28 = 10` (38 dots, minus 28 dots, 10 dots)
- Session&nbsp;3 – `11 - 8 = 3` (11 dots, minus 8 dots, 3 dots)

**Day&nbsp;3**
- Session&nbsp;1 – `22 - 21 = 1` (22 dots, minus 21 dots, 1 dot)
- Session&nbsp;2 – `33 - 17 = 16` (33 dots, minus 17 dots, 16 dots)
- Session&nbsp;3 – `29 - 8 = 21` (29 dots, minus 8 dots, 21 dots)

**Day&nbsp;4**
- Session&nbsp;1 – `44 - 4 = 40` (44 dots, minus 4 dots, 40 dots)
- Session&nbsp;2 – `45 - 22 = 23` (45 dots, minus 22 dots, 23 dots)
- Session&nbsp;3 – `41 - 10 = 31` (41 dots, minus 10 dots, 31 dots)

**Day&nbsp;5**
- Session&nbsp;1 – `28 - 19 = 9` (28 dots, minus 19 dots, 9 dots)
- Session&nbsp;2 – `49 - 22 = 27` (49 dots, minus 22 dots, 27 dots)
- Session&nbsp;3 – `33 - 30 = 3` (33 dots, minus 30 dots, 3 dots)

**Day&nbsp;6**
- Session&nbsp;1 – `11 - 2 = 9` (11 dots, minus 2 dots, 9 dots)
- Session&nbsp;2 – `13 - 5 = 8` (13 dots, minus 5 dots, 8 dots)
- Session&nbsp;3 – `39 - 14 = 25` (39 dots, minus 14 dots, 25 dots)

**Day&nbsp;7**
- Session&nbsp;1 – `32 - 15 = 17` (32 dots, minus 15 dots, 17 dots)
- Session&nbsp;2 – `28 - 9 = 19` (28 dots, minus 9 dots, 19 dots)
- Session&nbsp;3 – `43 - 2 = 41` (43 dots, minus 2 dots, 41 dots)

### Term 2 Week 10 Subtraction

**Day&nbsp;1**
- Session&nbsp;1 – `44 - 17 = 27` (44 dots, minus 17 dots, 27 dots)
- Session&nbsp;2 – `33 - 12 = 21` (33 dots, minus 12 dots, 21 dots)
- Session&nbsp;3 – `43 - 2 = 41` (43 dots, minus 2 dots, 41 dots)

**Day&nbsp;2**
- Session&nbsp;1 – `28 - 15 = 13` (28 dots, minus 15 dots, 13 dots)
- Session&nbsp;2 – `16 - 8 = 8` (16 dots, minus 8 dots, 8 dots)
- Session&nbsp;3 – `27 - 3 = 24` (27 dots, minus 3 dots, 24 dots)

**Day&nbsp;3**
- Session&nbsp;1 – `50 - 25 = 25` (50 dots, minus 25 dots, 25 dots)
- Session&nbsp;2 – `38 - 19 = 19` (38 dots, minus 19 dots, 19 dots)
- Session&nbsp;3 – `36 - 6 = 30` (36 dots, minus 6 dots, 30 dots)

**Day&nbsp;4**
- Session&nbsp;1 – `40 - 18 = 22` (40 dots, minus 18 dots, 22 dots)
- Session&nbsp;2 – `29 - 11 = 18` (29 dots, minus 11 dots, 18 dots)
- Session&nbsp;3 – `35 - 5 = 30` (35 dots, minus 5 dots, 30 dots)

**Day&nbsp;5**
- Session&nbsp;1 – `47 - 23 = 24` (47 dots, minus 23 dots, 24 dots)
- Session&nbsp;2 – `31 - 14 = 17` (31 dots, minus 14 dots, 17 dots)
- Session&nbsp;3 – `26 - 4 = 22` (26 dots, minus 4 dots, 22 dots)

**Day&nbsp;6**
- Session&nbsp;1 – `24 - 7 = 17` (24 dots, minus 7 dots, 17 dots)
- Session&nbsp;2 – `19 - 9 = 10` (19 dots, minus 9 dots, 10 dots)
- Session&nbsp;3 – `37 - 18 = 19` (37 dots, minus 18 dots, 19 dots)

**Day&nbsp;7**
- Session&nbsp;1 – `30 - 12 = 18` (30 dots, minus 12 dots, 18 dots)
- Session&nbsp;2 – `28 - 13 = 15` (28 dots, minus 13 dots, 15 dots)
- Session&nbsp;3 – `22 - 6 = 16` (22 dots, minus 6 dots, 16 dots)

### Term 3 Week 1 Addition & Subtraction

**Day&nbsp;1**
- Session&nbsp;1 – `25 - 9 = 16` (25 dots, minus 9 dots, 16 dots)
- Session&nbsp;2 – `4 + 37 = 41` (4 dots, 37 dots, 41 dots)
- Session&nbsp;3 – `25 - 8 = 17` (25 dots, minus 8 dots, 17 dots)

**Day&nbsp;2**
- Session&nbsp;1 – `42 + 3 = 45` (42 dots, 3 dots, 45 dots)
- Session&nbsp;2 – `47 - 18 = 29` (47 dots, minus 18 dots, 29 dots)
- Session&nbsp;3 – `23 + 6 = 29` (23 dots, 6 dots, 29 dots)

**Day&nbsp;3**
- Session&nbsp;1 – `49 - 11 = 38` (49 dots, minus 11 dots, 38 dots)
- Session&nbsp;2 – `16 + 8 = 24` (16 dots, 8 dots, 24 dots)
- Session&nbsp;3 – `35 - 26 = 9` (35 dots, minus 26 dots, 9 dots)

**Day&nbsp;4**
- Session&nbsp;1 – `27 + 18 = 45` (27 dots, 18 dots, 45 dots)
- Session&nbsp;2 – `40 + 8 = 48` (40 dots, 8 dots, 48 dots)
- Session&nbsp;3 – `14 + 0 = 14` (14 dots, 0 dots, 14 dots)

**Day&nbsp;5**
- Session&nbsp;1 – `24 - 19 = 5` (24 dots, minus 19 dots, 5 dots)
- Session&nbsp;2 – `27 - 16 = 11` (27 dots, minus 16 dots, 11 dots)
- Session&nbsp;3 – `34 - 6 = 28` (34 dots, minus 6 dots, 28 dots)

**Day&nbsp;6**
- Session&nbsp;1 – `31 + 6 = 37` (31 dots, 6 dots, 37 dots)
- Session&nbsp;2 – `50 - 25 = 25` (50 dots, minus 25 dots, 25 dots)
- Session&nbsp;3 – `22 + 5 = 27` (22 dots, 5 dots, 27 dots)

**Day&nbsp;7**
- Session&nbsp;1 – `45 - 15 = 30` (45 dots, minus 15 dots, 30 dots)
- Session&nbsp;2 – `12 + 17 = 29` (12 dots, 17 dots, 29 dots)
- Session&nbsp;3 – `33 - 14 = 19` (33 dots, minus 14 dots, 19 dots)

### Term 3 Week 2 Addition & Subtraction

**Day&nbsp;1**
- Session&nbsp;1 – `14 - 9 = 5` (14 dots, minus 9 dots, 5 dots)
- Session&nbsp;2 – `19 + 6 = 25` (19 dots, 6 dots, 25 dots)
- Session&nbsp;3 – `50 - 7 = 43` (50 dots, minus 7 dots, 43 dots)

**Day&nbsp;2**
- Session&nbsp;1 – `16 + 3 = 19` (16 dots, 3 dots, 19 dots)
- Session&nbsp;2 – `20 - 8 = 12` (20 dots, minus 8 dots, 12 dots)
- Session&nbsp;3 – `40 + 9 = 49` (40 dots, 9 dots, 49 dots)

**Day&nbsp;3**
- Session&nbsp;1 – `15 - 7 = 8` (15 dots, minus 7 dots, 8 dots)
- Session&nbsp;2 – `10 + 1 = 11` (10 dots, 1 dot, 11 dots)
- Session&nbsp;3 – `35 - 15 = 20` (35 dots, minus 15 dots, 20 dots)

**Day&nbsp;4**
- Session&nbsp;1 – `16 + 6 = 22` (16 dots, 6 dots, 22 dots)
- Session&nbsp;2 – `27 + 14 = 41` (27 dots, 14 dots, 41 dots)
- Session&nbsp;3 – `30 + 5 = 35` (30 dots, 5 dots, 35 dots)

**Day&nbsp;5**
- Session&nbsp;1 – `34 - 4 = 30` (34 dots, minus 4 dots, 30 dots)
- Session&nbsp;2 – `25 - 7 = 18` (25 dots, minus 7 dots, 18 dots)
- Session&nbsp;3 – `33 + 3 = 36` (33 dots, 3 dots, 36 dots)

**Day&nbsp;6**
- Session&nbsp;1 – `18 + 12 = 30` (18 dots, 12 dots, 30 dots)
- Session&nbsp;2 – `41 - 19 = 22` (41 dots, minus 19 dots, 22 dots)
- Session&nbsp;3 – `26 + 8 = 34` (26 dots, 8 dots, 34 dots)

**Day&nbsp;7**
- Session&nbsp;1 – `45 - 23 = 22` (45 dots, minus 23 dots, 22 dots)
- Session&nbsp;2 – `14 + 9 = 23` (14 dots, 9 dots, 23 dots)
- Session&nbsp;3 – `38 - 17 = 21` (38 dots, minus 17 dots, 21 dots)

### Term 3 Week 3 Multiplication

**Day&nbsp;1**
- Session&nbsp;1 – `1 × 2 = 2` (1 dot, 2 dots, 2 dots)
- Session&nbsp;2 – `6 × 8 = 48` (6 dots, 8 dots, 48 dots)
- Session&nbsp;3 – `3 × 8 = 24` (3 dots, 8 dots, 24 dots)

**Day&nbsp;2**
- Session&nbsp;1 – `7 × 4 = 28` (7 dots, 4 dots, 28 dots)
- Session&nbsp;2 – `9 × 1 = 9` (9 dots, 1 dot, 9 dots)
- Session&nbsp;3 – `2 × 6 = 12` (2 dots, 6 dots, 12 dots)

**Day&nbsp;3**
- Session&nbsp;1 – `5 × 7 = 35` (5 dots, 7 dots, 35 dots)
- Session&nbsp;2 – `4 × 4 = 16` (4 dots, 4 dots, 16 dots)
- Session&nbsp;3 – `9 × 5 = 45` (9 dots, 5 dots, 45 dots)

**Day&nbsp;4**
- Session&nbsp;1 – `3 × 2 = 6` (3 dots, 2 dots, 6 dots)
- Session&nbsp;2 – `5 × 2 = 10` (5 dots, 2 dots, 10 dots)
- Session&nbsp;3 – `8 × 1 = 8` (8 dots, 1 dot, 8 dots)

**Day&nbsp;5**
- Session&nbsp;1 – `6 × 7 = 42` (6 dots, 7 dots, 42 dots)
- Session&nbsp;2 – `12 × 3 = 36` (12 dots, 3 dots, 36 dots)
- Session&nbsp;3 – `5 × 6 = 30` (5 dots, 6 dots, 30 dots)

**Day&nbsp;6**
- Session&nbsp;1 – `2 × 9 = 18` (2 dots, 9 dots, 18 dots)
- Session&nbsp;2 – `5 × 6 = 30` (5 dots, 6 dots, 30 dots)
- Session&nbsp;3 – `4 × 8 = 32` (4 dots, 8 dots, 32 dots)

**Day&nbsp;7**
- Session&nbsp;1 – `7 × 2 = 14` (7 dots, 2 dots, 14 dots)
- Session&nbsp;2 – `9 × 4 = 36` (9 dots, 4 dots, 36 dots)
- Session&nbsp;3 – `6 × 3 = 18` (6 dots, 3 dots, 18 dots)

### Term 3 Week 4 Multiplication

**Day&nbsp;1**
- Session&nbsp;1 – `6 × 3 = 18` (6 dots, 3 dots, 18 dots)
- Session&nbsp;2 – `10 × 5 = 50` (10 dots, 5 dots, 50 dots)
- Session&nbsp;3 – `2 × 3 = 6` (2 dots, 3 dots, 6 dots)

**Day&nbsp;2**
- Session&nbsp;1 – `8 × 4 = 32` (8 dots, 4 dots, 32 dots)
- Session&nbsp;2 – `3 × 4 = 12` (3 dots, 4 dots, 12 dots)
- Session&nbsp;3 – `8 × 5 = 40` (8 dots, 5 dots, 40 dots)

**Day&nbsp;3**
- Session&nbsp;1 – `9 × 3 = 27` (9 dots, 3 dots, 27 dots)
- Session&nbsp;2 – `7 × 7 = 49` (7 dots, 7 dots, 49 dots)
- Session&nbsp;3 – `7 × 6 = 42` (7 dots, 6 dots, 42 dots)

**Day&nbsp;4**
- Session&nbsp;1 – `4 × 7 = 28` (4 dots, 7 dots, 28 dots)
- Session&nbsp;2 – `1 × 4 = 4` (1 dot, 4 dots, 4 dots)
- Session&nbsp;3 – `3 × 7 = 21` (3 dots, 7 dots, 21 dots)

**Day&nbsp;5**
- Session&nbsp;1 – `6 × 6 = 36` (6 dots, 6 dots, 36 dots)
- Session&nbsp;2 – `4 × 8 = 32` (4 dots, 8 dots, 32 dots)
- Session&nbsp;3 – `5 × 5 = 25` (5 dots, 5 dots, 25 dots)

**Day&nbsp;6**
- Session&nbsp;1 – `2 × 8 = 16` (2 dots, 8 dots, 16 dots)
- Session&nbsp;2 – `9 × 4 = 36` (9 dots, 4 dots, 36 dots)
- Session&nbsp;3 – `6 × 5 = 30` (6 dots, 5 dots, 30 dots)

**Day&nbsp;7**
- Session&nbsp;1 – `11 × 2 = 22` (11 dots, 2 dots, 22 dots)
- Session&nbsp;2 – `4 × 9 = 36` (4 dots, 9 dots, 36 dots)
- Session&nbsp;3 – `6 × 7 = 42` (6 dots, 7 dots, 42 dots)

### Term 3 Week 5 Multiplication

**Day&nbsp;1**
- Session&nbsp;1 – `7 × 3 = 21` (7 dots, 3 dots, 21 dots)
- Session&nbsp;2 – `1 × 8 = 8` (1 dot, 8 dots, 8 dots)
- Session&nbsp;3 – `5 × 4 = 20` (5 dots, 4 dots, 20 dots)

**Day&nbsp;2**
- Session&nbsp;1 – `9 × 2 = 18` (9 dots, 2 dots, 18 dots)
- Session&nbsp;2 – `2 × 7 = 14` (2 dots, 7 dots, 14 dots)
- Session&nbsp;3 – `6 × 5 = 30` (6 dots, 5 dots, 30 dots)

**Day&nbsp;3**
- Session&nbsp;1 – `11 × 2 = 22` (11 dots, 2 dots, 22 dots)
- Session&nbsp;2 – `4 × 3 = 12` (4 dots, 3 dots, 12 dots)
- Session&nbsp;3 – `7 × 7 = 49` (7 dots, 7 dots, 49 dots)

**Day&nbsp;4**
- Session&nbsp;1 – `20 × 2 = 40` (20 dots, 2 dots, 40 dots)
- Session&nbsp;2 – `13 × 3 = 39` (13 dots, 3 dots, 39 dots)
- Session&nbsp;3 – `7 × 2 = 14` (7 dots, 2 dots, 14 dots)

**Day&nbsp;5**
- Session&nbsp;1 – `2 × 5 = 10` (2 dots, 5 dots, 10 dots)
- Session&nbsp;2 – `11 × 4 = 44` (11 dots, 4 dots, 44 dots)
- Session&nbsp;3 – `4 × 6 = 24` (4 dots, 6 dots, 24 dots)

**Day&nbsp;6**
- Session&nbsp;1 – `3 × 9 = 27` (3 dots, 9 dots, 27 dots)
- Session&nbsp;2 – `8 × 2 = 16` (8 dots, 2 dots, 16 dots)
- Session&nbsp;3 – `12 × 2 = 24` (12 dots, 2 dots, 24 dots)

**Day&nbsp;7**
- Session&nbsp;1 – `15 × 2 = 30` (15 dots, 2 dots, 30 dots)
- Session&nbsp;2 – `4 × 7 = 28` (4 dots, 7 dots, 28 dots)
- Session&nbsp;3 – `6 × 3 = 18` (6 dots, 3 dots, 18 dots)
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
