---
name: ds-to-code
description: Фаза 1 code — зеркало дизайн-системы в React (токены + компонентная база) и Storybook-каталог со сверкой состояний. Использовать на «react_base», «собери библиотеку», «Storybook из DS», «зеркало DS в коде».
---

# DS to Code — react_base + Storybook

## Среда

`05-code/`. Канон: [`PIPELINE.md`](../../../../../_shared/code/PIPELINE.md).

Вход: `02-design-system/outputs/ds-manifest.md` (обязателен, `version` ≠ пустой).

## Goal

Своя компонентная база, **зеркалящая DS**, не чужая UI-kit библиотека. Storybook —
полная витрина вариантов и состояний для сверки с Figma.

## Process

### 0. Gate стека

Зафиксируй в `outputs/code-manifest.md` § Стек (дефолт: Vite + React + TS + Storybook 8).
`implements-version` = `version` из ds-manifest.

### 1. Токены

1. Выгрузи цвета, spacing, radius, typography из манифеста → `tokens/` (CSS variables
   и/или TS).
2. Никаких hex в компонентах — только токены ([инварианты](../../../../../_shared/figma-code-invariants.md)).

### 2. Компонентная база (react_base)

1. Атомы → молекулы по приоритету манифеста / inventory из Prototype.
2. Имя файла и экспорта = имя в Figma **один в один**; вариант = проп.
3. Состояния: default / hover / focus / disabled / error — CSS + пропы.
4. Интерактивные controls — uncontrolled fallback (`useState`), чтобы Storybook кликался.

### 3. Storybook

1. Scaffold `@storybook/react-vite` при отсутствии.
2. На каждый компонент — stories: все варианты и состояния.
3. Опционально одна ★ Playground-story на группу (составной демо-экран).
4. Gate: `npm run build-storybook` проходит; вручную проверить 2–3 интерактива.

### 4. Манифест

Обнови таблицу Компоненты: файл, story, состояния, статус `covered` где stories полные.

## Gate

- [ ] токены покрывают foundations из манифеста;
- [ ] ≥3 компонента со stories;
- [ ] build-storybook без ошибок;
- [ ] имена = Figma.

## Rules

- Бандл Claude Design (если есть) — источник CSS/JSX; иначе — манифест + Figma MCP
  точечно (`infra/figma-mcp`), не сканировать весь файл.
- Моушен — по `emil-design-eng` при необходимости, не раздувать scope.
- Не собирать продуктовые экраны здесь — это `app-live`.
