---
name: visual-generate
description: Фаза 4 контента — генерация визуальных ассетов по JSON-промпту. Роутинг: Midjourney sref, Krea Flux/canvas, Nano Banana сетка 4K, GPT Image edit/transfer, collage→i2i. Использовать когда visual-prep готов и нужен файл в visual/assets.
---

# Visual Generate — фаза 4

## Среда

`03-content/`. Результат: `visual/assets/<asset_key>.*` (+ sref / steps / collage по ветке).

Предусловие: `visual/briefs/<asset>.md` и `visual/prompts/<asset_key>.json` (скилл `visual-prep`).

## Routing

Выбери ветку по полю `tool` / `mode` в JSON. Детали — в `references/`:

| Задача / сигнал | Ветка | Файл |
|-----------------|-------|------|
| серии иллюстраций, sref, `tool: midjourney` | Midjourney | [`references/midjourney.md`](references/midjourney.md) |
| Flux 2, canvas, upscale, `tool: krea` | Krea | [`references/krea.md`](references/krea.md) |
| сетка иконок/паттернов, блок `grid` | Nano Banana | [`references/nano-banana.md`](references/nano-banana.md) |
| точечные правки, текст в кадре, style transfer | GPT Image | [`references/gpt-image.md`](references/gpt-image.md) |
| `mode: image-to-image` + коллаж | Collage → i2i | [`references/collage-i2i.md`](references/collage-i2i.md) |

Матрица канона: [`VISUAL-PIPELINE.md`](../../../../../_shared/content/VISUAL-PIPELINE.md) §4–9.

## Process

1. Прочитай JSON точечно — `tool`, `mode`, `i2i`, `grid`.
2. Открой нужный `references/*.md` и выполни его Process / Gate.
3. Финал → `visual/assets/`; обнови `notes` / seed в JSON.
4. Доводка слоёв в Figma — отдельно `figma-weave`, не здесь.

## Общий Gate

- [ ] файл ассета на месте;
- [ ] согласован с брифом и ToV;
- [ ] ветка-специфичный gate из reference пройден.

## Rules

- Один ассет — одна первичная ветка; GPT Image — только доводка после основной генерации.
- UI-макеты экранов — не здесь (`build/design-loop`, среда 4).
- Hero без sref в серии Midjourney — переделать.
