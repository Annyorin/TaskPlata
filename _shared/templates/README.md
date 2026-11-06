---
type: index
updated: 2026-09-02
---

# Шаблоны артефактов

Каждый артефакт начинается с frontmatter: `type`, `env`, `status`, `updated`.

## Content (среда 03)

| Шаблон | Файл | Фаза |
|--------|------|------|
| Tone of voice | `tone-of-voice.md` | 0 |
| Визуальный бриф | `visual-brief.md` | 2–3 (`visual-prep`) |
| JSON-промпт | `visual-prompt.json.md` | 2–3 (`visual-prep`) |
| Weave pipeline | `weave-pipeline.md` | 5 |

Пайплайн: [`../content/PIPELINE.md`](../content/PIPELINE.md).

## Research → PRD (среда 01)

| Шаблон | Файл | Фаза |
|--------|------|------|
| Scope исследования | `research-scope.md` | 0 |
| Product brief | `product-brief.md` | 1 |
| Конкурент | `competitor.md` | 2 |
| Матрица конкурентов | `competitor-matrix.md` | 2 |
| SWOT | `swot.md` | 2 |
| UX-аудит (Нильсен) | `ux-heuristics-audit.md` | 2a |
| JTBD | `jtbd.md` | 3 |
| Прото-персона | `proto-persona.md` | 3 |
| Гипотезы Lean UX | `hypotheses.md` | 4 |
| Карта допущений | `assumptions.md` | 4 |
| PRD | `prd.md` | 5 |

Пайплайн: [`../research/PIPELINE.md`](../research/PIPELINE.md).

## Design System (среда 02)

| Шаблон | Файл |
|--------|------|
| Компонент DS | `ds-component.md` |
| Схема токенов | `tokens-schema.md` |
| Mirror-map Figma (структура) | `figma-mirror-map.json` |

## Code / parity (среда 05)

| Шаблон | Файл |
|--------|------|
| Отчёт сверки паритета | `parity-report.md` |
| User-test findings | `user-test-findings.md` |

## Prototype (среда 04)

| Шаблон | Файл |
|--------|------|
| Спецификация экрана | `screen-spec.md` |
| FigJam board | `figjam-board.md` |
| Карта сценариев | `scenario-map.md` |
| Component inventory | `component-inventory.md` |

Pre-DS: [`../structure/PRE-DS-PIPELINE.md`](../structure/PRE-DS-PIPELINE.md).

Контракт передачи между средами — [`../contracts/README.md`](../contracts/README.md).
