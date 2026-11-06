---
name: discovery
description: Роутер группы «исследование» (8 подскиллов) — scope, бриф, deep research, конкуренты, SWOT, UX-аудит Нильсена, инсайты, прото-персоны, гипотезы, PRD с MoSCoW и buildin.ai. Применять на «исследуй тему», «собери требования», «анализ конкурентов», «SWOT», «эвристики Нильсена», «JTBD», «прото-персона», «MoSCoW», «гипотезы», «собери PRD», «buildin», «вводных мало» — когда конкретный подскилл не назван.
---

# Discovery — роутер группы

Среда: `01-research/`. Канон пайплайна: [`_shared/research/PIPELINE.md`](../../../_shared/research/PIPELINE.md).
Формат входных данных: [`_shared/research/INPUT-FORMAT.md`](../../../_shared/research/INPUT-FORMAT.md).

Подскиллы лежат в `subskills/<имя>/SKILL.md` — прочитай нужный и работай по нему.

| Задача | Подскилл | Фаза |
|--------|----------|------|
| тема широкая, нужны границы исследования | `research-scope` | 0 |
| вводных мало, нужен полный бриф | `recursive-briefing` | 1 |
| широкий desk research, Antigravity, Gemini DR | `deep-research` | 1a |
| анализ конкурентов, бенчмарк, матрица, SWOT | `competitive-scan` | 2 |
| UX-аудит по эвристикам Нильсена | `ux-heuristics-audit` | 2a |
| JTBD, боли, opportunities, прото-персоны | `insight-synthesis` | 3 |
| гипотезы Lean UX и карта допущений | `hypothesis-builder` | 4 |
| собрать PRD, MoSCoW, buildin.ai | `research-to-prd` | 5 |

## Полный цикл

«Исследование → PRD» = фазы 0→5 последовательно; **1a** и **2a** — по необходимости.
**Gate** между фазами: не переходи к следующей, пока артефакт текущей не проходит критерии в скилле.

Фаза 2 (конкуренты) — допускает parallelization через субагентов.
Фаза 1a — внешние инструменты (Antigravity, Gemini DR), результат в `sources/`.

## Публичные выходы

| Файл | Назначение |
|------|------------|
| `outputs/research-digest.md` | сжатие для Content и Prototype |
| `outputs/prd.md` | полное ТЗ после фазы 5 |

## Дедуп-вахта

- Сбор требований (фазы 0–1) vs `structure/ia-first`: здесь **что** строим,
  там **куда ведёт навигация** из готового флоу.
- PRD из `research-to-prd` — про продукт; IA и wireframes — группа `structure`.
