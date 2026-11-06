---
type: spec
env: 04-prototype
updated: 2026-09-02
---

# Pre-DS pipeline — с нуля до foundations

Когда дизайн-системы в Figma ещё нет. FigJam, сценарии и low-fi живут в
`04-prototype/` (группа `structure`). Среда 2 подключается только после gate.

## Цепочка

```
PRD (01 outputs) → figjam-ia → scenario-map → wireframe-figma
  → component-inventory → [опц. content labels] → задача DS (handoff / foundations)
```

| Шаг | Скилл | Артефакт | Gate |
|-----|-------|----------|------|
| 0 | — | `01-research/outputs/prd.md` | PRD есть или сокращённый трек |
| 1 | `figjam-ia` | `flows/figjam.md` + FigJam board | sitemap + ≥1 user flow |
| 2 | `scenario-map` | `flows/scenarios.md` | сценарии из user stories |
| 3 | `wireframe-figma` | low-fi frames + `screens/` | серые экраны без DS-компонентов |
| 4 | (в конце wireframe-figma) | `flows/component-inventory.md` | список атомов для DS |
| 5 | задача в `ds` | `handoff-to-figma` / foundations | gate «с нуля» + pre-DS готов |

Альтернатива шагу 3 для быстрого обзора: `wireframe-board` (HTML) — не заменяет
Figma low-fi перед сборкой DS.

`ia-first` (текстовый граф) можно вести параллельно с FigJam; FigJam — канон для
команды в Figma.

## Явный skip

Пользователь может сказать «пропустить pre-DS». Тогда DS стартует без FigJam/low-fi;
в `NOTES.md` среды 2 или контракте зафиксировать риск: DS без инвентаря экранов.

## После pre-DS (не этот документ, но полный продукт)

1. Content keys / ToV — `03-content`
2. Style / brand → foundations — `style-decompose` или бриф
3. Сборка DS — `handoff-to-figma`
4. Состояния и a11y в компонентах
5. Hi-fi экраны на зеркале DS — Prototype
6. Интерактив / код — `figma-to-proto`, `05-code`

## Чтение чужих outputs

Pre-DS читает только:
- `01-research/outputs/prd.md`
- при необходимости `01-research/outputs/research-digest.md`

`ds-manifest` на pre-DS **не обязателен** (исключение для low-fi).
