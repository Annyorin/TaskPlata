---
type: reference
status: active
updated: 2026-09-02
---

# Справочник скиллов метасреды

Человекочитаемый обзор всех скиллов: что делают и когда вызываются.
Для агента канон процедур — в `.cursor/skills/`; техническая карта — в
[`_shared/skills-map.md`](_shared/skills-map.md).

> **Поддержка.** При добавлении, переименовании или удалении скилла обновляй
> этот файл в той же задаче вместе с роутером группы и `_shared/skills-map.md`.

**Всего:** 35 скиллов в 7 группах.

---

## Как вызываются

```
Ваша фраза → роутер группы → один подскилл → процедура из SKILL.md
```

Агент **не** грузит все скиллы сразу. Сначала срабатывает роутер по смыслу запроса,
потом читается только нужный подскилл.

| Группа | Роутер | Папка |
|--------|--------|-------|
| Исследование | `discovery` | `.cursor/skills/discovery/SKILL.md` |
| Контент | `content` | `.cursor/skills/content/SKILL.md` |
| Структура | `structure` | `.cursor/skills/structure/SKILL.md` |
| Дизайн-система | `ds` | `.cursor/skills/ds/SKILL.md` |
| Сборка | `build` | `.cursor/skills/build/SKILL.md` |
| Качество | `quality` | `.cursor/skills/quality/SKILL.md` |
| Инфраструктура | `infra` | `.cursor/skills/infra/SKILL.md` |

---

## Общий путь проекта

```
Исследование (discovery)
    ↓
Контент (content) — тексты и визуальные ассеты
    ↓
Структура (structure) — каркасы без визуала
    ↓
Дизайн-система (ds) — стиль и компоненты
    ↓
Сборка (build) — экраны и код
    ↓
Качество (quality) — ревью и полировка

Инфраструктура (infra) — параллельно: Figma, git, передача между средами
```

---

## С чего начать — карта веток

Что делать в зависимости от того, **что уже есть**. Это технический старт DS и кода,
не замена research-пайплайна.

| Что есть на старте | С чего начать | Скиллы / среды |
|--------------------|---------------|----------------|
| Только идея, вводных мало | Исследование → бриф → PRD | `discovery` → `01-research/` |
| PRD есть, нет структуры / DS с нуля | FigJam → сценарии → low-fi → DS | `structure` pre-DS → `ds` |
| Референс стиля (Dribbble) | Разбор в STYLE_GUIDE | `ds/style-decompose` → `02` |
| Бандл CSS+JSX, DS в Figma нет | Собрать DS в новом Figma-файле | `ds/handoff-to-figma` → `02` |
| DS уже в Figma | Проиндексировать библиотеку | `ds/figma-ds-link` → `02` |
| Долгая связка Figma ↔ код | Аудит, токены, дрифт | `ds/design-system-sync` |
| Макеты в Figma / DS в коде, нужен React | Зеркало + live + ship | `build` → `05-code/` |
| Бандл, нужен Storybook | React-библиотека + каталог | `build/ds-to-code` → `05` |
| Экраны свёрстаны, но «мёртвые» | Wire | `build/app-live` |
| Preview / GitHub | Ship | `build/ship` |
| Юзер-тест после деплоя | Findings → правки | `quality/user-test-loop` |
| Тексты и визуал перед прототипом | Контент-пакет | `content` → `03-content/` |
| Ссылка figma.com | Протокол MCP первым | `infra/figma-mcp` |
| Проверить git / GitHub | Health-check | `infra/git-github-check` |
| Компонент из чужой среды | Контракт | `infra/env-handoff` |

**Гибрид:** research → content → structure → DS → build. Одна среда за задачу.

**После итерации DS ↔ код:** [`_shared/templates/parity-report.md`](_shared/templates/parity-report.md).

---

## 1. Discovery — исследование

**Среда:** `01-research/`  
**Когда:** в начале проекта, когда нужно понять *что строим*.

