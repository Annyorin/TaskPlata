---
type: reference
status: active
updated: 2026-09-02
---

# Визуальная генерация — справочник для дизайнера

Краткий обзор пайплайна среды 3. Канон процедур — `_shared/content/VISUAL-PIPELINE.md`
и скиллы группы `content`.

## Чему учит пайплайн

1. Различать диффузионные и гибридные модели — выбирать инструмент осознанно.
2. Выбирать режим: t2i, i2i, reference, in/out-painting.
3. Писать JSON-промпты для воспроизводимых серий.
4. Midjourney sref — единый стиль иллюстраций.
5. Krea — Flux 2, real-time canvas, Style Explorer, апскейл.
6. Nano Banana Pro — метод «Сетка 4K» для брендовых наборов.
7. GPT Image — многошаговое редактирование и style transfer.
8. Коллаж low-fi → финал через image-to-image.
9. Figma Weave — ноды Welcome → Iterations → Editing → Compositor.

## Быстрый выбор инструмента

| Нужно | Команда агенту |
|-------|----------------|
| Бриф + JSON | `visual-prep` |
| Серия иллюстраций (sref) | `visual-generate` + Midjourney |
| Найти композицию быстро | `visual-generate` + Krea canvas |
| Финальное качество | `visual-generate` + Krea Flux 2 + upscale |
| 16 иконок в одном стиле | `visual-generate` + Nano Banana сетка 4K |
| Убрать объект / текст в кадре | `visual-generate` + GPT Image |
| Коллаж → финал | `visual-generate` + collage-i2i |
| Собрать слои | `figma-weave` Compositor |

## Граница с другими средами

| Задача | Среда |
|--------|-------|
| Hero-иллюстрация, маркетинговый визуал | Content (`03-content`) |
| UI-экраны, компоненты | Prototype + DS |
| «Дешёвый» сгенерённый UI | `quality/design-anti-slop` |
| STYLE_GUIDE из Dribbble | `ds/style-decompose` |
