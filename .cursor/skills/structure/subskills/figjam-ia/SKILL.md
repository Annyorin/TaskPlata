---
name: figjam-ia
description: Pre-DS / Structure — sitemap и user flows на FigJam через Figma MCP. Использовать когда DS ещё нет или нужна карта продукта в board: «sitemap», «user flow в FigJam», «собери флоу на доске».
---

# FigJam IA — sitemap и user flows

## Среда

`04-prototype/`. Результаты:
- FigJam board (Figma);
- `flows/figjam.md` по [`figjam-board.md`](../../../../../_shared/templates/figjam-board.md).

Вход: `01-research/outputs/prd.md` (и digest при необходимости).  
Перед MCP: `infra/figma-mcp` + skill FigJam (`figma-use-figjam`).

## Process

1. Из PRD выпиши экраны / разделы и ключевые флоу (Must stories).
2. Создай или открой FigJam board; зафиксируй fileKey в `flows/figjam.md`.
3. **Sitemap**: узлы разделов и экранов, иерархия.
4. **User flows**: стрелки start → steps → success/error; не больше 3–5 главных флоу за проход.
5. Заполни таблицу в `flows/figjam.md`; при необходимости дополни текстовый граф через `ia-first`.
6. Если board новый — напомни зарегистрировать fileKey (владелец Prototype) через контракт/реестр среды 2 при публикации.

## Gate

- [ ] URL + fileKey записаны;
- [ ] sitemap покрывает in-scope экраны из PRD;
- [ ] ≥1 user flow с началом и концом.

## Rules

- Не собирать hi-fi и не создавать DS Variables здесь.
- Не читать внутренности `02-design-system/` — только outputs при необходимости позже.