| Скилл | Зачем | Когда вызывать |
|-------|-------|----------------|
| `research-scope` | Границы исследования: о чём говорим, а о чём нет | Тема широкая, неясно с чего начать |
| `recursive-briefing` | Полный бриф: расширение → углубление → консолидация | «Вводных мало», нужен бриф |
| `deep-research` | Широкий desk research через Antigravity и Gemini DR | Незнакомый рынок, нужны тренды и отчёты |
| `competitive-scan` | Конкуренты, матрица сравнения и SWOT | Есть ссылки на конкурентов |
| `ux-heuristics-audit` | UX-аудит по 10 эвристикам Нильсена | Скрины конкурентов или текущего продукта |
| `insight-synthesis` | JTBD, боли, opportunities, прото-персоны | Данные собраны, нужен смысл |
| `hypothesis-builder` | Гипотезы и карта допущений | Перед финальным ТЗ |
| `research-to-prd` | PRD с MoSCoW и оформлением в buildin.ai | Исследование готово |

**Порядок:** scope → бриф → [deep research] → конкуренты + SWOT → [UX-аудит] → инсайты → гипотезы → PRD.  
**Пайплайн:** [`_shared/research/PIPELINE.md`](_shared/research/PIPELINE.md)  
**Справочник методов:** [`_shared/reference/research-methods.md`](_shared/reference/research-methods.md)

**Выходы:** `01-research/outputs/research-digest.md`, `01-research/outputs/prd.md`

---

## 2. Content — контент и визуал

**Среда:** `03-content/`  
**Когда:** после research-digest — тексты, иллюстрации, бренд-ассеты.

| Скилл | Зачем | Когда вызывать |
|-------|-------|----------------|
| `tone-of-voice` | Голос бренда, do/don't | Перед текстами и визуалом |
| `copy-writing` | Тексты со стабильными ключами | Экраны, CTA, ошибки |
| `visual-prep` | Бриф + JSON (режим, tool) | Перед генерацией |
| `visual-generate` | Генерация: MJ / Krea / Nano Banana / GPT / i2i | Когда prep готов |
| `figma-weave` | Ноды Weave | Слои, Compositor |
| `content-package` | Пакет для среды 4 | Финальная сборка |

**Порядок:** ToV → copy → visual-prep → visual-generate → [weave] → package.  
**Пайплайн:** [`_shared/content/PIPELINE.md`](_shared/content/PIPELINE.md)  
**Визуал:** [`_shared/content/VISUAL-PIPELINE.md`](_shared/content/VISUAL-PIPELINE.md)

**Выход:** `03-content/outputs/content-package.md`

---

## 3. Structure — структура до дизайна

**Среда:** `04-prototype/`  
**Когда:** требования есть; pre-DS или навигация/каркасы до hi-fi.

| Скилл | Зачем | Когда вызывать |
|-------|-------|----------------|
| `figjam-ia` | Sitemap + user flows в FigJam | «Sitemap», «флоу на доске» |
| `scenario-map` | Пошаговые сценарии из PRD | После FigJam / перед low-fi |
| `ia-first` | Текстовый граф навигации | «Куда ведёт кнопка» |
| `wireframe-board` | HTML-доска серых каркасов | Быстрый обзор всех экранов |
| `wireframe-figma` | Low-fi в Figma MCP + inventory | Перед созданием DS с нуля |

**Pre-DS порядок:** `figjam-ia` → `scenario-map` → `wireframe-figma` → задача в `ds`.  
**Канон:** [`_shared/structure/PRE-DS-PIPELINE.md`](_shared/structure/PRE-DS-PIPELINE.md)

---

## 4. DS — дизайн-система

**Среда:** `02-design-system/` (строгая изоляция)  
**Когда:** работа со стилем, компонентами, Figma-библиотекой.

**Gate:** при создании/подключении всегда спросить — DS уже в Figma (ссылка) или с нуля?
С нуля без pre-DS — стоп, сначала `structure`.

| Скилл | Зачем | Когда вызывать |
|-------|-------|----------------|
| `style-decompose` | Разбор стиля с Dribbble в `STYLE_GUIDE` | «Разбери стиль референса» |
| `handoff-to-figma` | Создать DS в Figma с нуля из бандла CSS+JSX | DS ещё нет, pre-DS готов / skip |
| `figma-ds-link` | Проиндексировать существующую DS из Figma | DS в Figma уже есть |
| `design-system-sync` | Долгая связка Figma ↔ код, токены, дрифт | Постоянная синхронизация |

Объёмная DS-задача → изолированная сессия (секция в роутере `ds`), не отдельный скилл.

