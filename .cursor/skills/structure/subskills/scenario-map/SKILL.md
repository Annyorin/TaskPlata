---
name: scenario-map
description: Pre-DS / Structure — пошаговые сценарии из PRD user stories (MoSCoW). Использовать после FigJam или ia-first, перед low-fi wireframes: «пропиши сценарии», «сценарии из PRD», «user journey steps».
---

# Scenario Map

## Среда

`04-prototype/`. Результат: `flows/scenarios.md` по
[`scenario-map.md`](../../../../../_shared/templates/scenario-map.md).

Вход: `01-research/outputs/prd.md`. Желательно: `flows/figjam.md` или IA.

## Process

1. Возьми user stories из PRD (§8 MoSCoW).
2. Каждую **M** и ключевые **S** разверни в шаги 1…n (действие пользователя + реакция системы).
3. Привяжи шаги к узлам sitemap / экранам (имена из FigJam или IA).
4. Отдельно: альтернативы, ошибки, пустые состояния.
5. Заполни `flows/scenarios.md`.

## Gate

- [ ] ≥3 сценария или все Must stories покрыты;
- [ ] у каждого сценария есть шаги и ссылка на story;
- [ ] нет сценария без экрана-узла (или помечен «экран TBD»).

## Rules

- Сценарий ≠ UI-спека. Без цветов и компонентов DS.
- Не выдумывай stories вне PRD — контракт к Research.
