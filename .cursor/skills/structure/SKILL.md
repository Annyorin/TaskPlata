---
name: structure
description: Роутер группы «структура» (5 подскиллов) — FigJam sitemap/flows, сценарии, IA, HTML wireframes, low-fi в Figma MCP. Применять на «куда что ведёт», «sitemap», «FigJam», «сценарии», «low-fi», «вайрфреймы», «pre-DS» — когда конкретный подскилл не назван.
---

# Structure — роутер группы

Среда: `04-prototype/`. Канон pre-DS: [`_shared/structure/PRE-DS-PIPELINE.md`](../../../_shared/structure/PRE-DS-PIPELINE.md).

Подскиллы — `subskills/<имя>/SKILL.md`.

| Задача | Подскилл |
|--------|----------|
| sitemap + user flows в FigJam | `figjam-ia` |
| сценарии из PRD / user stories | `scenario-map` |
| текстовый граф навигации (IA.md) | `ia-first` |
| доска серых каркасов HTML | `wireframe-board` |
| low-fi в Figma через MCP + component inventory | `wireframe-figma` |

## Pre-DS порядок (DS ещё нет)

```
figjam-ia → scenario-map → wireframe-figma → (задача в ds)
```

`ia-first` / `wireframe-board` — по желанию параллельно; перед сборкой DS канон — Figma low-fi + inventory.

Вход: `01-research/outputs/prd.md`. Зеркало DS на pre-DS не обязательно.

## После появления DS

Обычный цикл Prototype: зеркало → hi-fi из компонентов. Low-fi не смешивать с инстансами DS без обновления SCREEN-MAP.

## Дедуп-вахта

- `figjam-ia` vs `ia-first`: FigJam — доска для команды; ia-first — текстовый граф в репо.
- `wireframe-figma` vs `wireframe-board`: Figma MCP vs HTML-обзор.
- `wireframe-figma` vs `ds/handoff-to-figma`: каркасы экранов vs библиотека Variables/компонентов.
- Требования — `discovery`; здесь структура из готового PRD.
