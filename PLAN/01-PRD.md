# PRD — Wobb Influencer Discovery & Shortlisting Experience

*Working PRD, written from the candidate's side to scope the take-home like a real feature — not an official Wobb document.*

## 1. Background & context

Wobb is a real, operating influencer marketing platform — brands use it to discover creators across Instagram, YouTube, and TikTok, evaluate them, run campaigns, and manage payouts. The take-home gives you a deliberately stripped-down slice of that product: a static-data search/discovery app with no backend. The feature you're completing — letting a user build a working shortlist of creators — mirrors a real, load-bearing workflow in Wobb's actual product (a brand manager assembling a list of candidate creators before reaching out for a campaign).

Treat the starter app as "Wobb Discovery, frontend-only, single brand-user, no auth." That framing should drive every UX and architecture decision below.

## 2. Problem statement

A brand marketer can currently search and filter creators by platform and view full profile detail — but has no way to **collect candidates into a working list** while they browse. They have to keep profiles open in their head (or in browser tabs) while comparing options. The "Add to List" stub is meant to close that loop: select profiles as you browse, review them together, remove ones that don't fit, and have the list survive a refresh so a half-finished shortlisting session isn't lost.

## 3. Goals

- Let a user build, view, and manage a shortlist of creator profiles while browsing search results and profile detail pages.
- Make the shortlist durable across a page refresh (a marketer mid-research shouldn't lose their work to an accidental reload).
- Replace the existing Context-based state with Zustand as the source of truth for shared app state, starting with the shortlist.
- Bring the visual and interaction quality of the whole app up to a "polished product," not "working prototype" — this is judged as heavily as the new feature itself.
- Fix the planted bugs and quality issues without being told what they are.
- Do all of the above inside ~2 days, prioritizing core correctness over feature breadth.

## 4. Non-goals (explicitly out of scope)

- No real backend, authentication, or persistence beyond the browser (localStorage via Zustand `persist` is sufficient and expected).
- No actual outreach/messaging/campaign-management functionality — Wobb's product has this, the assignment doesn't ask for it.
- No multi-user or multi-list support (one shortlist, one implicit user) unless you have time left over and want to demonstrate range — call this out as a deferred improvement in the README rather than building it half-finished.
- No new data sources — work with the existing JSON in `src/assets/data/`.

Stating non-goals explicitly matters here: the brief's own submission notes say *"not every possible feature needs to be built... the core assignment items should be addressed thoughtfully."* Scope discipline is itself a graded signal (see `04-EVALUATION-CRITERIA.md`, "overall engineering judgment").

## 5. Primary persona

**Priya, a brand marketing manager.** She's evaluating 15–20 creators across three platforms for an upcoming campaign brief. She searches by platform, skims usernames/follower context, opens a few full profiles to compare, and wants to keep a running shortlist as she goes — without losing it if she accidentally refreshes or comes back tomorrow. She's not technical; the UI needs to be self-explanatory with zero onboarding.

## 6. User stories

Mapped to the 7 official tasks so nothing here is invented scope:

- **Search & filter (existing, must survive your refactor)**
  - As Priya, I can filter creators by platform (Instagram / YouTube / TikTok) so I only see relevant results.
  - As Priya, I can search by username or full name so I can find someone I already know about.
- **Profile detail (existing)**
  - As Priya, I can open a full profile to see extended detail before deciding whether to shortlist them.
- **Shortlisting (the feature you're building)**
  - As Priya, I can add a profile to my list from search results *or* from the profile detail page, so I don't have to navigate back and forth.
  - As Priya, I get clear visual feedback when a profile is already on my list, so I don't add it twice.
  - As Priya, I can view all shortlisted profiles in one place.
  - As Priya, I can remove a profile from my list if I change my mind.
  - As Priya, if I refresh the page or close the tab and come back, my list is still there.
- **Quality bar (implicit but graded)**
  - As Priya, the app feels fast and responsive — no janky re-renders when I toggle items in/out of my list.
  - As Priya, I can use the whole app comfortably on a laptop, tablet, or phone.
  - As Priya, I can navigate and act using only a keyboard, and screen-reader labels make sense (bonus, but cheap to bake in).

## 7. Functional requirements

**Search / Dashboard**
- Platform filter (Instagram, YouTube, TikTok) — single or multi-select is your call; document the choice.
- Text search by username or full name.
- Empty state when a search/filter combination returns nothing.
- Each result card shows enough to decide whether to open the profile or shortlist directly (avatar, name, username, platform, and an "Add to List" affordance).

**Profile Details (`/profile/:username`)**
- Full profile data rendered from the per-username JSON.
- An "Add to List" / "Remove from List" affordance consistent with how it behaves on the search cards.
- Sensible handling of a profile that doesn't resolve (bad/unknown username in the URL) — don't let this hard-crash the app.

**Shortlist ("Add to List" feature)**
- Add a profile to the list (from search card or profile detail).
- Prevent duplicate entries for the same profile.
- A dedicated place to view the full list (panel, drawer, or route — your call, but make it discoverable, e.g. a persistent counter/badge).
- Remove an item from the list.
- List persists across page refresh (Zustand `persist` → localStorage).

**Cross-cutting**
- Zustand is the source of truth for the shortlist (replacing Context). Other genuinely local UI state (a dropdown being open, a hover state) should *stay* local — see the state-management notes in `03-TECH-REQUIREMENTS.md` for why moving everything into Zustand is a negative signal, not a positive one.
- Responsive layout across mobile/tablet/desktop.
- Consistent design system: spacing, type scale, color palette applied uniformly rather than per-page improvisation.

## 8. Non-functional requirements

- **Performance:** no avoidable re-render storms when shortlist state changes; search/filter shouldn't visibly lag while typing.
- **Accessibility (bonus, but treat as a default):** keyboard operability, visible focus states, alt text, sufficient contrast, labeled inputs.
- **Code quality:** typed data models, no silent `any`, components small enough to be readable in one screen, no copy-pasted logic across the search card and profile detail "Add to List" buttons (share one hook/component).
- **Build health:** `npm run build` and `npm run lint` must both be clean at submission time.

## 9. Success criteria

There's no real analytics for a take-home, so "success" is redefined as: a reviewer can clone your repo, run two commands, and within five minutes of clicking around conclude that you understand React, TypeScript, state management, performance, and product judgment — the exact list in the brief's evaluation criteria. See `04-EVALUATION-CRITERIA.md` for the full breakdown and a self-scoring pass to run before you submit.
