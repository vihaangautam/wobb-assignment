# Feature Checklist — mapped to the 7 official tasks

This is your literal working to-do list. Every section heading below is copied from the official task list in `Wobb_Assignment.docx` so you can verify nothing here is invented. Check items off as you go — this checklist plus your commit log is most of your evidence trail for "problem-solving ability" and "engineering judgment."

---

## 1. Find and Fix Issues

- [ ] Run `npm install && npm run dev` immediately, before reading any code — note anything that already looks wrong (console errors/warnings, broken interactions, visual breakage)
- [ ] Run `npm run build` and `npm run lint` on the untouched starter — record the baseline output (this matters for your README's "what you changed")
- [ ] `grep -r "react-beautiful-dnd" src/` to see if the deprecated dependency is wired to anything — see `03-TECH-REQUIREMENTS.md` for what to do with it either way
- [ ] Click through every interaction once as a user: search, each platform filter, opening multiple profiles, clicking "Add to List," resizing the window, using the back button
- [ ] Read every file in `src/` once, top to bottom, before fixing anything — work the systematic bug-hunt checklist in `03-TECH-REQUIREMENTS.md` against the real code
- [ ] Fix bugs as separate, atomic commits (`fix: ...`) rather than batching them into one mega-commit
- [ ] Re-run `npm run build` and `npm run lint` after each meaningful batch of fixes, not just once at the end

**Acceptance criteria:** no console errors/warnings on any page in dev mode; `npm run lint` passes (or remaining warnings are deliberate and explained in the README); every fix is traceable to a commit message.

---

## 2. Redesign the UI/UX

- [ ] Define a tiny design system *before* touching individual screens: spacing scale, color tokens (via Tailwind v4 `@theme`, not a v3-style config — see tech doc), type scale, 4–6 reusable primitives (Button, Card/Tile, Badge, Input, Empty State)
- [ ] Redesign the Search/Dashboard screen: layout, filter controls, result cards, empty state, loading state
- [ ] Redesign the Profile Details screen
- [ ] Design the shortlist view itself (drawer, side panel, or dedicated route — pick one and justify it in the README)
- [ ] Responsive pass: verify mobile (~375px), tablet (~768px), and desktop (~1280px+) all look intentional, not just "doesn't break"
- [ ] Visual hierarchy check: can a first-time user tell what's clickable, what's primary vs. secondary, and where they are in the app, without instructions?
- [ ] Accessibility pass folded in here rather than retrofitted later (see checklist in tech doc) — cheaper to do while building components than after
- [ ] Consistent styling check: no screen using a different shadow/radius/spacing scale than the rest

**Acceptance criteria:** every screen reads as part of one product, not three separately-styled pages; works without horizontal scroll or overlap at common breakpoints; passes a basic keyboard-only walkthrough.

---

## 3. Replace React Context with Zustand

- [ ] Locate every existing `React.createContext` / `useContext` usage in the starter, not just the obvious one
- [ ] Confirm which Context is backing the (currently incomplete) selected-list feature — that one **must** become Zustand per the brief
- [ ] Install `zustand`, scaffold a store (see `03-TECH-REQUIREMENTS.md` for a concrete shape) with the `persist` middleware
- [ ] Migrate components off the old Context provider/consumer onto the new store's hook
- [ ] Remove the now-dead Context provider, file, and any leftover imports — don't leave it half-migrated
- [ ] Decide deliberately, per remaining Context (if any) beyond the list, whether it should also move to Zustand or whether `useState`/prop drilling is genuinely fine for it — and write down *why* (this is a judgment signal, not just a mechanical swap)

**Acceptance criteria:** zero remaining `createContext` calls backing the shortlist; the store is the single source of truth for it; no prop-drilling workaround reintroducing the problem Context had.

---

## 4. Implement "Select Profile & Add to List"

Straight from the brief's explicit sub-requirements:

- [ ] **Add profiles to a selected list** — from both the search result card and the profile detail page, using the same underlying action
- [ ] **Prevent duplicate entries** — adding an already-shortlisted profile is a no-op or clearly disabled/toggled state, never a second entry
- [ ] **Display the selected profiles** — a real view a user can reach (not just store state with no UI)
- [ ] **Allow removing profiles** — from the list view, and ideally also reflected back as an un-toggle on the original card
- [ ] **Keep the list persistent after page refresh** — Zustand `persist` to `localStorage`; verify by actually refreshing the browser, not just by reading the code
- [ ] Decide and document your duplicate-detection key (`username` alone vs. `username + platform`) — see the trade-off note in `03-TECH-REQUIREMENTS.md`
- [ ] Add a lightweight confirmation (toast, badge count, button state change) so adding/removing feels acknowledged, not silent

**Acceptance criteria:** every one of the five explicit bullet requirements above is independently verifiable by clicking through the running app — this is the single most scrutinized feature in the assignment, since it's named explicitly and tied directly to the Zustand requirement.

---

## 5. Improve Code Quality

- [ ] Adopt a clear folder structure (proposal in `03-TECH-REQUIREMENTS.md`) and actually move files into it, not just add new code in the new pattern while old code sits untouched
- [ ] Replace `any`/implicit-any with real types for profile data, search results, and component props
- [ ] Extract repeated JSX/logic (e.g., the "Add to List" button used in two places) into one shared component/hook
- [ ] Name things for what they do, not what they are (`ProfileCard`, not `Card2`)
- [ ] Remove dead code, unused imports, commented-out blocks left from debugging
- [ ] Make sure `npm run lint` is clean, or any remaining warning is intentional and explained

**Acceptance criteria:** a reviewer skimming the file tree and a few components can predict where to find things without searching.

---

## 6. Optimize Performance

- [ ] Memoize derived/filtered result lists (`useMemo`) instead of recomputing on every render
- [ ] Wrap pure list-item components in `React.memo` so toggling one shortlist item doesn't re-render every card
- [ ] Debounce the search input (~200–300ms) so filtering isn't running on every keystroke
- [ ] Select narrow slices from the Zustand store (not the whole state object) so unrelated state changes don't trigger extra renders
- [ ] Code-split the profile detail route with `React.lazy`/`Suspense` so it's not in the initial bundle
- [ ] Use a stable `key` (username) on list items, never array index
- [ ] Resist the urge to over-optimize a 10-item list — note in the README where you deliberately *didn't* add complexity (e.g., no virtualization) and why

**Acceptance criteria:** you can name, in plain language, what each optimization prevents — "judgment" here means knowing when *not* to optimize as much as when to.

---

## 7. Use Any Libraries

- [ ] Before adding anything, check whether the existing stack already solves it
- [ ] For each library you add, be able to state in one sentence why it earned its place over the alternative of writing it yourself
- [ ] Log every addition in `06-README-TEMPLATE.md`'s "Libraries you added" table as you go, not from memory at the end
- [ ] Avoid stacking multiple libraries that do the same job (e.g., don't add both a heavy UI kit and hand-rolled components for the same primitives)

**Acceptance criteria:** the dependency list in your final `package.json` is something you can defend item-by-item in an interview.

---

## Submission Checklist (verbatim from the brief)

- [ ] `npm run build` completes successfully
- [ ] The application runs without errors
- [ ] Your repository is public (or Wobb has access)
- [ ] README describes: what you changed / libraries you added / assumptions made / trade-offs / remaining improvements
- [ ] Git history contains meaningful commits
- [ ] You submit your GitHub repository URL before the deadline

## Bonus Checklist (optional, but free points if time allows)

- [ ] Deploy the app (Vercel, Netlify, GitHub Pages, or equivalent) and put the live URL in the README
- [ ] Improve accessibility beyond the baseline pass in task 2
- [ ] Add animations or micro-interactions (tasteful, not gratuitous)
- [ ] Write tests (a handful of meaningful ones, see tech doc)
- [ ] Improve overall developer experience (path aliases, clear scripts, clean README, etc.)
