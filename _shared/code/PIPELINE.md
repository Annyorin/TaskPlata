---
type: spec
env: 05-code
updated: 2026-09-02
---

# Пайплайн Code → живой продукт

Спецификация среды `05-code/` и группы `build`. От зеркала DS в React до деплоя
и петли юзер-тестов.

## Зачем так устроено

По [Building Effective Agents](https://www.anthropic.com/engineering/building-effective-agents):
это **prompt chaining** с **gate** между фазами и **routing** по типу задачи
(база / экраны / ship). Не автономный агент «собери всё сам» — фиксированная цепочка,
каждый шаг проще и проверяемее.

По [Effective Context Engineering](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents):
один артефакт — один файл; манифесты и карты соответствий читаются just-in-time;
прогресс — в `05-code/NOTES.md`.

**Evaluator–optimizer** (тот же Anthropic-пост): юзер-тесты → находки → правка кода /
контракт в Research или DS — скилл `user-test-loop` (группа `quality`).

## Инструменты агента (выбор)

| Инструмент | Роль | Когда |
|------------|------|--------|
| **Cursor** | эта метасреда, skills, MCP Figma | основной рабочий контур дизайнера здесь |
| **Claude Code** (расширение VS Code / CLI) | длинные правки репо, терминал, PR | тяжёлый coding-pass по уже заданному скиллом плану |
| **Codex** и аналоги | разовые патчи | не канон этой метасреды |

Метасреда **не привязана** к одному IDE: скиллы — процедуры; исполнение может быть
в Cursor или Claude Code по одному и тому же `PIPELINE` и `outputs/`.

## Тип продукта и стек (routing до фазы 1)

Спроси один раз, если не зафиксировано в `code-manifest`:

| Тип | Дефолт стека в метасреде |
|-----|--------------------------|
| Маркетинг-сайт / лендинг | Vite + React (SPA) или статичный export |
| Веб-приложение (прототип / MVP) | **Vite + React + TypeScript** (канон) |
| Нужен SSR / SEO / API routes | Next.js — только по явному запросу |
| Мобильное | React Native / Expo — отдельный трек, не смешивать с web DS-зеркалом |

Backend и БД **вне** среды 5 на этапе прототипа: моки в `src/data/`. Продакшен-API —
отдельное решение вне канона DS-зеркала.

## Этапы

```
Фаза 0  stack gate           → code-manifest «Стек»
Фаза 1  ds-to-code           → tokens/ + components/ + Storybook
Фаза 2  app-live             → screens/ + wire (навигация, моки, edge-cases)
Фаза 3  ship                 → GitHub + deploy URL
Фаза 4  user-test-loop       → findings → правки / контракты   [quality]
```

| Фаза | Скилл | Gate |
|------|-------|------|
| 0 | (в `ds-to-code`) | стек и `implements-version` согласованы с `ds-manifest` |
| 1 | `ds-to-code` | токены + ≥3 компонента со stories; `npm run build-storybook` ок |
| 2 | `app-live` | основной флоу кликабелен; edge-cases пройдены таблицей |
| 3 | `ship` | remote + preview URL в `code-manifest` / `NOTES` |
| 4 | `user-test-loop` | findings с severity; петля закрыта или контракт открыт |

Входы: `02-design-system/outputs/ds-manifest.md`, `04-prototype/outputs/build-log.md`
(и SCREEN-MAP при переносе экранов).  
Выход: `05-code/outputs/code-manifest.md`.

## Инварианты

См. [`../figma-code-invariants.md`](../figma-code-invariants.md): только токены,
имена 1:1, синк сразу, сверка паритета, правила Figma MCP.

## Команды агенту

| Цель | Фраза |
|------|--------|
| зеркало DS + Storybook | `ds-to-code` |
| экраны + поведение | `app-live` |
| GitHub + деплой | `ship` |
| юзер-тесты → правки | `user-test-loop` |
| весь ship-контур | `Полный пайплайн code → ship, стек: …` |
