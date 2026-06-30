# Tech Requirements & Architecture Notes

Everything in the "Confirmed stack" table below was read directly out of the starter repo's `package.json` — not assumed. The two "traps" after it are the most valuable thing in this whole kit: they're specific, verifiable things in the actual dependency list that are easy to lose time on if you don't know they're there.

## Confirmed stack (from `package.json`)

| Package | Version | Notes |
|---|---|---|
| react / react-dom | ^19.2.6 | Current major — Strict Mode double-invokes effects in dev |
| typescript | ~6.0.2 | Very current; if a tutorial/Stack Overflow answer looks off, trust the official docs over the answer's age |
| vite | ^8.0.12 | Build tool |
| react-router-dom | ^7.18.0 | Powers `/` and `/profile/:username` |
| tailwindcss | ^4.3.1 | **v4 — config model changed, see trap below** |
| @tailwindcss/vite | ^4.3.1 | The v4 Vite plugin (confirms CSS-first config, not PostCSS) |
| react-beautiful-dnd | ^13.1.1 | **Deprecated/archived — see trap below** |
| eslint / typescript-eslint | ^10.3.0 / ^8.59.2 | `npm run lint` should be clean before submission |

Not present yet, and worth adding deliberately: **zustand** (required by the brief), a date/format or class-merge utility if your component count grows (`clsx` or `tailwind-merge` are common, lightweight choices), and a testing setup if you go for the bonus (`vitest` + `@testing-library/react` pairs naturally with Vite).

---

## Trap #1: `react-beautiful-dnd` is already a dependency

This is almost certainly intentional. Atlassian archived `react-beautiful-dnd` — it's unmaintained — and it has a long-standing, well-documented breakage under React 18+ Strict Mode (drag handles fail to initialize correctly because of double-invoked effects). On React 19 with Strict Mode on, expect it to misbehave if it's actually wired to anything in the UI.

**First move:** `grep -r "react-beautiful-dnd" src/` to see if it's used or just dead weight in `package.json`.

- **If it's unused:** removing it *is* one of your "found and fixed a quality issue" wins — say so explicitly in the README. Shipping an unused, archived dependency is exactly the kind of smell this exercise plants on purpose.
- **If it's wired to something** (most likely a drag-to-reorder affordance somewhere near the list): you have two defensible paths —
  1. Swap it for **`@hello-pangea/dnd`**, a maintained drop-in fork with the same API — lowest-effort fix that keeps the intended interaction.
  2. Swap it for **`@dnd-kit/core`**, a modern, actively maintained, more accessible alternative — more idiomatic if you're rebuilding that part of the UI anyway.
- **What not to do:** leave it in, untouched, whether or not it's used. That reads as not having noticed it, which is worse than either fix above.

Drag-to-reorder on the shortlist itself is a nice-but-optional flourish — don't let deciding what to do with this dependency become a time sink. A one-line decision + swap is enough; a polished drag interaction is a bonus, not a requirement.

## Trap #2: Tailwind v4 config model is different from v3

`tailwindcss` + `@tailwindcss/vite` together confirm this starter is on **Tailwind v4's CSS-first config**, not the v3 model most tutorials (and many AI coding assistants, by default habit) still assume. Concretely:

- No `tailwind.config.js` with a `content: []` array is required — v4 auto-detects content.
- No PostCSS config wiring is required — the Vite plugin handles it.
- Theme customization (colors, fonts, spacing) happens via an `@theme { ... }` block directly in your main CSS file, e.g.:
  ```css
  @import "tailwindcss";

  @theme {
    --color-brand-500: oklch(0.6 0.2 280);
    --font-display: "Inter", sans-serif;
  }
  ```
- If you (or an AI assistant) generate a v3-style `tailwind.config.js` expecting it to control theming, it will silently do nothing useful. If you see Tailwind classes not applying the way you expect, this config-model mismatch is the first thing to check — not a bug in your component.

---

## Recommended folder structure

The brief explicitly grades "code quality" and "project structure," so make the structure legible rather than flat:

```
src/
  app/
    App.tsx              # shell, providers, layout
    router.tsx            # route definitions
  pages/
    DashboardPage.tsx      # "/" — search + filters
    ProfileDetailsPage.tsx # "/profile/:username"
  features/
    search/                # filter/search UI + logic, scoped to this feature
    shortlist/
      store/
        useShortlistStore.ts
      components/
        AddToListButton.tsx   # one shared component used on card + detail page
        ShortlistPanel.tsx
  components/
    ui/                    # Button, Card, Badge, Input — dumb, reusable primitives
  hooks/                    # useDebounce, etc.
  types/                    # Profile, SearchResult, Platform, etc.
  lib/                      # pure helpers (formatting, filtering predicates)
  assets/data/              # existing JSON — leave as-is
```

You don't have to use this exact shape, but pick *a* defensible shape and apply it consistently — a half-migrated structure (some files in the new pattern, most still loose in `src/`) reads worse than leaving the original flat structure alone.

---

## State management: the Zustand store

