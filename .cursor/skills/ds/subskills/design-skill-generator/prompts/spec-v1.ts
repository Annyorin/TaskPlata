import type { PromptVersion } from "./types";

const SECTION_PROMPTS: Record<string, string> = {
  colors: `COLOR SYSTEM: Extract every visible color and assign a semantic role name. Output as a CSS :root {} custom properties block — do not describe colors as "blue" or "dark", always name by role (e.g. --color-nav-bg, --color-accent-primary, --color-card-border). Include every hex value you can identify. Note which colors are explicitly never used (e.g. no pure white backgrounds, no red accents).

Example output format:
:root {
  --color-nav-bg: #1a1a2e;
  --color-surface: #f4f4f4;
  --color-text-primary: #1a1a1a;
  --color-accent-primary: #4f46e5;
  --color-card-border: #e5e7eb;
}`,

  components: `COMPONENTS: Describe every recurring component visible across the screens as a mini CSS spec block. Cover every component — cards, buttons, nav, inputs, badges, tables, charts, etc. Reference CSS variables from tokens.css rather than hardcoding hex values.

Example output format:
Stat card:
  background: var(--color-card-bg)
  border-top: 3px solid {category-accent}
  border-radius: var(--card-border-radius)
  padding: var(--spacing-card-padding)
  box-shadow: var(--card-shadow)

Primary button:
  background: var(--color-accent-primary)
  border-radius: var(--button-border-radius)
  padding: var(--spacing-button-padding)
  font-size: var(--font-size-button)
  font-weight: var(--font-weight-button)
  text-transform: none`,

  spacing: `SPACING & LAYOUT: Extract concrete values only — no ranges, no approximations. Reference CSS variables from tokens.css.

Example output format:
Page max-width: var(--spacing-page-max-width)
Content padding: var(--spacing-content-padding)
Card gap: var(--spacing-card-gap)
Nav height: var(--spacing-nav-height)
Section gap: var(--spacing-section-gap)
Grid columns: 12
Grid gutter: var(--spacing-grid-gutter)`,

  antipatterns: `DO'S & DON'TS: Provide 6-10 paired rules — for each constraint, give both the prohibition and its positive counterpart. Reference specific values visible in the screens. Be opinionated and specific, not generic.

Format:
Do: Use [specific thing] in [specific context] — e.g. "Use Ferrari Red (#ff0000) exclusively for primary CTAs and hover states"
Don't: [specific thing in specific context] — e.g. "Don't scatter Ferrari Red as a theme color — it signals action, not brand presence"

Cover the most distinctive decisions: color use, border treatment, shadow philosophy, border-radius choices (and which radius applies to which component type), typography constraints, spacing density, component-level rules (button styles, card variants, badge shapes), and anything that makes this system's identity non-negotiable.`,

  iconography: `ICONOGRAPHY: Extract the icon system from the screens. Specify:
- Style: outline / filled / duotone / other
- Size scale: list every icon size used (e.g. 16px, 20px, 24px)
- Stroke weight: e.g. 1.5px, 2px (for outline icons)
- Color rules: monochrome (inherits text color) or colored — if colored, which colors and when
- Label rules: when do icons appear with labels vs alone? Is there a consistent pattern?
If no icons are visible, state "no icons visible in these screens".`,

  forms: `FORMS (if present): Document every form pattern visible across screens as a spec.

Input field:
  height: Xpx
  border: 1px solid #xxxxxx
  border-radius: Xpx
  padding: Xpx Xpx
  font-size: Xpx
  background: #xxxxxx
  focus-border: #xxxxxx
  focus-outline: none | X

Label:
  position: above | inline | floating
  font-size: Xpx
  font-weight: X
  color: #xxxxxx
  required-indicator: * | none | other

Validation & errors:
  error-border-color: #xxxxxx
  error-message-position: below field | tooltip | top of form
  error-message-style: font-size, color, any icon
  success-state: describe if visible

Field grouping:
  gap-between-fields: Xpx
  fieldset-style: bordered | none | other
  submit-button-position: right | left | full-width | other

If no forms are visible across any screen, write "No forms visible — omit this section".`,

  datadisplay: `DATA DISPLAY (if present): Document every pattern used to present structured data.

Tables (if present):
  header-background: #xxxxxx
  header-font: size, weight, color, transform
  row-height: Xpx
  row-border: describe
  hover-state: background color
  striping: yes | no
  cell-padding: Xpx Xpx

Stat cards (if present):
  layout: describe value + label arrangement
  value: font-size, weight, color
  label: font-size, weight, color, transform
  trend indicators: describe up/down styling
  accent: border-top, left border, background tint, or none

Lists (if present):
  style: bulleted | numbered | plain | icon-prefixed
  item-spacing: Xpx
  dividers: yes | no

Key-value pairs (if present):
  key-style: font-size, weight, color
  value-style: font-size, weight, color
  layout: inline | stacked | grid

If none of these patterns are visible, write "No data display patterns visible — omit this section".`,
};

