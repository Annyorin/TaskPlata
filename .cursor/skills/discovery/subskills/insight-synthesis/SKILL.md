---
name: insight-synthesis
description: Фаза 3 исследования — синтез JTBD, болей, возможностей (Opportunity Solution Tree) из брифа и конкурентного анализа. Использовать когда сырые данные собраны и нужны структурированные инсайты со ссылками на источники перед гипотезами и PRD.
---

# Insight Synthesis — фаза 3

## Среда

`01-research/`. Результаты:
- `insights/jtbd.md` — [`jtbd.md`](../../../../../_shared/templates/jtbd.md);
- `insights/pains.md` — боли с severity и источником;
- `insights/opportunities.md` — outcomes (не фичи), Opportunity Solution Tree lite;
- `insights/proto-personas/<role>.md` — по [`proto-persona.md`](../../../../../_shared/templates/proto-persona.md), 1–3 роли.

Предусловие: `briefs/`, `competitors/_matrix.md` (и `_swot.md`) заполнены.
Опционально: `insights/ux-heuristics-audit.md`.

## Goal

Перейти от фактов к **пониманию пользователя**: какие jobs, где болит сильнее
всего, какие возможности открываются. Ещё без решений в виде фич.

## Process

1. Прочитай `briefs/01-product-brief.md` и `competitors/_matrix.md` точечно.
2. **JTBD**: для каждого сегмента сформулируй jobs в формате When/Want/So.
   Выдели main job. Пометь non-jobs.
3. **Pains** (`insights/pains.md`):

```markdown
| ID | Боль | Сегмент | Severity (1–5) | Частота | Источник |
```

4. **Opportunities** (`insights/opportunities.md`):
   Outcomes, которые улучшим — уровень OST (Torres), не solutions:

```markdown
| ID | Outcome | Связанные jobs | Почему сейчас плохо | Источник |
```

5. **Прото-персоны** (1–3 ключевые роли из brief):
   - для каждой роли — файл в `insights/proto-personas/`;
   - main job из jtbd, боли из pains, без выдуманной демографии;
   - **симулированное интервью**: 3–5 вопросов по job map → ответы в формате
     цитаты с пометкой `source: simulated`;
   - открытые вопросы для валидации на реальных интервью.
6. Каждый вывод — ссылка на `competitors/`, `briefs/`, `sources/` или `ux-heuristics-audit.md`.
7. Обнови `outputs/research-digest.md`.

## Gate

Переход к `hypothesis-builder` только если:
- [ ] main job назван явно;
- [ ] ≥3 pains с severity ≥3;
- [ ] ≥2 opportunities без привязки к конкретным фичам;
- [ ] ≥1 прото-персона с main job и `source: simulated` или ссылкой на интервью;
- [ ] нет утверждений без источника (иначе → hypotheses позже).

## Rules

- **Классические персоны** (возраст, хобби, выдуманная биография) — не создавать.
  **Прото-персоны** — только роль + job + контекст, явно `hypothesis`.
- Симулированное интервью — проверка связности, не замена `sources/interviews/`.
- «Пользователям не нравится» — только с цитатой.
- Opportunity ≠ feature. «Добавить тёмную тему» — фича; «снизить нагрузку на глаза
  при ночной работе» — opportunity.

## Frameworks

JTBD (Moesta), Opportunity Solution Tree (Torres), Pain/Gain mapping (Osterwalder lite),
proto-personas (Alan Cooper lite — goal-directed, без демо-слопа).
