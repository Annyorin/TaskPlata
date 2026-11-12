import type { PromptVersion } from "./types";

const SECTION_PROMPTS: Record<string, string> = {
  colors: "COLOR SYSTEM: Extract exact colors with hex values. List background, surface, text, accent, and border colors. Note which colors are never used.",
  components: "COMPONENTS: Identify every recurring component. Include specific px values for border-radius, shadow rules, padding density. Reference CSS variables from tokens.css rather than hardcoding hex values.",
  antipatterns: "DO'S & DON'TS: Provide 6-10 paired rules — for each constraint give both the prohibition and its positive counterpart. Reference specific values visible in the screens. Cover color use, border treatment, shadow philosophy, border-radius choices (and which radius applies to which component type), typography constraints, spacing density, component-level rules (button styles, card variants, badge shapes). Be opinionated and specific, not generic.",
  spacing: "SPACING & LAYOUT: Describe spatial rhythm, grid structure, consistent padding patterns, container widths. Reference CSS variables from tokens.css.",
  iconography: "ICONOGRAPHY: Describe the icon style (outline, filled, duotone), size scale, stroke weight, whether icons are monochrome or colored, and when icons appear with vs without labels. If no icons are visible, say so.",
  forms: "FORMS (if present): Describe every form pattern visible — input field appearance, label positioning, validation behavior, error state styling, field grouping, and submit button placement. If no forms are visible across any screen, write \"No forms visible — omit this section\".",
  datadisplay: "DATA DISPLAY (if present): Describe every pattern used to present structured data — tables (headers, rows, hover, striping), stat cards (value/label layout, trend indicators, accents), lists (style, spacing, dividers), and key-value pairs (layout, typography). If none of these patterns are visible, write \"No data display patterns visible — omit this section\".",
};

