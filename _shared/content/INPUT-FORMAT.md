---
type: spec
env: 03-content
updated: 2026-09-02
---

# Как подавать данные агенту для контента

## Минимальный вход

Обязательно: `01-research/outputs/research-digest.md` (уже в репо или из среды 1).

Дополнительно в чат:

```markdown
## Продукт
[название, одно предложение]

## Что нужно
- [ ] tone of voice
- [ ] тексты для экранов: [список]
- [ ] визуал: [hero, иллюстрации, иконки…]

## Референсы стиля (визуал)
- [ссылка на moodboard / sref / бренд-гайд]

## Ограничения
- [без людей / только flat / тёмная тема…]
```

## Команды для запуска

| Цель | Что написать агенту |
|------|---------------------|
| ToV | `tone-of-voice` |
| тексты | `copy-writing: экраны …` |
| бриф + JSON-промпт | `visual-prep: <роль / asset_key>` |
| генерация (любой tool) | `visual-generate: <asset_key>` |
| Midjourney / Krea / сетка / GPT / коллаж | то же + уточнение инструмента в запросе |
| Weave | `figma-weave: <asset_key>` |
| финальный пакет | `content-package` |
| полный цикл | `Полный пайплайн контента, продукт: …` |

## Именование файлов

| Тип | Путь |
|-----|------|
| ToV | `strategy/tone-of-voice.md` |
| Копирайт | `copy/<screen-or-entity>.md` |
| Бриф визуала | `visual/briefs/<asset>.md` |
| JSON-промпт | `visual/prompts/<asset>.json` |
| Ассет | `visual/assets/<asset_key>.<ext>` |
| Weave-схема | `visual/weave/<asset>-pipeline.md` |
| sref-библиотека | `visual/styles/sref-library.md` |
