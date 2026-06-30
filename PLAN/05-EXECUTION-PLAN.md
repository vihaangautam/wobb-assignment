# Execution Plan — Today (Tue 30 Jun) → Deadline (Thu 2 Jul, 2:00 PM IST)

You have roughly two days. This plan front-loads the highest-risk, most heavily-weighted work (correctness, the named feature, state management) and treats bonus items as what they are — optional, added only once the core is solid.

---

## Phase 0 — Setup & recon (today, ~60–90 min)

- [ ] Download/clone the starter repo locally — **do not fork**
- [ ] Create a new, empty, public repo under your own GitHub account
- [ ] Point your local clone's remote at your new repo (not the original)
- [ ] `npm install`, then run `npm run dev`, `npm run build`, and `npm run lint` — record the baseline output before changing anything
- [ ] Click through the entire app once: search, each platform filter, open several profiles, click "Add to List," resize the window, check the console for warnings
- [ ] Read every file in `src/` once, top to bottom, taking notes against the bug-hunt checklist in `03-TECH-REQUIREMENTS.md`
- [ ] First commit: even just `chore: confirm starter boots, baseline notes` — starting your commit log early matters more than it looks

## Phase 1 — Bugs & state foundation (today, remainder of the day)

- [ ] Fix identified bugs one at a time, one commit each (`fix: ...`)
- [ ] `npm install zustand`
- [ ] Scaffold the shortlist store with `persist` middleware (see `03-TECH-REQUIREMENTS.md`)
- [ ] Wire "Add to List" to the store: add, remove, duplicate prevention
- [ ] Build a minimal (even unstyled) shortlist view so the feature is functionally complete before it's pretty
- [ ] Audit and remove the old Context, migrate any remaining consumers
- [ ] Make the call on `react-beautiful-dnd` (remove, or swap to a maintained alternative) and commit it as its own clearly-labeled change
- [ ] Verify persistence by actually refreshing the browser, not just reading the code

**Checkpoint:** by end of today, the app should be bug-free-as-far-as-you-know, the shortlist feature should *work* end-to-end (even if ugly), and Zustand should be the only thing backing it.

## Phase 2 — Redesign (Day 2 daytime)

- [ ] Build the small design system first: tokens in `@theme`, then Button/Card/Badge/Input primitives
- [ ] Redesign Search/Dashboard — layout, filters, cards, empty state, loading state
- [ ] Redesign Profile Details
- [ ] Style the shortlist view properly
- [ ] Responsive pass across mobile/tablet/desktop
- [ ] Accessibility pass (keyboard nav, focus states, alt text, contrast, aria-labels) — bonus, but far cheaper now than retrofitted later
- [ ] Commit per screen/component (`feat: redesign profile detail layout`, not one giant `feat: redesign everything`)

**Checkpoint:** by end of Day 2 daytime, every screen should look and feel like one coherent product.

## Phase 3 — Performance, polish, bonus (Day 2 evening)

- [ ] Work through the performance checklist in `03-TECH-REQUIREMENTS.md`
- [ ] If time allows: animations/micro-interactions (keep tasteful and light)
- [ ] If time allows: a handful of focused tests (store logic + one component)
- [ ] If time allows: deploy to Vercel or Netlify — genuinely cheap with a Vite project and high signal-to-effort
- [ ] Keep filling in `06-README-TEMPLATE.md` continuously, not from memory later

**Checkpoint:** core + redesign are done and stable before any bonus item is started. If you're behind schedule entering this phase, skip straight to Phase 4 — see triage below.

## Phase 4 — Finalize (Day 3 morning, before 2:00 PM IST)

- [ ] Final `npm run build` and `npm run lint` on a clean state — fix anything that surfaces
- [ ] Walk the submission checklist in `02-FEATURE-CHECKLIST.md` line by line
- [ ] Finish the README from the template — read it once as if you're the reviewer seeing this project cold
- [ ] Double-check the repo is public and is **not** a fork (check the GitHub repo page itself for a "forked from" label)
- [ ] Push final commit with real buffer before 2:00 PM IST — don't push at 1:59
- [ ] Reply to Lohit's email with your repo URL (and live URL if deployed)
- [ ] Stop. Do not push anything else after sending — late commits disqualify the submission per the brief

---

## If you're running behind: triage order

Cut in this order — top items are non-negotiable, bottom items are first to drop:

1. **Never cut:** `npm run build` passing, app running without errors, public non-forked repo, README's five required sections
2. **Never cut:** the shortlist feature's five explicit sub-requirements (add, dedupe, display, remove, persist) — this is the single most explicitly graded feature in the brief
3. **Protect as long as possible:** Zustand migration, the most visually obvious redesign work (Dashboard + Profile Details), a clean commit history
4. **First to trim:** redesign polish on lower-traffic states (deep empty states, edge-case styling)
5. **First to drop entirely:** bonus items, in this order — tests, then animations, then deep accessibility beyond the basics, then deployment if truly out of time (though deployment is usually cheap enough to keep even when squeezed)

If you do have to cut something, **say so in the README's "remaining improvements" section** rather than silently shipping it half-done. A named, honest gap reads as judgment; an unnamed half-finished feature reads as a miss.
