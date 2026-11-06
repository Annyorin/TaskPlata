---
name: ux-heuristics-audit
description: Опциональная фаза 2a — UX-аудит по 10 эвристикам Юкки Нильсена (Nielsen Norman Group). Использовать когда есть конкуренты или существующий продукт, нужно оценить юзабилити по скринам/прототипу до синтеза инсайтов.
---

# UX Heuristics Audit — фаза 2a (опционально)

## Среда

`01-research/`. Результат:
- `insights/ux-heuristics-audit.md` — по шаблону
  [`ux-heuristics-audit.md`](../../../../../_shared/templates/ux-heuristics-audit.md);
- скрины — в `sources/screenshots/<объект>/` с подписью.

Предусловие: есть что оценивать — файлы в `competitors/` или скрины текущего продукта.
Обычно после `competitive-scan`, до `insight-synthesis`.

## Goal

Системно найти UX-проблемы и сильные паттерны через **10 эвристик Нильсена** —
не «нравится / не нравится», а наблюдаемые нарушения и соответствия.

## 10 эвристик (чеклист)

| # | Эвристика | На что смотреть |
|---|-----------|-----------------|
| H1 | Visibility of system status | обратная связь, загрузка, состояния |
| H2 | Match between system and real world | язык, метафоры, порядок информации |
| H3 | User control and freedom | отмена, выход, undo, «назад» |
| H4 | Consistency and standards | единообразие, платформенные паттерны |
| H5 | Error prevention | валидация, подтверждения, дефолты |
| H6 | Recognition rather than recall | видимые опции, подсказки, не скрытые команды |
| H7 | Flexibility and efficiency | shortcuts, повторяемые действия |
| H8 | Aesthetic and minimalist design | шум, лишние элементы, иерархия |
| H9 | Help users recognize, diagnose, recover from errors | тексты ошибок, путь исправления |
| H10 | Help and documentation | онбординг, справка, контекстная помощь |

Источник: [Nielsen Norman Group — 10 Usability Heuristics](https://www.nngroup.com/articles/ten-usability-heuristics/).

## Process

1. Выбери **1–3 объекта** аудита: конкурент, наш текущий продукт, ключевой флоу.
2. Зафиксируй **сценарий** (job из brief): что пользователь пытается сделать.
3. Пройди флоу по скринам / живому продукту. На каждую эвристику — 0–3 находки.
4. Для каждой находки:
   - **severity**: 0 косметика · 1 minor · 2 major · 3 catastrophe (шкала NN/g);
   - **доказательство**: скрин + подпись или шаг воспроизведения;
   - **объект**: конкурент X / наш продукт.
5. Заполни `insights/ux-heuristics-audit.md`. Сильные паттерны — отдельный блок
   «Что взять на вооружение».
6. Критичные находки (severity ≥2) продублируй в `insights/pains.md` при синтезе.

## Gate

Переход к `insight-synthesis` — если:
- [ ] пройдены все 10 эвристик (можно «нет находок»);
- [ ] у каждой находки severity и доказательство;
- [ ] указан сценарий / job, под который смотрели.

## Rules

- «Плохой UX» без скрина или шага — недопустимо.
- Не предлагать решения в виде фич — только наблюдение и связь с job.
- Один объект — один проход; не смешивать конкурентов в одной строке таблицы.
- Аудит конкурентов **дополняет** `competitive-scan`, не заменяет матрицу и SWOT.

## Output → синтез

При `insight-synthesis` ссылайся на audit: `→ ux-heuristics-audit.md#H5-2`.
Боли из audit — с severity из эвристик.
