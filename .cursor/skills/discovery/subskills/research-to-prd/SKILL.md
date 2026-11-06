---
name: research-to-prd
description: Фаза 5 исследования — собирает PRD из артефактов 01-research с полной трассировкой к источникам и обновляет research-digest. Использовать когда исследование завершено и нужен документ требований для прототипирования, контента и разработки.
---

# Research to PRD — фаза 5

## Среда

`01-research/`. Результаты:
- `outputs/prd.md` — [`prd.md`](../../../../../_shared/templates/prd.md);
- `outputs/research-digest.md` — сжатое обновление для сред 3 и 4.

Предусловие: фазы 0–4 выполнены или пользователь явно запросил сокращённый трек
с разделом «Что не исследовали».

## Goal

Собрать **единый PRD** — мост от исследования к проектированию. Каждый раздел
трассируется к файлу в `01-research/`.

## Process

1. Прочитай точечно (не всю папку целиком):
   - `briefs/00-research-scope.md`, `briefs/01-product-brief.md`
   - `competitors/_matrix.md`, `competitors/_swot.md`
   - `insights/jtbd.md`, `insights/pains.md`, `insights/opportunities.md`
   - `insights/proto-personas/` (если есть)
   - `insights/ux-heuristics-audit.md` (если есть)
   - `insights/hypotheses.md`, `insights/assumptions.md`
2. Заполни `outputs/prd.md` по шаблону. Секции 1–13.
3. **User stories** — из jobs и opportunities, формат:
   «Как [роль], я хочу [действие], чтобы [исход]».
4. **MoSCoW** — каждой story одна метка: **M** Must · **S** Should · **C** Could · **W** Won't.
   Колонка в таблице §8. M — без этого релиз бессмысленен; W — явный out of scope релиза.
5. **In/Out scope** — из research-scope + non-jobs из jtbd + все W из MoSCoW.
6. **Метрики** — из OKR brief + сигналы из hypotheses.
7. **Трассировка** — в конце каждого раздела ссылка `→ insights/...` или `→ competitors/...`.
8. Сожми в `outputs/research-digest.md`: контекст, сегменты, main job, топ pains,
   топ opportunities, топ-3 гипотезы.
9. Поставь `status: ready` в frontmatter PRD, если все gate фаз 0–4 пройдены.
10. **buildin.ai** — оформи готовый документ для команды (см. ниже).

## Gate (готовность PRD)

- [ ] problem statement есть и согласован с brief;
- [ ] ≥3 user stories с меткой MoSCoW (≥1 Must);
- [ ] in/out scope явные;
- [ ] ≥2 метрики с target;
- [ ] раздел рисков ссылается на assumptions;
- [ ] нет фич без привязки к opportunity или job.

## Rules

- PRD описывает **что** и **зачем**, не **как выглядит**. Визуал — среды 2–4.
- Не дублируй полноту insights в digest — digest ≤ 1 экрана чтения.
- Если данных не хватает — раздел «Открытые вопросы», не выдумывай.
- Сокращённый трек: обязателен раздел «Что не исследовали» + риски.

## buildin.ai — документ для команды

Источник правды — `outputs/prd.md` в репозитории. buildin.ai — **зеркало** для
стейкхолдеров, не второй канон.

1. Создай документ в [buildin.ai](https://buildin.ai) по структуре PRD (§1–13).
2. Включи оглавление, таблицы MoSCoW и метрик, ссылки на SWOT / JTBD (кратко).
3. Раздел «Открытые вопросы» и «Риски» — обязательны для команды.
4. В `NOTES.md` зафиксируй URL документа buildin.
5. При изменении PRD в репо — синхронизируй buildin в той же задаче.

Если пользователь не использует buildin — пропусти шаг, PRD в `outputs/` достаточен.

## После PRD

Следующие шаги для пользователя:
1. Content (среда 3) читает `research-digest.md`
2. Structure (`ia-first`) — навигация по user stories
3. Prototype — экраны по PRD
