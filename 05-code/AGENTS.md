# Среда 5 — Code

Кодовое воплощение дизайн-системы: токены, React-компоненты, Storybook, живой
прототип, ship (GitHub + деплой). Второе зеркало DS рядом с Figma-прототипом.

Канон: [`../_shared/code/PIPELINE.md`](../_shared/code/PIPELINE.md).

## Границы

- Работаю только в `05-code/` (и в корне app-репо, если пользователь указал путь
  проекта как workspace code — тогда артефакты манифеста всё равно здесь).
- Входы: `02-design-system/outputs/ds-manifest.md`, `04-prototype/outputs/build-log.md`.
- Наружу: `outputs/code-manifest.md`.
- DS не меняю — расхождение → контракт в среду 2.

## Структура

| Каталог | Содержимое |
|---------|------------|
| `tokens/` | CSS/TS-токены из манифеста DS |
| `components/` | React-компоненты, имена = Figma |
| `stories/` | Storybook: варианты и состояния |
| `app/` или внешний путь | экраны, навигация, моки (если прототип здесь) |
| `outputs/` | `code-manifest.md` |

## Рабочий цикл

```
ds-to-code → app-live → ship → [user-test-loop]
```

1. Сверь `implements-version` с `version` манифеста DS.
2. `ds-to-code` — токены, компоненты, Storybook.
3. `app-live` — экраны из базы + поведение (wire).
4. `ship` — GitHub, preview-деплой.
5. Находки тестов — `user-test-loop` (группа `quality`).

## Инвариант

Компонент без строки в манифесте DS и в `code-manifest` не считается готовым.
Хардкод цвета/отступа в компоненте — ошибка.
