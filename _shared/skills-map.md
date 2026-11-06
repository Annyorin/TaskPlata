---
type: map
updated: 2026-09-02
---

# Карта скиллов

**Правило.** 35 скиллов в 7 группах-мультискиллах в `.cursor/skills/`.
Триггерятся только роутеры; подскилл — файл `<группа>/subskills/<имя>/SKILL.md`.

Обновляй также [`infoSkills.md`](../infoSkills.md).

**7 групп:** `discovery` (8) · `content` (6) · `structure` (5) · `ds` (4) · `build` (3) ·
`quality` (5) · `infra` (4).

## Группы

| Группа | Зона | Среда | Подскиллы |
|--------|------|-------|-----------|
| `discovery` | исследование → PRD | 01 | `research-scope`, `recursive-briefing`, `deep-research`, `competitive-scan`, `ux-heuristics-audit`, `insight-synthesis`, `hypothesis-builder`, `research-to-prd` |
| `content` | ToV, copy, визуал | 03 | `tone-of-voice`, `copy-writing`, `visual-prep`, `visual-generate`, `figma-weave`, `content-package` |
| `structure` | pre-DS, IA, wireframes | 04 | `figjam-ia`, `scenario-map`, `ia-first`, `wireframe-board`, `wireframe-figma` |
| `ds` | Figma DS | 02 | `style-decompose`, `handoff-to-figma`, `figma-ds-link`, `design-system-sync` |
| `build` | React-зеркало, live app, ship | 05 | `ds-to-code`, `app-live`, `ship` |
| `quality` | ревью + юзер-тесты | 04, 05 | `design-review`, `design-anti-slop`, `design-decompose`, `emil-design-eng`, `user-test-loop` |
| `infra` | MCP, git, handoff, architect | любая | `figma-mcp`, `git-github-check`, `env-handoff`, `skills-architect` |

## Build / Quality (ship-контур)

**build**: `ds-to-code` — токены + React-база + Storybook · `app-live` — screens + wire ·
`ship` — GitHub + Vercel/Netlify/CF/VPS.

**quality**: + `user-test-loop` — findings → evaluator-optimizer петля.

Канон: [`code/PIPELINE.md`](code/PIPELINE.md).

## Разграничение (ship)

| Задача | Скилл | Не путать с |
|--------|-------|-------------|
| Storybook / react_base | `ds-to-code` | `ds/handoff-to-figma` — Figma |
| оживить экраны | `app-live` | `emil-design-eng` — только моушен |
| деплой / GitHub handoff | `ship` | `git-github-check` — только health |
| находки теста | `user-test-loop` | `design-review` — без тестеров |

## Конвейер

```
… → ds-manifest → ds-to-code → app-live → ship → user-test-loop → …
```