const ALWAYS_INCLUDED_PROMPTS = [
  `VISUAL THEME & ATMOSPHERE (always required): In 200-300 words, describe the design system's philosophy, emotional intent, and visual identity. What metaphor or reference guides it (e.g. "editorial magazine", "minimalist engineering", "warm approachability", "blank canvas")? What aesthetic decisions are most distinctive? What feeling does the system create and why? Be specific — reference the actual visual evidence: specific colors, border treatments, shadow approach, typography choices.

Then provide a Key Characteristics bullet list (6-10 items) that summarizes the system's non-negotiable identity traits. Each bullet should reference a specific value or pattern visible in the screens (e.g. "Warm neutral grays with yellow-brown undertones (#f6f5f4) — never blue-gray", "Ultra-thin 1px rgba(0,0,0,0.1) borders — borders as whispers not walls").`,

  `TYPOGRAPHY (always required): Extract every text style as a spec table. One row per text style visible across the screens. No prose.

| Style name | font-family | size | weight | color | line-height | letter-spacing | transform |
|------------|-------------|------|--------|-------|-------------|----------------|-----------|

Cover every distinct text style — from display hero down to micro-labels. Include rem equivalents where the px size is notable (e.g. 64px / 4rem).

Then add a Typography Principles subsection:
- How does letter-spacing scale across sizes? (provide the formula or anchor points)
- What is the weight distribution philosophy? (which weights are used and when)
- What OpenType features are enabled and why?
- What is forbidden? (no italic, no serif, minimum size, etc.)`,

  `INTERACTION STATES (always required): For every interactive component (buttons, inputs, links, nav items), specify each state as a mini diff:
  default → hover → focus → active → disabled
Include exact color changes, border changes, cursor value, and any transition. If a state is not visible in the screens, write "not visible — infer from system".`,

  `MOTION & TRANSITIONS (always required): List every animation or transition visible in the screens. Format:
| Element | property | duration | easing |
|---------|----------|----------|--------|
If no animations are present, state "no motion — this system is static" explicitly.`,

  `RESPONSIVE BEHAVIOUR (always required): Document breakpoints with exact pixel widths and describe what changes at each.

| Breakpoint | Width range | Layout changes |
|------------|-------------|----------------|

For each breakpoint include:
- Which components collapse, stack, or hide
- Specific text size scaling (e.g. "hero 64px → 40px → 26px on mobile")
- Padding and spacing changes (e.g. "section padding 80px → 48px → 24px")
- Navigation changes (hamburger, collapse, etc.)
- Image/media scaling strategy

If only one viewport is visible, note that and infer from layout structure.`,

  `SEMANTIC COLOR GROUPS (always required): Look for colors that are used as a system — where the same set of colors appears repeatedly to represent categories, states, or entity types. Document each as a named group.

Format:
Named color groups:
  family:
    background: #d6ede6
    text: #1a2b4a
    accent: #2e7d5e
    button: #1a2b4a
  criminal:
    background: #d6e8f5
    text: #1a2b4a
    accent: #1a56a0
    button: #1a2b4a
  /* etc */

If no semantic color groups exist, write "No semantic color groups — single theme system".

Also add each semantic color to the :root {} block in tokens.css using the group name as a prefix:
  --color-family-bg: #d6ede6;
  --color-family-text: #1a2b4a;
  --color-family-accent: #2e7d5e;
  --color-criminal-bg: #d6e8f5;
  /* etc */`,

  `PAGE LAYOUT TEMPLATES (always required): Document the macro page structures visible across all screens. For each distinct page type seen:

Page type name:
  structure: describe the overall layout (e.g. full-width hero + sidebar + main, or top nav + left sidebar + content area)
  max-content-width: Xpx
  sidebar-width: Xpx | none
  sidebar-position: left | right | none
  hero-pattern: full-bleed image | solid color | none | describe overlay approach
  header-height: Xpx
  footer: present | none | describe
  content-padding: Xpx Xpx

Note any layout patterns that appear on every page (persistent nav, persistent sidebar, sticky elements).`,

  `NAVIGATION PATTERNS (always required): Document every navigation mechanism visible across screens.

Primary nav:
  style: top bar | sidebar | both
  height/width: Xpx
  background: #xxxxxx
  link-style: font-size, weight, color
  active-state: describe indicator (underline, background, left border, etc.)
  hover-state: describe

Breadcrumbs (if present):
  separator: character or icon used
  font-size: Xpx
  color: #xxxxxx
  active-item-style: bold | color | other

Secondary/sidebar nav (if present):
  width: Xpx
  section-heading-style: describe
  active-item: left border color and width, background, text color
  indent-level: Xpx per level
  expand-icon: + | chevron | other

Pagination (if present): describe style

Tabs (if present): describe active indicator style

If a pattern is not visible, write "not visible".`,

  `FEEDBACK & STATUS PATTERNS (always required): Document every pattern used to communicate status, errors, warnings, or empty states.

Alert/notice banners (if present):
  background: #xxxxxx
  border: describe (left accent | full border | none)
  icon: present | none
  font-size: Xpx
  variants: info | warning | error | success — describe each with colors

Inline error messages (if present):
  position: below field | above field | tooltip
  color: #xxxxxx
  font-size: Xpx
  icon: present | none

Toast/notification (if present): describe

Empty states (if present):
  layout: centered | left-aligned
  illustration: present | none
  heading style: describe
  CTA: present | none

Loading states (if present): spinner | skeleton | progress bar — describe styling

Page-level error states (404, 500 etc — if visible): describe

If a pattern is not visible across any screen, write "not visible — omit".`,

  `IMAGERY & MEDIA (always required): Document how images and media are used across screens.

Hero images:
  width: full-bleed | contained | none
  aspect-ratio: describe or measure
  overlay: none | gradient | solid color card | describe approach
  overlay-position: bottom-left | center | full | other
  text-on-image: yes | no — if yes describe text style

Content images:
  style: full-bleed | rounded | with caption | card-contained
  border-radius: Xpx
  caption-style: if present, describe

Thumbnail/card images:
  aspect-ratio: describe
  object-fit: cover | contain
  border-radius: Xpx

If no images are present across any screen write "No imagery patterns — text-only system".`,

  `AGENT ITERATION GUIDE (always required): Write 7-10 numbered rules that an AI coding agent must follow when building with this design system. These are system-specific — not generic best practices. Reference actual values and patterns from the screens.

Each rule must be:
- Actionable (tells the agent what to do or not do)
- Specific (references a hex value, px measurement, or named pattern)
- Explanatory (includes the "why" in brief)

Example format:
1. Always use warm neutrals — the gray scale carries yellow-brown undertones (#f6f5f4, #615d59, #a39e98), never blue-gray. Blue-gray breaks the warmth that defines this system.
2. Letter-spacing scales with font size: -2.125px at 64px, -1.875px at 54px, normal at 16px and below. Never apply negative tracking to body text.
3. Borders are whispers: 1px solid rgba(0,0,0,0.1) — never heavier. A 2px border destroys the lightness.

Cover the most critical constraints: color use, border philosophy, shadow rules, typography scaling, spacing density, radius system (which radius values apply to which component types), component-specific rules (how buttons, cards, badges, inputs behave differently from each other), what to never reach for.`,
];

