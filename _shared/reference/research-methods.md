---
type: reference
status: active
updated: 2026-09-02
---

# Методы исследования — справочник для дизайнера

Человекочитаемый обзор практик среды `01-research/`. Канон процедур — в
[`../research/PIPELINE.md`](../research/PIPELINE.md) и скиллах `discovery/`.

## Полный цикл (с опциональными фазами)

```
0 scope → 1 brief → [1a deep research] → 2 competitors + SWOT
  → [2a UX-аудит Нильсена] → 3 insights + прото-персоны
  → 4 hypotheses → 5 PRD (MoSCoW) → [buildin.ai]
```

## Методы

| Метод | Фаза | Скилл | Артефакт |
|-------|------|-------|----------|
| Рекурсивный брифинг (расширение → углубление → консолидация) | 1 | `recursive-briefing` | `briefs/01-product-brief.md` |
| Deep Research (Antigravity + Gemini DR) | 1a | `deep-research` | `sources/deep-research/*.md` |
| Конкурентный анализ + SWOT | 2 | `competitive-scan` | `competitors/*`, `_matrix.md`, `_swot.md` |
| UX-аудит по эвристикам Нильсена | 2a | `ux-heuristics-audit` | `insights/ux-heuristics-audit.md` |
| JTBD + прото-персоны + симуляция интервью | 3 | `insight-synthesis` | `insights/jtbd.md`, `insights/proto-personas/` |
| MoSCoW-приоритизация | 5 | `research-to-prd` | `outputs/prd.md` §8 |
| PRD для команды в buildin.ai | 5 | `research-to-prd` | экспорт из `outputs/prd.md` |

## Внешние инструменты

### Gemini Deep Research
Широкий desk research с отчётом и ссылками. Запускается вручную; результат
кладётся в `sources/deep-research/`. Не заменяет интервью.

### Google Antigravity
Агентная среда для итеративного поиска и структурирования. Используй для
сложных вопросов из scope, когда нужен цикл «запрос → поиск → уточнение».

### buildin.ai
Финальная упаковка PRD для команды: структурированный документ с оглавлением,
таблицами MoSCoW и трассировкой. Источник правды — `outputs/prd.md` в репозитории;
buildin — зеркало для стейкхолдеров.

## Прото-персоны vs классические персоны

| Классическая персона (избегаем) | Прото-персона (используем) |
|---------------------------------|----------------------------|
| выдуманный возраст, хобби | роль и сегмент из brief |
| «Мария любит йогу» | main job When/Want/So |
| без источника | ссылка на jtbd, pains, competitors |
| выдаётся за реального человека | `source: simulated` до интервью |

Симулированное интервью — способ проверить связность jobs и pains, не замена
реальных разговоров с пользователями.

## MoSCoW в PRD

| Метка | Значение |
|-------|----------|
| **M** Must | без этого релиз не имеет смысла |
| **S** Should | важно, но можно во 2-й итерации |
| **C** Could | желательно при наличии ресурса |
| **W** Won't | осознанно не делаем в этом релизе |

Каждая user story в PRD получает одну метку M/S/C/W.