**Выход наружу:** только `02-design-system/outputs/ds-manifest.md`

**Перед любым Figma-скиллом:** загрузить `infra/figma-mcp`.

---

## 5. Build — сборка и ship

**Среды:** `05-code/` (+ outputs Prototype)  
**Когда:** DS в манифесте есть — собрать, оживить, выложить.  
**Канон:** [`_shared/code/PIPELINE.md`](_shared/code/PIPELINE.md)

| Скилл | Зачем | Когда вызывать |
|-------|-------|----------------|
| `ds-to-code` | Токены + React-база + Storybook (react_base) | Зеркало DS в коде |
| `app-live` | Экраны из базы + wire (навигация, моки, edge) | «Оживи», «собери экраны» |
| `ship` | GitHub handoff + Vercel/Netlify/CF/VPS | Preview URL |

**Порядок:** `ds-to-code` → `app-live` → `ship` → `user-test-loop`.

---

## 6. Quality — качество

**Среды:** `04-prototype/`, `05-code/`  
**Когда:** макет или код готов; или после юзер-теста.

| Скилл | Зачем | Когда вызывать |
|-------|-------|----------------|
| `design-review` | Соответствие DS, a11y, состояния | «Отревьюй макет» |
| `design-anti-slop` | Убрать ИИ-шаблоны | «Выглядит как нейронка» |
| `design-decompose` | Довести до эталона | «Похоже, но дёшево» |
| `emil-design-eng` | Анимации и микровзаимодействия | «Переходы резкие» |
| `user-test-loop` | Дашборд находок → правки/контракты | После preview / теста |

**Четыре визуальных вопроса** — как раньше; пятый — **что сказали тестеры**.

| Вопрос | Скилл |
|--------|-------|
| Соответствует ли нашей системе? | `design-review` |
| Опознаётся ли как нейросеть? | `design-anti-slop` |
| Дотягивает ли до эталона? | `design-decompose` |
| Ощущается ли живым? | `emil-design-eng` |
| Что сказали тестеры? | `user-test-loop` |

---

## 7. Infra — инфраструктура

**Среда:** любая  
**Когда:** техническая обвязка, границы между средами.

| Скилл | Зачем | Когда вызывать |
|-------|-------|----------------|
| `figma-mcp` | Подключение к Figma, OAuth, лимиты, разбор ссылок | Любая ссылка `figma.com` — **всегда первым** |
| `git-github-check` | Проверка git, GitHub, remote, теги | «Проверь git и github» |
| `env-handoff` | Запрос к другой среде через контракт | Нужен компонент из DS, правка чужой среды |
| `skills-architect` | Пересобрать библиотеку скиллов | Скиллы дублируются, нужен порядок |

---

## Похожие скиллы — не путать

| Задача | Бери | Не путай с |
|--------|------|------------|
| Как ходить в Figma | `figma-mcp` | Остальные Figma-скиллы — надстройки |
| Проверить git / GitHub | `git-github-check` | Commit/push без запроса |
| DS уже есть, нужен индекс | `figma-ds-link` | `handoff-to-figma` создаёт с нуля |
| DS нет, есть бандл | `handoff-to-figma` | `figma-ds-link` только читает |
| Связать DS с кодом надолго | `design-system-sync` | `ds-to-code` — разовая сборка зеркала |
| Разобрать стиль студии | `style-decompose` | `design-decompose` — один элемент |
| Макет не по DS | `design-review` | `design-anti-slop` — «нейронный» вид |
| Экраны мёртвые / wire | `app-live` | `emil-design-eng` — только моушен |
| GitHub handoff / деплой | `ship` | `git-github-check` — только health |
| Находки юзер-теста | `user-test-loop` | `design-review` — без тестеров |
| Собрать требования | `recursive-briefing` | `ia-first` — навигация из готового флоу |

---

## Чеклист при изменении скиллов

При любом изменении в `.cursor/skills/` обнови **все** пункты:

- [ ] Роутер группы (`<группа>/SKILL.md`)
- [ ] [`_shared/skills-map.md`](_shared/skills-map.md)
- [ ] **этот файл** (`infoSkills.md`)
- [ ] [`_shared/registry.md`](_shared/registry.md) — если меняется привязка к среде
- [ ] `CHANGELOG.md` — если это заметная версия
