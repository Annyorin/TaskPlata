---
name: triz
description: Роутер группы «ТРИЗ» — противоречия, идеальный конечный результат, приёмы, ресурсы, функции, свертывание. Применять на «ТРИЗ», «противоречие», «идеальный конечный результат», «ИКР», «40 приёмов», «матрица Альтшуллера», «АРИЗ», «веполь», «идеальность».
---

# TRIZ — роутер группы

Среда артефактов: `01-research/`. Подскилл читай как `subskills/<имя>/SKILL.md` и работай по нему. Не загружай группу целиком.

Источники, лицензия MIT, если не сказано иначе: [truinorva/triz-skills](https://github.com/truinorva/triz-skills), [Antropocosmist/triz-engineering-solver](https://github.com/Antropocosmist/triz-engineering-solver), [SharathSPhD/triz-engine](https://github.com/SharathSPhD/triz-engine), [bayramannakov/systems-thinking-skills](https://github.com/bayramannakov/systems-thinking-skills) (`triz-dissolve`). Тексты лицензий — рядом с этой папкой.

Папка `subskills/triz-engine/` — общие данные матрицы и ядро, не отдельная процедура.

## С чего начать

| Задача | Подскилл |
|--------|----------|
| «улучшая X, портим Y» | `contradiction-solver`, затем `triz-engine-matrix` |
| одно свойство должно быть противоположным | `physical-contradictions` |
| сформулировать идеальный результат задачи | `triz-engine-ifr`, затем `ideality` |
| снять компромисс, а не уравновесить его | `triz-dissolve` |
| 3–5 инженерных концепций с оценкой идеальности | `triz-engineering-solver` |
| глубокий ход, быстрый проход не дал идеальности | `triz-engine-ariz` |
| полный разбор одной сессии | `triz-engine-analyze` |
| посмотреть приёмы | `triz-engine-principles` |

Порядок, когда задача ещё сырая: `system-description` → `contradiction-solver` или `physical-contradictions` → `ideality` / `triz-engine-ifr` → `triz-dissolve`. Результат клади в `01-research/insights/`, со ссылкой на источник приёма.

## Все подскиллы

Технические: `76-standard-solutions`, `cause-effect-chain-analysis`, `contradiction-solver`, `derivative-resources`, `feature-transfer`, `function-analysis`, `function-analysis-advanced`, `function-interaction-analysis`, `function-oriented-search`, `ideality`, `innovation-checklist`, `interactive-trimming`, `mpv-analysis`, `patent-analyzer`, `physical-contradictions`, `problem-operator`, `resource-analysis`, `root-cause-analysis`, `root-conflict-analysis`, `smart-little-people`, `sustainability-assessment`, `system-description`, `system-operator`, `trimming`.

Бизнес и люди: `business-function-analysis`, `perception-mapping`, `solutions-at-system-levels`.

Дополнительно: `triz-dissolve`, `triz-engineering-solver`, `triz-engine-analyze`, `triz-engine-ariz`, `triz-engine-ifr`, `triz-engine-matrix`, `triz-engine-principles`.