const ALWAYS_INCLUDED_PROMPTS = [
  `VISUAL THEME & ATMOSPHERE (always required): In 200-300 words, describe the design system's philosophy, emotional intent, and visual identity. What metaphor or reference guides it? What aesthetic decisions are most distinctive? What feeling does the system create and why? Reference specific visual evidence: actual colors, border treatments, shadow approach, typography choices.

Then provide a Key Characteristics bullet list (6-10 items) summarizing the system's non-negotiable identity traits — each referencing a specific value or pattern (e.g. "Warm neutral grays with yellow-brown undertones — never blue-gray").`,

  `TYPOGRAPHY (always required): Identify font families, weights, and sizes for every text role visible — headings, body, labels, captions, UI text. Note forbidden font choices and any typographic rules this design enforces.

Also describe the Typography Principles: how letter-spacing scales across sizes, the weight distribution philosophy (which weights are used and when), any OpenType features, and what is explicitly forbidden.`,

  `INTERACTION STATES (always required): For every interactive component (buttons, inputs, links, nav items), describe how it looks in each state: default, hover, focus, active, and disabled. Note color changes, border changes, and cursor. If a state isn't visible, note it and infer from the system.`,

  `MOTION & TRANSITIONS (always required): Describe any animations or transitions visible in the design. If there are none, explicitly state that this is a static system with no motion.`,

  `RESPONSIVE BEHAVIOUR (always required): Describe how the layout adapts across breakpoints. Include exact pixel width ranges for each breakpoint, specific text size scaling (e.g. "hero 64px → 40px → 26px on mobile"), padding changes per breakpoint, and which components collapse or stack. If only one viewport is visible, note that and infer from the layout structure.`,

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

  `PAGE LAYOUT TEMPLATES (always required): Describe the macro page structures visible across all screens. For each distinct page type, describe the overall layout, approximate content width, sidebar presence and position, hero pattern, header height, footer, and content padding. Note any structural elements that appear on every page (persistent nav, persistent sidebar, sticky elements). If only one page type is visible, describe it and note that.`,

  `NAVIGATION PATTERNS (always required): Describe every navigation mechanism visible — primary nav (style, dimensions, link appearance, active and hover states), breadcrumbs (separator, typography), secondary or sidebar nav (width, active item styling, indentation), pagination, and tabs. If a pattern is not visible, say so.`,

  `FEEDBACK & STATUS PATTERNS (always required): Describe every pattern used to communicate status, errors, warnings, or empty states — alert and notice banners (colors and border treatment per variant), inline error messages (position and style), toasts or notifications, empty states (layout and CTA), loading indicators, and page-level error states. If a pattern is not visible across any screen, note it.`,

  `IMAGERY & MEDIA (always required): Describe how images and media are used — hero images (bleed, aspect ratio, overlay approach), content images (treatment, captions), and thumbnail or card images (aspect ratio, object-fit, border radius). If no images are present write "No imagery patterns — text-only system".`,

  `AGENT ITERATION GUIDE (always required): Write 7-10 numbered rules that an AI coding agent must follow when building with this design system. System-specific, not generic. Each rule must reference an actual value or pattern from the screens and include a brief "why". Example: "Always use warm neutrals (#f6f5f4, #615d59, #a39e98) — never blue-gray. Blue-gray breaks the warmth that defines this system." Cover the most critical constraints: color use, border philosophy, shadow rules, typography scaling, spacing density, radius system (which values apply to which component types), component-specific rules (how buttons, cards, badges, and inputs behave differently from each other).`,
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

The tokens.css file must be a complete :root {} block containing every extracted value as a CSS custom property — colors, font sizes, font weights, spacing values, border radii, shadow definitions, z-index scale, navigation dimensions, form variables, and feedback colors. Group them with comments.

The SKILL.md should reference these variables throughout rather than hardcoding hex values.

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

  /* Forms */
  --input-...: ...;
  --error-color: ...;

  /* Feedback */
  --alert-...: ...;
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

[Aesthetic direction, feel, reference points]

## Color system

[Colors with token names and hex values, organized by layer: Primary / Brand Secondary / Neutral Scale / Semantic Accents / Interactive / Shadows & Depth. Note what to never use.]

## Semantic color groups

[Named groups with background, text, accent, and button colors per category.
Or "No semantic color groups — single theme system" if not applicable.]

## Typography

[Font families, hierarchy rules, forbidden choices]

### Typography principles

[Letter-spacing scaling formula, weight distribution philosophy, OpenType features, forbidden choices]

## Iconography

[Icon style, size scale, stroke weight, color rules, label rules]

## Spacing & layout

[Spatial rhythm, grid, density — using var(--token-name)]

[Whitespace philosophy: how whitespace functions, visual pacing, section alternation rhythm]

## Navigation patterns

[Primary nav, breadcrumbs, sidebar nav, tabs — all with specific values]

## Do's & don'ts

[6-10 paired rules — each with a Do and a Don't, referencing specific values and patterns from the screens]

## Interaction states

[Per-component state specs — default, hover, focus, active, disabled]

## Motion & transitions

[Animations and transitions visible, or "no motion — this system is static"]

## Responsive behaviour

[Breakpoint table with exact width ranges, specific text scaling, padding changes, and component collapse behavior]

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

[Every component with specific px values — radius, shadow, padding — using var(--token-name). Include distinctive/custom components (trust bars, metric cards, carousels, etc.) not just standard buttons/cards/inputs.]

## Agent iteration guide

[7-10 numbered rules specific to this system. Each rule must reference actual values and explain the why.]

## Quick reference

| Property | Value |
|----------|-------|
| Primary CTA color | ... — #xxxxxx |
| Background | ... — #xxxxxx |
| Alt background | ... — #xxxxxx |
| Primary text | ... — #xxxxxx |
| Secondary text | ... — #xxxxxx |
| Border | ... — #xxxxxx |
| Link color | ... — #xxxxxx |
| Focus color | ... — #xxxxxx |
| Card shadow | ... |
| Border radius (cards) | ... |
| Border radius (buttons) | ... |
| Heading font | ... |
| Body font | ... |
| Spacing base | ... |`;
}

const proseV1: PromptVersion = {
  id: "prose-v1",
  name: "Prose v1",
  description: "Gentler, prose-style output. Good for exploratory or narrative design documentation.",
  sectionPrompts: SECTION_PROMPTS,
  buildPrompt,
};

export default proseV1;
