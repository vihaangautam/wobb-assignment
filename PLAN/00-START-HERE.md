# Wobb "Vibe Coder Intern" Assignment — Prep Kit

Hey Vihaan — this is a working kit to help you plan and execute the Wobb take-home well, built directly from `Wobb_Assignment.docx`, the live starter repo's README, and its `package.json`. Everything here is meant to be used, edited, and deleted as you go — it's scaffolding for your thinking, not a deliverable you submit to Wobb.

---

## Quick facts (read this part twice)

| | |
|---|---|
| **Role** | Vibe Coder Intern |
| **Starter repo** | https://github.com/Wobb-ai/vibe-coder-assignment |
| **Deadline** | **2 July 2026, 2:00 PM IST (UTC+5:30) — strict** |
| **Today** | Tuesday, 30 June 2026 — you have roughly **2 days** |
| **Submit by** | Replying to Lohit's email with your repo URL (and live URL if deployed) |
| **Questions** | Reply to the email, or lohit@wobb.ai |

### The three things that will sink an otherwise-good submission
1. **Forking the assignment repo.** The brief says "do not fork" *twice*. Download/clone it, then push to a **brand-new repo** you create yourself. A visible fork relationship is an instant red flag to a reviewer, regardless of code quality.
2. **`npm run build` failing.** It's the first line of the official checklist. A broken build undermines everything else you did, no matter how good the redesign looks in dev mode.
3. **Committing after 2:00 PM IST on July 2.** The brief states late commits "will not be considered" / "disqualify your submission." Submit with buffer — don't push at 1:59 PM.

### The three highest-leverage moves
1. **Notice `react-beautiful-dnd` is already in `package.json` — and deal with it deliberately.** It's a deprecated, archived library with known React 18+ Strict Mode breakage. Whether you remove it or swap it, *documenting that decision* is a free, concrete demonstration of engineering judgment. Details in `03-TECH-REQUIREMENTS.md`.
2. **Deploy it.** Vite + Vercel/Netlify is a 10-minute bonus item with outsized payoff — a reviewer can actually click your link instead of trusting your README.
3. **Commit as you go, not at the end.** "Git commit history" is an explicit, named evaluation criterion. One giant commit reads as a red flag even if the code is great.

---

## What's in this kit

| File | What it's for |
|---|---|
| `01-PRD.md` | Why this feature/app exists, who it's for, what "done" means — read once before coding so every decision has a frame |
| `02-FEATURE-CHECKLIST.md` | The 7 official tasks broken into literal checkboxes with acceptance criteria — your working to-do list |
| `03-TECH-REQUIREMENTS.md` | Confirmed stack, the two tooling traps, recommended folder structure, the Zustand store design, a systematic bug-hunt checklist, performance/a11y checklists, library recommendations |
| `04-EVALUATION-CRITERIA.md` | The 9 official criteria, deconstructed into "what they're actually looking for" + a self-grading rubric before you submit |
| `05-EXECUTION-PLAN.md` | A day-by-day plan that fits your ~2-day window, with commit checkpoints baked in, plus a triage list for if you fall behind |
| `06-README-TEMPLATE.md` | The actual README to ship in your submitted repo — structured exactly to the required sections |

Suggested reading order: this file → `01-PRD.md` → `02-FEATURE-CHECKLIST.md` → `03-TECH-REQUIREMENTS.md`, then keep `05-EXECUTION-PLAN.md` open as you work and fill in `06-README-TEMPLATE.md` continuously rather than at the end.

---

## One honest caveat

GitHub blocks automated browsing of a repo's file tree, so this kit is built from the **official assignment brief (docx) + the live README + the actual `package.json`** — not a line-by-line read of every source file. That's why `03-TECH-REQUIREMENTS.md` gives you a *systematic checklist* for finding the intentional bugs rather than a pre-solved list — the brief itself doesn't enumerate them either; finding them is the point of the exercise. If you want help once you're inside the actual code (debugging a specific file, reviewing a diff, deciding between two approaches), paste or upload it in a follow-up and I'll go deeper.

## Final gut-check before you submit

- [ ] `npm run build` passes with a clean exit, on a fresh clone (not just your dev machine's cache)
- [ ] `npm run dev` boots with no console errors
- [ ] The repo is a **new, public** repo — not a fork (check the GitHub page doesn't say "forked from Wobb-ai/...")
- [ ] README has all five required sections filled in for real (not placeholders)
- [ ] Commit log tells a story — 15+ commits, not 2
- [ ] You can explain *every* change out loud, including ones AI tools wrote for you
- [ ] Repo URL sent with time to spare before 2:00 PM IST, 2 July 2026
