---
name: user-test-loop
description: Петля юзер-тестов — дашборд находок и возврат в агента (evaluator-optimizer). Использовать после деплоя/прототипа: «юзер-тест», «разбери находки теста», «feedback с дашборда».
---

# User Test Loop — findings → агент

## Среда

Находки и дашборд: `05-code/outputs/user-tests/` (или `04-prototype/outputs/user-tests/`
для Figma-only прототипа).  
Правки кода — `05-code/`; правки продукта/гипотез — контракт в Research.

Паттерн: **evaluator–optimizer** из
[Building Effective Agents](https://www.anthropic.com/engineering/building-effective-agents) —
оценка (находки) отделена от улучшения (патч / гипотеза).

## Goal

Свой лёгкий дашборд (не Amplitude): сценарий, участник, находка, severity → агент
закрывает или эскалирует.

## Process

### 1. Дашборд (минимум)

Один из вариантов (не оба усложнять):
- `outputs/user-tests/index.html` — таблица по JSON; или
- только `findings.md` по шаблону
  [`user-test-findings.md`](../../../../../_shared/templates/user-test-findings.md).

Поля находки: id, scenario, step, observation, severity (0–3), evidence (URL/клип),
owner (code / content / ds / research).

### 2. Сбор

Пользователь или тестер заполняет findings после прогона preview URL (`ship`).
Агент не выдумывает цитаты участников.

### 3. Триаж (агент)

| Severity | Действие |
|----------|----------|
| 3 blocker | сразу `app-live` / hotfix |
| 2 major | в очередь итерации |
| 1 minor | backlog в NOTES |
| 0 cosmetic | опционально |

Routing owner:
- code / UX поведения → `app-live` или quality;
- текст → контракт Content;
- компонент системы → контракт DS;
- «не та задача» → контракт Research (гипотеза).

### 4. Закрытие петли

1. Патч или контракт.
2. Статус находки: `open` → `fixed` / `wontfix` / `escalated`.
3. Короткая строка в `code-manifest` или NOTES: что изменили после теста.

## Gate

- [ ] ≥1 прогон с датой и URL билда;
- [ ] находки с severity и owner;
- [ ] blocker закрыт или явно отложен пользователем.

## Rules

- Дашборд — для прототипа; не замена аналитики продакшена.
- Не смешивать выдуманные insight с findings (`source: test`).
- Полный прогон quality (anti-slop и т.д.) — по желанию после фикса, не вместо триажа.
