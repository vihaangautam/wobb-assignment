# [Your Project Name] — Wobb Frontend Assignment

> Fill this in continuously as you work, not from memory the night before. Delete this blockquote line before submitting.

[Optional: one or two screenshots or a short GIF of the redesigned UI here]

**Live demo:** [your-deployed-url-here, or remove this line if you didn't deploy]

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:5173.

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run lint` | Run ESLint |

## Tech stack

- React 19, TypeScript, Vite
- Tailwind CSS v4
- Zustand (state management)
- [add anything else you introduced]

---

## What I changed

> Organize this by the 7 official tasks so a reviewer can map your work straight back to the brief. Be specific — "fixed the search bug" is weaker than naming the actual bug and the fix.

**Bug fixes**
- [bug] → [fix] → [why it mattered]
- ...

**UI/UX redesign**
- [what changed and the reasoning, not just "redesigned everything"]

**Context → Zustand**
- [what was migrated, what the store looks like, what (if anything) deliberately stayed local state and why]

**"Select Profile & Add to List" feature**
- [how add/remove/dedupe/persistence are implemented]

**Code quality / structure**
- [folder structure decisions, what was refactored]

**Performance**
- [the specific optimizations applied, and any you deliberately skipped and why]

---

## Libraries I added

| Library | Purpose | Why this one |
|---|---|---|
| zustand | Shortlist state management | Required by the brief |
| | | |

---

## Assumptions made

> This section is one of the most directly graded — it's where "overall engineering judgment" becomes visible. Don't leave it thin.

- [e.g., treated `username` as a globally unique identifier across platforms based on the routing scheme — if that's wrong in the real data, the dedupe key would need to become `platform + username`]
- ...

## Trade-offs

- [e.g., chose not to add virtualization for the shortlist/search results given the dataset is ~10 profiles per platform — would revisit if the dataset were significantly larger]
- [e.g., decision on `react-beautiful-dnd`: removed it / swapped it for `@hello-pangea/dnd` because it's archived and known to break under React 18+ Strict Mode — explain which you chose and why]
- ...

## Remaining improvements

> Naming what you'd do with more time is a positive signal, not an admission of failure — be specific and honest.

- [e.g., multi-list support instead of a single shortlist]
- [e.g., broader test coverage beyond the store logic]
- ...

---

## Notes for reviewers

[Optional — anything you want to flag up front: a known limitation, a deliberate scope cut, where to look first.]
