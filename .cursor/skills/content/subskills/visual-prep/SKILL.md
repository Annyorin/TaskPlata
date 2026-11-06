---
name: visual-prep
description: Фазы 2–3 контента — визуальный бриф и JSON-промпт (режим t2i/i2i/reference/inpaint, выбор инструмента). Использовать перед генерацией любого изображения: роль ассета, эмоция, ограничения, воспроизводимый промпт.
---

# Visual Prep — фазы 2–3

## Среда

`03-content/`. Результаты:
- `visual/briefs/<asset>.md` — [`visual-brief.md`](../../../../../_shared/templates/visual-brief.md);
- `visual/prompts/<asset_key>.json` — [`visual-prompt.json.md`](../../../../../_shared/templates/visual-prompt.json.md).

Предусловие: `strategy/tone-of-voice.md`, `01-research/outputs/research-digest.md`.

## Goal

Зафиксировать **что** нужно на кадре и **как** генерировать — до кликов в инструменте.
Корневые решения (режим, архитектура) переживут смену модели.

## Process

### A. Бриф

1. Для каждого ассета задай `asset_key` (как у текста: `onboarding.hero`).
2. Роль в продукте — смыслом, не frame Figma.
3. Цель и эмоция — из инсайтов и ToV.
4. Ограничения: aspect, палитра, a11y, legal.
5. Рекомендуй инструмент по матрице в `VISUAL-PIPELINE.md` §4.

### B. Foundations / JSON

1. **Режим** (`mode`) — §2 VISUAL-PIPELINE.
2. **Инструмент** (`tool`) — согласовать с брифом.
3. **Архитектура** (заметка в `notes`): диффузия — серии/текстуры; гибрид — текст в кадре.
4. Заполни JSON: style, composition, subject, scene, lighting.
5. Серия: общий `series_id`, меняется `subject` / `series_index`.
6. i2i / коллаж: `i2i.source` + `strength` 0.35–0.55.

## Gate

**Бриф:**
- [ ] asset_key уникален;
- [ ] трассировка к digest;
- [ ] инструмент выбран (или TBD с причиной).

**JSON:**
- [ ] валиден по схеме;
- [ ] mode + tool согласованы;
- [ ] negative для типичных артефактов.

Без прохождения обоих gate → не вызывать `visual-generate`.

## Rules

- Один бриф — один ассет; набор иконок — бриф-сет с `grid` в JSON.
- Промпт-проза не заменяет JSON.
- Не хардкодить «магические» слова модели — структура важнее.

Канон: [`VISUAL-PIPELINE.md`](../../../../../_shared/content/VISUAL-PIPELINE.md) §1–4.