Only the shortlist needs to be global, persistent state. Purely local UI state (a dropdown's open/closed state, a hover flag) should stay as `useState` in the component that owns it — routing *everything* through Zustand is a common overcorrection that actually reads as weaker judgment than a deliberate mix of local and global state. Say this explicitly in your README if you make that call.

A reasonable shape:

```ts
// features/shortlist/store/useShortlistStore.ts
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export interface ShortlistedProfile {
  username: string
  fullName: string
  platform: 'instagram' | 'youtube' | 'tiktok'
  avatarUrl: string
}

interface ShortlistState {
  profiles: ShortlistedProfile[]
  addProfile: (profile: ShortlistedProfile) => void
  removeProfile: (username: string) => void
  isShortlisted: (username: string) => boolean
}

export const useShortlistStore = create<ShortlistState>()(
  persist(
    (set, get) => ({
      profiles: [],
      addProfile: (profile) =>
        set((state) =>
          state.profiles.some((p) => p.username === profile.username)
            ? state
            : { profiles: [...state.profiles, profile] }
        ),
      removeProfile: (username) =>
        set((state) => ({
          profiles: state.profiles.filter((p) => p.username !== username),
        })),
      isShortlisted: (username) =>
        get().profiles.some((p) => p.username === username),
    }),
    {
      name: 'wobb-shortlist-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
)
```

**A judgment call worth documenting either way:** this uses `username` alone as the dedupe key, which matches the routing scheme (`/profile/:username` implies usernames are already unique identifiers in the dataset). If you find usernames collide across platforms in the actual JSON, switch the key to a `platform:username` composite and note why in your README's trade-offs section.

When consuming the store in components, select narrow slices rather than the whole object, so an unrelated state change doesn't re-render components that don't care:

```ts
const isInList = useShortlistStore((s) => s.isShortlisted(username))
const addProfile = useShortlistStore((s) => s.addProfile)
```

---

## Systematic bug-hunt checklist

The brief doesn't enumerate the planted bugs — finding them is part of what's graded. Run this checklist against the real code rather than treating it as a list of confirmed answers:

**State & rendering**
- [ ] Stale closures in `useEffect`/event handlers (missing or wrong dependency arrays)
- [ ] Direct state mutation instead of immutable updates
- [ ] Array index used as `key` where list order/contents can change
- [ ] Context value object recreated every render, defeating consumer memoization

**Search & filtering**
- [ ] Inconsistent case-sensitivity in search matching
- [ ] Filter combinations using the wrong logic (AND where OR was intended, or vice versa)
- [ ] Filter/search state not resetting when it should
- [ ] No empty-state handling when a search returns nothing

**Routing**
- [ ] `:username` param not handled when it doesn't match any profile (no 404/fallback)
- [ ] Special characters in usernames not URL-decoded correctly
- [ ] Links implemented as full `<a href>`/manual navigation instead of `Link`/`useNavigate`, causing full page reloads

**Data loading & typing**
- [ ] Missing loading and error states around JSON "loading"
- [ ] `any` or untyped JSON imports masking shape mismatches
- [ ] Assumed fields that aren't actually present in every profile JSON file

**The shortlist stub**
- [ ] Confirm exactly what the current "Add to List" button does today (likely a no-op or `disabled`) before building on top of it
- [ ] Check for any partially-wired state (a context or prop that already exists but isn't fully connected)

---

## Performance checklist

- [ ] `useMemo` for filtered/derived result lists, keyed on the actual inputs that should invalidate it
- [ ] `React.memo` on list-item components (`ProfileCard`) so unrelated state changes don't re-render the whole grid
- [ ] `useCallback` for handlers passed into memoized children
- [ ] Debounce the search input (~200–300ms)
- [ ] Select narrow Zustand slices, not the whole store object, in components
- [ ] `React.lazy` + `Suspense` for the profile detail route
- [ ] `loading="lazy"` on profile images
- [ ] Deliberately skip virtualization for a 10-item list — note in the README that you considered and rejected it; adding it anyway is over-engineering for this dataset size

## Accessibility checklist (bonus, cheap to bake in early)

- [ ] Every interactive element reachable and operable by keyboard alone (Tab, Enter/Space)
- [ ] Visible focus states — don't strip the default outline without a replacement
- [ ] `aria-label` on icon-only buttons (e.g., a heart/bookmark-style "add to list" icon)
- [ ] Meaningful `alt` text on profile images (`"${fullName}'s profile photo"`, not `"image"`)
- [ ] Semantic elements — `<button>` for actions, not `<div onClick>`
- [ ] Color contrast at or above WCAG AA (4.5:1 for normal text)
- [ ] Search input has an associated `<label>` (visually hidden is fine, but present for screen readers)
- [ ] `aria-live="polite"` region announcing "Added to list" / "Removed from list"

---

## Library recommendations

You're explicitly told you can add anything — the judgment is in *what* and *how much*. A short, defensible list beats a long one:

| Need | Reasonable pick | Why |
|---|---|---|
| State management | `zustand` | Required by the brief |
| Animation | Tailwind transition utilities first; `motion` (formerly Framer Motion) only if you want orchestrated/gesture animation | Heavier lib for a few hover/enter transitions can read as over-engineering — justify it if you add it |
| Forms | Native controlled inputs are enough here (just a search box); skip a form library unless you add something more complex | Avoid adding `react-hook-form` for a single input — disproportionate |
| Testing (bonus) | `vitest` + `@testing-library/react` | Pairs naturally with Vite, minimal config |
| Class merging | `clsx` (+ `tailwind-merge` if conditional classes get complex) | Keeps conditional Tailwind classes readable |
| Drag-and-drop (only if pursued) | `@hello-pangea/dnd` or `@dnd-kit/core` | Replaces the archived `react-beautiful-dnd` — see Trap #1 |

Whatever you choose, log it in `06-README-TEMPLATE.md`'s libraries table **as you add it**, with the one-sentence reason — reconstructing rationale from memory at 1 AM before the deadline is how that section ends up thin.

## Testing approach, if you go for the bonus

Favor a handful of meaningful tests over broad shallow coverage:
1. Shortlist store logic — add, remove, duplicate prevention, persistence round-trip
2. A filter/search utility function in isolation
3. One component test — `ProfileCard` renders, clicking "Add to List" updates the store

Three to six well-chosen tests demonstrate the practice without eating your remaining time budget.
