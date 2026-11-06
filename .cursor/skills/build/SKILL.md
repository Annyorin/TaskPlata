---
name: build
description: Роутер группы «сборка» (3 подскилла) — зеркало DS в React+Storybook, оживление экранов, GitHub и деплой. Применять на «собери в код», «Storybook», «оживи прототип», «задеплой», «react_base», «screens», «wire», «Vercel» — когда конкретный подскилл не назван.
---

# Build — роутер группы

Среды: `05-code/` (зеркало), при переносе экранов — также артефакты `04-prototype/outputs/`.
Канон: [`_shared/code/PIPELINE.md`](../../../_shared/code/PIPELINE.md).

| Задача | Подскилл | Фаза |
|--------|----------|------|
| React-база + токены + Storybook (react_base) | `ds-to-code` | 1 |
| экраны из базы + навигация/формы/моки/edge (screens + wire) | `app-live` | 2 |
| GitHub handoff + Vercel/Netlify/CF/VPS | `ship` | 3 |

## Полный цикл

```
ds-to-code → app-live → ship
```

**Gate** между фазами — в скилле. Юзер-тесты после ship — `quality/user-test-loop`.

## Дедуп-вахта

| Задача | Здесь | Не путать с |
|--------|-------|-------------|
| индекс DS в Figma | — | `ds/figma-ds-link` |
| hi-fi макеты в Figma | — | Prototype / `structure` |
| ревью «нейронка» / DS | — | `quality/*` |
| health-check git | — | `infra/git-github-check` (проверка, не handoff) |
