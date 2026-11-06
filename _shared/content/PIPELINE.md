---
type: spec
env: 03-content
updated: 2026-09-02
---

# Пайплайн контента → content-package

Спецификация среды `03-content/`. Тексты и визуал на базе `01-research/outputs/research-digest.md`.
Скиллы группы `content` реализуют этапы; этот документ — канон.

## Зачем так устроено

Контент — мост между исследованием и прототипом. Тексты трассируются до инсайтов;
визуал — до брифов и воспроизводимых промптов. Корневые знания (архитектуры моделей,
режимы генерации, структура промпта) **не привязаны к конкретной модели** — инструменты
меняются, принципы остаются.

Визуальный трек: теория → prep (бриф + JSON) → generate → (опционально) Weave → пакет.

## Этапы и артефакты

```
Фаза 0  tone-of-voice     → strategy/tone-of-voice.md
Фаза 1  copy-writing      → copy/<screen>.md
Фаза 2–3 visual-prep      → visual/briefs/<asset>.md + visual/prompts/<asset>.json
Фаза 4  visual-generate   → visual/assets/<asset>.*  (routing по tool/mode)
Фаза 5  figma-weave       → visual/weave/<asset>-pipeline.md  [опционально]
Фаза 6  content-package   → outputs/content-package.md
```

| Фаза | Скилл | Вопрос этапа | Gate |
|------|-------|--------------|------|
| 0 | `tone-of-voice` | Как говорим с аудиторией? | ToV с примерами do/don't |
| 1 | `copy-writing` | Какие тексты на экранах? | ключи + трассировка к дайджесту |
| 2–3 | `visual-prep` | Какой визуал и как генерировать? | бриф + JSON (режим, tool) |
| 4 | `visual-generate` | Файл ассета готов? | ветка tool/mode + файл в assets |
| 5 | `figma-weave` | Нодовая доводка? | pipeline Welcome→Compositor |
| 6 | `content-package` | Что отдаём в Prototype? | таблица ключей + ассеты |

Фаза 4 — **routing** внутри `visual-generate` (Midjourney / Krea / Nano Banana /
GPT Image / collage-i2i) по матрице [`VISUAL-PIPELINE.md`](VISUAL-PIPELINE.md).
Фаза 5 — композиция слоёв или итерации в Figma Weave.

## Публичный выход

| Файл | Кто читает |
|------|------------|
| `outputs/content-package.md` | Prototype (среда 4) |

Внутренности `03-content/` снаружи не читаются — только этот файл.

## Связь с другими средами

```
research-digest → Content (текст + визуал) → Prototype
```

- Вход: только `01-research/outputs/research-digest.md`.
- DS и компоненты UI — не здесь. Weave — только для **визуальных ассетов**, не экранов.
- Нет инсайта в дайджесте → контракт в `_shared/contracts/`, не додумывать.

Справочник визуала: [`VISUAL-PIPELINE.md`](VISUAL-PIPELINE.md).
