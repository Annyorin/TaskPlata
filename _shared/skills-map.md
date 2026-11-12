---
type: map
updated: 2026-11-09
---

# Карта скиллов

**Правило.** 74 скилла в 8 группах-мультискиллах в `.cursor/skills/`.
Триггерятся только роутеры; подскилл — файл `<группа>/subskills/<имя>/SKILL.md`.

Обновляй также [`infoSkills.md`](../infoSkills.md).

**8 групп:** `discovery` (8) · `content` (6) · `structure` (6) · `ds` (8) · `build` (3) ·
`quality` (9) · `infra` (4) · `triz` (34).

## Группы

| Группа | Зона | Среда | Подскиллы |
|--------|------|-------|-----------|
| `discovery` | исследование → PRD | 01 | `research-scope`, `recursive-briefing`, `deep-research`, `competitive-scan`, `ux-heuristics-audit`, `insight-synthesis`, `hypothesis-builder`, `research-to-prd` |
| `content` | ToV, copy, визуал | 03 | `tone-of-voice`, `copy-writing`, `visual-prep`, `visual-generate`, `figma-weave`, `content-package` |
| `structure` | pre-DS, IA, wireframes | 04 | `figjam-ia`, `scenario-map`, `ia-first`, `wireframe-board`, `wireframe-figma`, `figma-user-flow-planner` |
| `ds` | Figma DS | 02 | `style-decompose`, `handoff-to-figma`, `figma-ds-link`, `design-system-sync`, `mobbin-skill`, `mobbin-research`, `screenshot-to-design-system`, `design-skill-generator` |
| `build` | React-зеркало, live app, ship | 05 | `ds-to-code`, `app-live`, `ship` |
| `quality` | ревью + юзер-тесты + сверка Figma↔код + HCI-оценка флоу | 04, 05 | `design-review`, `design-anti-slop`, `design-decompose`, `emil-design-eng`, `user-test-loop`, `figma-code-parity`, `failure-path-audit`, `state-model`, `journey-map` |
| `infra` | MCP, git, handoff, architect | любая | `figma-mcp`, `git-github-check`, `env-handoff`, `skills-architect` |
| `triz` | противоречия, ИКР, приёмы | 01 | `contradiction-solver`, `physical-contradictions`, `ideality`, `triz-dissolve`, `triz-engineering-solver`, `triz-engine-analyze`, `triz-engine-ariz`, `triz-engine-ifr`, `triz-engine-matrix`, `triz-engine-principles`, `76-standard-solutions`, `cause-effect-chain-analysis`, `derivative-resources`, `feature-transfer`, `function-analysis`, `function-analysis-advanced`, `function-interaction-analysis`, `function-oriented-search`, `innovation-checklist`, `interactive-trimming`, `mpv-analysis`, `patent-analyzer`, `problem-operator`, `resource-analysis`, `root-cause-analysis`, `root-conflict-analysis`, `smart-little-people`, `sustainability-assessment`, `system-description`, `system-operator`, `trimming`, `business-function-analysis`, `perception-mapping`, `solutions-at-system-levels` |

## Build / Quality (ship-контур)

**build**: `ds-to-code` — токены + React-база + Storybook · `app-live` — screens + wire ·
`ship` — GitHub + Vercel/Netlify/CF/VPS.

**quality**: + `user-test-loop` — findings → evaluator-optimizer петля.
`figma-code-parity` — обязательная сверка компонента в коде с узлом Figma.

Канон: [`code/PIPELINE.md`](code/PIPELINE.md).

## Разграничение (ship)

| Задача | Скилл | Не путать с |
|--------|-------|-------------|
| Storybook / react_base | `ds-to-code` | `ds/handoff-to-figma` — Figma |
| оживить экраны | `app-live` | `emil-design-eng` — только моушен |
| деплой / GitHub handoff | `ship` | `git-github-check` — только health |
| находки теста | `user-test-loop` | `design-review` — без тестеров |
| код против узла Figma | `figma-code-parity` | `design-system-sync` — весь цикл синка |
| оценить блок-схему флоу | `journey-map` + `failure-path-audit` + `state-model` | `design-review` — экраны против DS |
| чеклист полноты флоу | `figma-user-flow-planner` | `scenario-map` — пошаговые сценарии |

## Конвейер

```
… → ds-manifest → ds-to-code → app-live → ship → user-test-loop → …
```
