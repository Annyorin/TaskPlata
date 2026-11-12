# Component Implementation Research

Detailed rubric and templates for the **Component Implementation** mode — when the user
hands Claude a *target UI* and wants to build it, researched component by component, with
one best real-world reference chosen per component.

This mode is targeted (one specific UI to build), decisive (one pick per component), and
implementation-oriented (the output is a build spec, not a pattern catalog). Contrast with
"Design System Component Research" in SKILL.md, which catalogs primitives across a whole
category and stays descriptive.

---

## Step 1: Ingest the target UI → component inventory

The first job is always to turn the target UI into a flat list of named, buildable
components. Pick the adapter that matches how the UI was provided.

### Adapter A — Screenshot / image
The user pastes a mockup, competitor screen, or sketch.
- Read it visually. List every distinct UI element top to bottom, left to right.
- Name each as a buildable primitive ("segmented control", "balance card", "transaction
  row"), not a region ("the top part").
- Note states visible in the image and states implied but not shown (e.g., a list implies
  an empty state).

### Adapter B — Text description / PRD
The user describes the screen in words.
- Infer the component list from the described content and actions.
- Where the description is ambiguous about a component's form, note the assumption and
  research the most common interpretation; flag it in the brief.

### Adapter C — Figma design
A figma.com URL or current selection.
- Use the Figma MCP (`get_metadata` for structure, `get_screenshot` to see it,
  `get_design_context` for tokens/layout). If the Figma MCP is not connected, fall back to
  asking the user for a screenshot and use Adapter A.
- Map Figma layers/frames to component names. Pull existing token values (color, spacing,
  type) so the build spec can reference them directly.

### Adapter D — Existing coded UI
Claude inspects the running app or the repo.
- Read the relevant components/JSX (or run the app and screenshot it) to list what exists.
- This adapter is for *upgrading* — research a stronger reference for each existing
  component, and the brief becomes a before→after.

### Inventory output
Produce a short table before searching:

| # | Component | States needed | Priority |
|---|-----------|---------------|----------|
| 1 | ... | default, loading, empty | high |

Priority = research order. Rank by build risk: novel/custom components and high-visibility
components first; trivial primitives (a plain button) last or skip if a token reference is
enough.

**Scope to the named region.** If the user points at one part of the UI (a panel, a card, a
section — "dry run the AI brief", "just the sidebar"), scope the inventory to that region and
decompose *it* into sub-components, not the whole screen. Decompose the rest only if asked.

---

## Step 2: Research each component

One Mobbin query per component (or per cluster of near-identical components). Reuse the
query-construction rules in SKILL.md and `references/query-patterns.md` — describe what is
visible, include the component's category, the screen it lives on, and the states needed.

- Use `search_screens` (not flows) — you want individual screens to study one component.
- `limit: 10-15` per component is plenty; you only need a handful of strong candidates.
- Search in batches of 2–3 components and **analyze each batch immediately** as text before
  the next batch. Record app name, Mobbin URL, and how that app renders the component.
- Carry the *target UI's style* into the query when it helps (e.g., "minimal", "dense data
  table", "playful"), so candidates skew toward references that will actually fit.

---

## Step 3: Pick the best visual — selection rubric

For each component, auto-pick the single best reference. Score candidates against these
criteria in priority order, and write the pick's rationale from them.

1. **Style fit** (highest weight) — Does it match the target UI's aesthetic: visual
   density, tone, platform conventions, and overall vibe? A beautiful reference that
   clashes with the target is the wrong pick.
2. **Completeness** — Does it actually show the states and details this component needs
   (the error variant, the expanded row, the filled vs. empty input)? Prefer references
   that answer build questions over ones that only look nice.
3. **Clarity** — Is the component clearly legible in the screenshot, not tiny or occluded?
   You will be coding from this image; it must be readable.
4. **Craft quality** — Polished, current, and a convention users already understand.
   Prefer well-regarded products when other factors tie.
5. **Adaptability** — How cleanly does it translate to the target's design tokens and
   layout grid without a rebuild?

Tie-break: prefer the more recent / more widely-used app. If no candidate fits, say so and
either broaden the query or recommend a sensible default rather than forcing a weak pick.

**Upgrade over mirror.** When the target UI's *current* rendering of a component is weaker
than a reference you found (e.g. it shows actions as flat prose but a reference shows them as
actionable rows), auto-pick the **upgrade**, not the reference that merely matches what's
already there. Name the closest-to-current reference as a runner-up so the user can choose to
keep their existing format. This applies especially to Adapter D (existing coded UI), where
the whole point is to improve on what exists.

**Composite pick.** When no single reference covers a component well, it's valid to pick a
**composite** — combine 2 references and say which part each contributes (e.g. "big-number
treatment from [A], the per-item impact tag from [B]"). Do this instead of forcing one weak
single pick. Keep it to two references max; more than that means the component needs to be
split further in the inventory.

Always surface **1–2 runners-up** so the user can override the auto-pick cheaply.

---

## Step 4: Implementation brief (output)

One block per component, ordered by the inventory priority. This is what Claude codes
against.

```
# Component Implementation Plan: [Target UI name]

## Component Inventory
[the table from Step 1]

---

## [1. Component Name]

**Chosen reference:** [App](https://mobbin.com/screens/...)
[inline reference image]

**Why this one:** [1–2 lines grounded in the rubric — lead with style fit and what it
proves about the build.]

**Runners-up:** [App](url) — [one-line tradeoff] · [App](url) — [one-line tradeoff]

**Build spec:**
- **Structure:** [layout — container, child order, alignment, what wraps what]
- **Proportions:** [relative sizing, spacing rhythm, density — describe ratios, not exact px
  unless from a Figma token]
- **States:** [each state this component needs and how the reference handles it]
- **Interactions:** [tap/hover/drag/transition behavior visible or implied]
- **Tokens to map:** [which target design tokens fill color/type/spacing/radius/elevation]
- **Adaptations:** [what to change from the reference to fit the target UI]

---

## [2. Component Name]
...

---

## Build Order
Recommended implementation sequence and why (shared primitives first, then composites).

## Open Questions
Anything the references didn't resolve that needs a user decision before coding.
```

### Rules
- Every reference MUST be a clickable Mobbin URL with the app name. No URL → don't cite it.
- Describe proportions and rhythm, not invented pixel values — unless the value comes from a
  Figma token (Adapter C) or the user's existing code (Adapter D).
- Keep the brief buildable: a frontend engineer (or Claude) should be able to implement each
  component from its block without reopening Mobbin.
- If a component is a trivial standard primitive with no domain nuance, say "standard
  [button/checkbox]; use the design system default" instead of spending a search on it.
