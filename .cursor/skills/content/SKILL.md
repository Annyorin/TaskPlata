---
name: content
description: Роутер группы «контент» (6 подскиллов) — tone of voice, копирайт, visual-prep, visual-generate (MJ/Krea/Nano Banana/GPT/i2i), Figma Weave, content-package. Применять на «тексты», «tone of voice», «иллюстрация», «промпт», «Midjourney», «Krea», «Weave», «Flux», «генерация картинок», «визуальный ассет», «контент-пакет» — когда конкретный подскилл не назван.
---

# Content — роутер группы

Среда: `03-content/`. Канон: [`_shared/content/PIPELINE.md`](../../../_shared/content/PIPELINE.md).
Визуал: [`_shared/content/VISUAL-PIPELINE.md`](../../../_shared/content/VISUAL-PIPELINE.md).
Вход: [`01-research/outputs/research-digest.md`](../../../01-research/outputs/research-digest.md).

Подскиллы — `subskills/<имя>/SKILL.md`.

| Задача | Подскилл | Фаза |
|--------|----------|------|
| голос бренда, do/don't | `tone-of-voice` | 0 |
| тексты с ключами | `copy-writing` | 1 |
| бриф + JSON-промпт, режим, инструмент | `visual-prep` | 2–3 |
| генерация ассета (MJ / Krea / Nano Banana / GPT / i2i) | `visual-generate` | 4 |
| нодовый пайплайн Weave | `figma-weave` | 5 |
| пакет для Prototype | `content-package` | 6 |

## Полный цикл

```
tone-of-voice → copy-writing → visual-prep → visual-generate → [figma-weave] → content-package
```

**Gate** между фазами — в скилле. Визуал без `visual-prep` не генерировать.
Фаза 4 — **routing** внутри `visual-generate` по матрице VISUAL-PIPELINE.

## Публичный выход

`03-content/outputs/content-package.md` — среда 4.

## Дедуп-вахта

| Задача | Здесь | Не путать с |
|--------|-------|-------------|
| hero-иллюстрация, маркетинг-визуал | `visual-prep` / `visual-generate` | `build/design-loop` — UI-экраны |
| STYLE_GUIDE из референса | — | `ds/style-decompose` |
| компоненты и экраны Figma | — | среда 4 Prototype |
| Weave для ассетов | `figma-weave` | DS / UI в среде 2 |
| чистка ИИ-UI | — | `quality/design-anti-slop` |

Перед Weave: `infra/figma-mcp`.