function buildPrompt(opts: string[], skillName: string, screenCount: number, hasFigmaData: boolean): string {
  const selectedSections = opts.map((o) => SECTION_PROMPTS[o]).filter(Boolean).join("\n\n");
  const alwaysSections = ALWAYS_INCLUDED_PROMPTS.join("\n\n");
  const name = skillName || "design-system";

  const contextNote = hasFigmaData
    ? `You have been given structured design token data from Figma (colors, text styles, components) alongside rendered frame images. Use the structured data for exact values and the images for visual context, layout feel, and patterns the API doesn't capture.`
    : screenCount > 1
    ? `You have been given ${screenCount} screens from the same design system. Analyze them together — consistent patterns are system rules, variations are noted as such.`
    : `Analyze the uploaded design screenshot carefully.`;

  return `Output ONLY the SKILL.md file. No preamble, no analysis, no thinking out loud, no explanation before or after. Do not write sentences like "I'll analyze..." or "Here is the skill file". Start your response with the --- frontmatter delimiter and end it with the last line of the Quick reference table. Nothing else.

Output exactly two files separated by delimiters. First the tokens.css file preceded by ===TOKENS_CSS===, then the SKILL.md preceded by ===SKILL_MD===. No other text. Nothing before ===TOKENS_CSS=== and nothing after the last line of the SKILL.md.

You are a senior design systems engineer. ${contextNote}

Extract the following:
${selectedSections}

${alwaysSections}

The tokens.css file must be a complete :root {} block containing every extracted value as a CSS custom property — colors, font sizes, font weights, spacing values, border radii, shadow definitions, z-index scale, navigation dimensions, form variables, and feedback colors. Group them with comments:

/* Colors */
--color-nav-bg: #1a2b4a;

/* Typography */
--font-size-page-title: 32px;
--font-weight-page-title: 700;

/* Spacing */
--spacing-card-padding: 20px 24px;
--spacing-section-gap: 32px;

/* Components */
--card-border-radius: 0px;
--card-shadow: none;
--card-border-top-width: 3px;

/* Navigation */
--nav-height: 56px;
--nav-bg: #1a2b4a;
--sidebar-width: 240px;

/* Forms */
--input-height: 36px;
--input-border: 1px solid #e0e0e0;
--input-border-radius: 4px;
--error-color: #c0392b;

/* Feedback */
--alert-info-bg: #e8f0fe;
--alert-error-bg: #fdecea;
--alert-warning-bg: #fff8e1;
--alert-success-bg: #edf7ed;

/* Z-index */
--z-nav: 100;
--z-modal: 200;

/* Semantic color groups */
--color-{group}-bg: ...;
--color-{group}-text: ...;
--color-{group}-accent: ...;
--color-{group}-button: ...;

The SKILL.md should reference these variables throughout rather than hardcoding hex values — e.g. background: var(--color-nav-bg) in component specs.

Output structure:

===TOKENS_CSS===
:root {
  /* Colors */
  --color-...: ...;

  /* Semantic color groups */
  --color-{group}-bg: ...;
  --color-{group}-text: ...;
  --color-{group}-accent: ...;

  /* Typography */
  --font-size-...: ...;

  /* Spacing */
  --spacing-...: ...;

  /* Components */
  --...: ...;

  /* Navigation */
  --nav-...: ...;
  --sidebar-...: ...;

  /* Forms */
  --input-...: ...;
  --error-color: ...;

  /* Feedback */
  --alert-...: ...;

  /* Z-index */
  --z-...: ...;
}
===SKILL_MD===
---
name: ${name}
description: [1 sentence: when should an AI coding agent load this skill?]
---

# ${name}

## Visual theme & atmosphere

[200-300 words describing the design philosophy, emotional intent, and visual identity. Reference specific colors, border treatments, shadow approach, and typography choices visible in the screens.]

**Key characteristics:**
- [specific trait with value — e.g. "Warm neutral grays (#f6f5f4) — yellow-brown undertones, never blue-gray"]
- [6-10 bullets total]

## Design personality

[2-3 sentences: aesthetic direction, feel, reference products or design systems]

## CSS variables

See tokens.css — import it at the root of your app.

## Color system

[Semantic role names and their token names, organized by layer: Primary / Brand Secondary / Neutral Scale / Semantic Accents / Interactive / Shadows & Depth. Note colors that are never used.]

## Semantic color groups

[Named groups with background, text, accent, and button colors per category.
Or "No semantic color groups — single theme system" if not applicable.]

## Typography

[Spec table — one row per text style: Style name / font-family / size / weight / color / line-height / letter-spacing / transform]

### Typography principles

[Letter-spacing scaling formula, weight distribution philosophy, OpenType features, forbidden choices]

## Iconography

[Style, size scale, stroke weight, color rules, label rules]

## Spacing & layout

[Concrete values only: page max-width, content padding, card gap, nav height, grid columns, gutter — reference var(--token-name)]

[Whitespace philosophy: how does whitespace function in this system? How do sections relate through space? What visual pacing or alternation creates rhythm?]

## Navigation patterns

[Primary nav, breadcrumbs, sidebar nav, tabs — all with specific values]

## Do's & don'ts

[6-10 paired rules: each with a Do and a Don't, referencing specific values and patterns from the screens]

## Interaction states

[Per-component state specs: default → hover → focus → active → disabled]

## Motion & transitions

[Element / property / duration / easing table, or "no motion — this system is static"]

## Responsive behaviour

[Breakpoint table with exact width ranges, specific text scaling (e.g. hero 64px → 40px → 26px), padding changes, and component collapse behavior]

## Page layout templates

[Per page-type layout specs]

## Forms

[Input specs, label position, validation, error states — or "No forms visible"]

## Data display

[Tables, stat cards, lists, key-value pairs — or "No data display patterns visible"]

## Feedback & status

[Alert banners, inline errors, empty states, loading — or "not visible" per pattern]

## Imagery & media

[Hero, content, thumbnail patterns — or "No imagery patterns"]

## Component rules

[Every component as a mini CSS spec block — reference var(--token-name) throughout. Include distinctive/custom components (trust bars, metric cards, carousels, etc.) not just standard buttons/cards/inputs.]

## Agent iteration guide

[7-10 numbered rules specific to this system. Each rule must reference actual values and explain the why.]

## Quick reference

| Property | Value |
|----------|-------|
| Primary CTA color | var(--color-accent-primary) — #xxxxxx |
| Background | var(--color-surface) — #xxxxxx |
| Alt background | var(--color-surface-alt) — #xxxxxx |
| Primary text | var(--color-text-primary) — #xxxxxx |
| Secondary text | var(--color-text-secondary) — #xxxxxx |
| Border | var(--color-border) — #xxxxxx |
| Link color | var(--color-link) — #xxxxxx |
| Focus color | var(--color-focus) — #xxxxxx |
| Card shadow | var(--card-shadow) |
| Border radius (cards) | var(--card-border-radius) |
| Border radius (buttons) | var(--button-border-radius) |
| Heading font | ... |
| Body font | ... |
| Spacing base | ... |

---

Use only the colors extracted from these screens. Do not introduce any color not present in the palette. Every measurement must be a specific pixel value, not a range or approximation. Do not invent values — if something is unclear, omit it rather than guess.`;
}

const specV1: PromptVersion = {
  id: "spec-v1",
  name: "Spec v1",
  description: "High-fidelity spec output with CSS variables, typography tables, and component mini-specs. Designed for direct use in codebases.",
  sectionPrompts: SECTION_PROMPTS,
  buildPrompt,
};

export default specV1;
