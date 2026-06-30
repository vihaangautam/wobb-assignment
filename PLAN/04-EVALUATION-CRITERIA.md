# Evaluation Criteria — Deconstructed

The brief states your submission is evaluated on nine named criteria, plus one criterion that isn't numbered but is stated explicitly in the live repo's README. This doc takes each one and translates it into "what a reviewer is actually looking at" and "how to make sure yours shows it."

## The 9 official criteria

### 1. React fundamentals
**What they're checking:** correct hook usage (no rules-of-hooks violations), sensible component composition, controlled inputs done right, effects used only when something genuinely needs to sync with the outside world (not as a substitute for derived state), clean conditional rendering, state lifted to the right level (not too high, not too low).
**Where it shows:** every component you touch, especially the search/filter logic and the shortlist wiring.

### 2. TypeScript usage
**What they're checking:** real types for your data models (`Profile`, `SearchResult`, a `Platform` union), typed component props, no silent `any` papering over a shape you didn't bother to define, type-safe route params.
**Where it shows:** `types/`, every component's props interface, the Zustand store's generic.

### 3. Code quality
**What they're checking:** consistent naming, small focused components/functions, no duplicated logic (the "Add to List" button should be one component used twice, not copy-pasted), sensible file organization, lint-clean.
**Where it shows:** the file tree itself, and whether the "Add to List" affordance on the card and on the profile page share code.

### 4. Problem-solving ability
**What they're checking:** not just *that* bugs got fixed, but the reasoning — did you find them systematically, or randomly? This is largely invisible unless you make it visible.
**Where it shows:** commit messages that name the bug and the fix, and the README's "what you changed" section. Treat your commit log as a problem-solving narrative, not just a change log.

### 5. UI/UX improvements
**What they're checking:** visual hierarchy, responsive layout, a consistent design system (not three different spacing scales across three pages), empty/loading/error states that were *designed*, not just functional, and some sense of "delight" (the live README's own word).
**Where it shows:** the whole app, but especially the moments a lazy redesign skips — empty states, loading states, the transition between list and detail.

### 6. State management
**What they're checking:** correct Zustand usage for the shortlist specifically, the `persist` middleware actually working, clean selectors — *and* whether you knew what should stay local. Routing every piece of UI state through the global store is a common overcorrection and reads as weaker judgment than a deliberate mix.
**Where it shows:** the store file, and which pieces of state are conspicuously *not* in it.

### 7. Performance optimizations
**What they're checking:** demonstrated, intentional optimizations (memoization, debounced search, code-split routes) — and equally, the judgment not to over-optimize a 10-item list. Premature `useMemo` everywhere is itself a code smell.
**Where it shows:** the optimizations you made, and ideally a line in the README about one you deliberately skipped and why (e.g., no virtualization).

### 8. Overall engineering judgment
**What they're checking:** this is the meta-criterion. Did you prioritize correctly under a hard 2-day deadline? Did you make and *document* reasonable assumptions instead of guessing silently? Did you avoid scope creep? This criterion is largely graded through your README's assumptions/trade-offs sections — it's the one section of the whole submission that exists specifically to let you demonstrate it directly.
**Where it shows:** `06-README-TEMPLATE.md`'s "Assumptions" and "Trade-offs" sections — don't leave these thin.

### 9. Git commit history
**What they're checking:** incremental, logical progress with descriptive messages — a reviewer should be able to read your commit log top to bottom and follow the work, roughly tracking the 7 tasks. One enormous "final commit" actively counts against you here, independent of code quality.
**Where it shows:** literally your `git log`. Conventional prefixes (`feat:`, `fix:`, `refactor:`, `perf:`, `docs:`, `test:`, `chore:`) make this easy to skim.

---

## The unstated 10th criterion: judgment over breadth

The live repo's README adds a line the docx doesn't spell out as explicitly: *"not every possible feature needs to be built, but the core assignment items should be addressed thoughtfully."* In practice this means a reviewer comparing two submissions will rate **"all 7 core tasks done well, 1 bonus item done well"** above **"7 core tasks done shallowly, all 5 bonus items attempted."** If you're going to run short on time, cut bonus items before cutting depth on the core 7 — see the triage section in `05-EXECUTION-PLAN.md`.

---

## Self-assessment rubric

Run this honestly the morning of submission day, before you write the final README pass:

| Criterion | Self-score (1–5) | Evidence — where does this actually show up in the repo? |
|---|---|---|
| React fundamentals | | |
| TypeScript usage | | |
| Code quality | | |
| Problem-solving ability | | |
| UI/UX improvements | | |
| State management | | |
| Performance optimizations | | |
| Overall engineering judgment | | |
| Git commit history | | |

If you can't fill in the "evidence" column for a row, that's a signal — either go fix it, or be honest about it in the README's "remaining improvements" section. A reviewer trusts a candidate who says "I know X is thin, here's why and here's what I'd do with more time" far more than one who says nothing and hopes it isn't noticed.

---

## Interview-readiness prep

The brief states directly: *"During the interview, you may be asked to explain your approach and the changes you made."* This means every line you ship — including anything an AI tool wrote for you — needs to be something you can talk through fluently. A few concrete habits that make this easy instead of stressful later:

- Keep your commit messages specific enough that they double as your own changelog (`fix: search was case-sensitive, profiles with capitalized usernames were unfindable` beats `fix: search bug`).
- For any non-obvious decision (the `react-beautiful-dnd` call, the dedupe key, what you chose to keep in Zustand vs. local state), write the one-sentence "why" *at the time you make the call* — it's much harder to reconstruct convincingly after the fact.
- Before submitting, do one dry run: pick three changes at random from your diff and explain them out loud as if a reviewer just asked "walk me through this." If you stumble, that's worth fixing or at least flagging honestly in the README.
