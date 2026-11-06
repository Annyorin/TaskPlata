# Среда 3 — Content

Контент на основе исследований: тексты, микрокопи, нейминг, **визуальный пайплайн**
(генерация ассетов и сборка в Figma Weave).

Канон: [`../_shared/content/PIPELINE.md`](../_shared/content/PIPELINE.md).  
Визуал: [`../_shared/content/VISUAL-PIPELINE.md`](../_shared/content/VISUAL-PIPELINE.md).  
Вводные: [`../_shared/content/INPUT-FORMAT.md`](../_shared/content/INPUT-FORMAT.md).

## Границы

- Работаю только в `03-content/`.
- Единственный вход: `01-research/outputs/research-digest.md`. Внутренности среды 1 не читаю.
- Наружу отдаю `outputs/content-package.md` — его потребляет среда 4.
- **Figma Weave** — только для визуальных ассетов (фаза 5). Компоненты DS и экраны UI — среды 2 и 4.
- Контент описывается **ролью** («hero онбординга»), не именем компонента DS.

## Структура

| Каталог | Содержимое |
|---------|------------|
| `strategy/` | tone of voice, принципы коммуникации |
| `copy/` | тексты по экранам и сущностям (ключи `screen.element`) |
| `visual/briefs/` | брифы на изображения |
| `visual/prompts/` | JSON-промпты (воспроизводимые серии) |
| `visual/assets/` | финальные и промежуточные файлы |
| `visual/styles/` | sref-библиотека, референсы стиля |
| `visual/weave/` | схемы нодовых пайплайнов Figma Weave |
| `outputs/` | `content-package.md` |

Шаблоны — [`../_shared/templates/`](../_shared/templates/).  
Скиллы — группа `content` (6 подскиллов).

## Рабочий цикл

```
0 ToV → 1 copy → 2–3 visual-prep → 4 visual-generate → [5 figma-weave] → 6 content-package
```

1. Прочитай `research-digest.md` — сегменты, боли, язык аудитории.
2. `strategy/tone-of-voice.md` — до текстов и визуала.
3. `copy/` — стабильные ключи, трассировка к дайджесту.
4. Визуал: `visual-prep` (бриф + JSON) → `visual-generate` (routing по tool).
5. Опционально: Weave для композиции и доводки слоёв.
6. `outputs/content-package.md` — единая таблица для среды 4.

## Качество

- Текст и визуал трассируются до инсайта из дайджеста.
- Промпт JSON — источник правды для генерации; PNG — производное.
- Нет инсайта → контракт к среде 1, не додумывать.
- UI-макеты экранов — не здесь (`build/design-loop`, среда 4).
