# WobbVibe — Influencer Discovery & Shortlisting Experience

A premium, fully responsive, and highly optimized influencer discovery platform designed for brand managers. Built with **React 19**, **TypeScript**, **Vite**, **Tailwind CSS v4**, and **Zustand**.

---

## Getting Started

Follow these steps to run the project locally:

```bash
# Install dependencies (respects Tailwind v4 and React 19 settings)
npm install --legacy-peer-deps

# Run the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Starts the development server |
| `npm run build` | Builds the production bundle (TypeScript compiler + Vite build) |
| `npm run lint` | Lints the codebase using ESLint |

## Tech Stack

- **Framework:** React 19 (Strict Mode enabled)
- **Styling:** Tailwind CSS v4 (using CSS-first `@theme` configuration)
- **State Management:** Zustand v5 (with local storage persistence)
- **Bundler:** Vite v8
- **Icons:** Lucide React v0.468
- **Utilities:** clsx (conditional class merging)

---

## What I Changed

To elevate this project from a prototype to a production-grade application, I completed the following tasks:

### 1. Found & Fixed Issues
- **Case-Sensitive Search Bug:** Lowercased both the username query and search query in `dataHelpers.ts` to allow case-insensitive matches (e.g. searching "cristiano" now correctly finds `@cristiano`).
- **Engagement Rate Calculation Bug:** Corrected the formula in `ProfileDetailPage.tsx` which multiplied by `10000` instead of `100` (e.g., rate of `0.012` now renders as `1.20%` instead of `120.00%`). Consolidated it with the shared `formatEngagementRate` helper.
- **Engagements Metric Bug:** Corrected the detail page's "Engagements" statistic to show the actual engagement count instead of repeating the engagement rate.
- **Inaccessible Card Layout:** Replaced the semantic-lacking `div onClick` in `ProfileCard.tsx` with a proper, focusable `<Link>` component to enable native keyboard navigation and proper screen reader behavior.
- **Missing Alt Tags:** Added descriptive `alt` tags to all profile image elements (e.g. `"${fullname}'s profile photo"`) for accessibility.
- **Layout Overflow:** Fixed the `#root` container having a fixed `width: 1126px`, which caused a horizontal scrollbar on mobile/tablets. Changed to `max-width: 1200px` with fluid responsive padding.
- **Dead Code Cleanup:** Removed the unused `SearchBar.tsx` file, dead `clickCount` state variables, and `console.log` statements.

### 2. UI/UX Redesign
- **Premium Aesthetics:** Implemented a modern dark-mode-first glassmorphism theme, featuring custom deep dark card colors, subtle border glows, and purple-indigo brand gradients.
- **Sticky Navbar:** Crafted a blur-backdrop navigation header containing the WobbVibe brand mark and a floating heart shortlist counter button.
- **Pill Filter Controls:** Replaced the generic platform selection buttons with pill tabs featuring platform-specific hover scales, active gradients, and platform brand icons.
- **Slide-over Shortlist Panel:** Designed an elegant slide-over drawer that pulls out from the right to manage selected creators in real time without taking the user away from their discovery flow.
- **Performance-first Empty States:** Created friendly, illustrated empty states for search queries and shortlists that return no results.

### 3. Context → Zustand
- **Global Shortlist Store:** Swapped the context stub with a Zustand store inside `src/features/shortlist/store/useShortlistStore.ts`.
- **Durable Persistence:** Integrated Zustand's `persist` middleware to save shortlisted profiles in `localStorage`, making the shortlist durable across full page reloads and tab closures.
- **Narrow Selectors:** Designed components to subscribe only to specific slices of store state (e.g. `useShortlistStore(s => s.profiles.length)`), preventing unnecessary re-renders when unrelated store fields change.

### 4. "Select Profile & Add to List"
- **Shared Toggle Button:** Built a reusable `AddToListButton.tsx` component used uniformly in search results and the detailed view, keeping styling and event handling DRY.
- **Heart Toggle Animation:** Wireframe features a toggleable heart icon that turns into a filled red/purple heart when shortlisted.
- **Duplicate Prevention:** Leveraged the `username` as a unique key in the store to guarantee a profile cannot be added twice.
- **Instant Deselection:** Reverting shortlist status is synchronised in real time across the detail page, search results card, and shortlist slide-over panel.

### 5. Code Quality & Folder Structure
- Organized loose files into feature-focused subfolders:
  - `src/features/shortlist/` houses store logic and shortlist-specific components.
  - `src/hooks/` contains reusable custom hooks like `useDebounce.ts`.
  - `src/components/` holds global UI components.
  - `src/pages/` separates page layouts.
- Replaced duplicate helper functions with imports from a single source of truth in `utils/formatters.ts`.
- Fully typed all component props and removed legacy default typings to ensure a clean TypeScript build.

### 6. Performance
- **Debounced Search Input:** Implemented a custom `useDebounce` hook to delay search filtering by 250ms, eliminating lag while typing.
- **React.memo Optimization:** Memoized `ProfileCard` components using `React.memo` to prevent re-rendering the entire creator grid when a single shortlist button is clicked.
- **useMemo Hooks:** Wrapped expensive array filters and map executions in `useMemo` hooks, invalidating calculations only when search queries or platforms change.
- **Route-based Code Splitting:** Lazy-loaded `ProfileDetailPage` using `React.lazy` and `Suspense`, trimming down the initial load bundle size.

---

## Libraries I Added

| Library | Purpose | Why this one |
|---|---|---|
| `zustand` | Global shortlist state management | Required by the brief; lightweight, fast, and easy to persist to local storage |
| `lucide-react` | Modern, uniform UI iconography | Provides a clean, modern, and tree-shakeable icon set |
| `clsx` | Conditional CSS class joining | Clean utility for toggling Tailwind classes dynamically |

---

## Assumptions Made

- **Username Uniqueness:** Assumed that creator usernames are globally unique across the platform based on the route pattern (`/profile/:username`), using the username alone as the deduplication key.
- **Single Shortlist:** Assumed brand managers work with one primary active shortlist campaign at a time, making a single persisted array in local storage appropriate.

---

## Trade-offs

- **Drawer vs. Separate Page:** Chose to implement the shortlist view as a slide-over drawer panel instead of a dedicated route (`/shortlist`). This trade-off keeps the brand manager in context, allowing them to browse creators and toggle shortlists without frustrating back-and-forth page navigation.
- **No Virtualization:** Chose to skip list virtualization (`react-window`/`react-virtualized`) for the creator grids. Since search results are capped at 10 items per platform in the static dataset, the overhead of virtualization libraries would slow down load times without yielding any performance benefits.

---

## Remaining Improvements

If given more time, I would:
1. **Multi-List Campaigns:** Allow users to create and manage multiple shortlists (e.g. "Summer Campaign", "Tech Launch") instead of a single global list.
2. **Export to CSV/PDF:** Provide an export button on the shortlist panel to download the selected creator profiles as a spreadsheet or pitch deck.
3. **Outreach Workflow:** Build a mock email/outreach sequence modal so brand managers can pitch to all shortlisted creators in bulk.
