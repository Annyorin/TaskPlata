---
type: source
status: draft
updated: 2026-11-06
---

# Открытые навыки ТРИЗ

Срез на 6 ноября 2026. Искались публичные репозитории GitHub и GitLab про противоречия и идеальный конечный результат. Тела скиллов не копировались.

## Куда смотреть в первую очередь

| Репозиторий | Лицензия | Зачем |
|-------------|----------|--------|
| https://github.com/truinorva/triz-skills | MIT | Полный набор навыков: противоречия, ИКР, ресурсы, функции |
| https://github.com/jenson500/truinorva-triz | MIT | Та же линейка, упакованная как плагин Claude на 26 навыков |
| https://github.com/Antropocosmist/triz-engineering-solver | MIT | Один навык: матрица 39×39, 40 принципов, ИКР, АРИЗ-85В, вепольный анализ |
| https://github.com/SharathSPhD/triz-engine | MIT | Команды: разбор противоречия, матрица, принципы, ИКР, АРИЗ |
| https://github.com/bayramannakov/systems-thinking-skills | — | Навык `triz-dissolve`: снять компромисс, а не уравновесить его |
| https://github.com/mmysior/pytriz | MIT | Библиотека Python: поиск параметров и принципов по матрице |
| https://gitlab.com/cognitive-functors/c4reqber | — | CLI `turbo triz solve` по улучшаемому и ухудшаемому параметру |

`engrco/triz.tips` на GitLab к методу не относится. `strekalin/h_prompt` разбирает скрытые допущения и циклы, но это не ТРИЗ.

## Противоречие и идеальный результат

- **contradiction-solver** — техническое противоречие, матрица Альтшуллера и Matrix 2003, 40 приёмов.
- **physical-contradictions** — физическое противоречие, разделение в пространстве, времени, отношении и условии.
- **ideality** — идеальный конечный результат: функция есть, вреда и затрат нет.
- **triz-dissolve** — проверка, исчезла ли плата или её только переложили на другое место.
- **triz-engineering-solver** — 3–5 концепций с оценкой идеальности; если идеальность не выше 1, ход не принимается и включается АРИЗ.
- **`/triz-engine:ifr`** — формулировка ИКР: максимум пользы, ноль затрат, вреда и сложности.
- **76-standard-solutions** — веполь и 76 стандартов, когда взаимодействие вредное, слабое или его нет.

## Все навыки truinorva/triz-skills

Технические:

- 76-standard-solutions
- cause-effect-chain-analysis
- contradiction-solver
- derivative-resources
- feature-transfer
- function-analysis
- function-analysis-advanced
- function-interaction-analysis
- function-oriented-search
- ideality
- innovation-checklist
- interactive-trimming
- mpv-analysis
- patent-analyzer
- physical-contradictions
- problem-operator
- resource-analysis
- root-cause-analysis
- root-conflict-analysis
- smart-little-people
- sustainability-assessment
- system-description
- system-operator
- trimming

Бизнес и люди:

- business-function-analysis
- perception-mapping
- solutions-at-system-levels

Плагин `jenson500/truinorva-triz` берёт этот набор и добавляет подачу для неинженерных доменов. Отдельного двадцать седьмого метода сверх этого списка в описании репозитория нет.
