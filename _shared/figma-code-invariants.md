---
type: invariants
status: active
updated: 2026-09-02
source: адаптировано из Pixel Perfect / quickstart.md (раздел «Что ОБЯЗАТЕЛЬНО держать в голове»)
---

# Инварианты Figma ↔ код

Обязательные правила при работе с дизайн-системой в двух зеркалах: Figma (среда 2, 4)
и код (среда 5). Нарушение любого пункта — технический долг, который нужно закрыть
в той же итерации.

Краткая выжимка для агента — в [`AGENTS.md`](../../AGENTS.md), раздел «Инварианты».

---

## 1. Только токены, без захардкоженных значений

Цвета, размеры, отступы, радиусы и шрифты **не пишутся напрямую** в компонентах.
Единственный источник значений — каталог `05-code/tokens/` (CSS-переменные, TS, конфиг
проекта).

| Где закреплено |
|----------------|
| [`05-code/AGENTS.md`](../../05-code/AGENTS.md) — рабочий цикл, п. 4 |
| [`.cursor/rules/50-code-scope.mdc`](../../.cursor/rules/50-code-scope.mdc) |
| скилл `ds/design-system-sync` — фаза извлечения токенов |

---

## 2. Имена один в один

Компонент в React и в Figma называется **одинаково**. Свойство варианта в Figma =
проп в React. Расхождение имён ломает Code Connect и сверку паритета.

| Где закреплено |
|----------------|
| [`02-design-system/figma/registry.md`](../../02-design-system/figma/registry.md) — реестр имён и node-id |
| [`05-code/outputs/code-manifest.md`](../../05-code/outputs/code-manifest.md) — трассировка к манифесту DS |
| скилл `ds/design-system-sync` — фаза Code Connect |

---

## 3. Синхронизация сразу, без накопления долга

Каждая значимая итерация — **мгновенное зеркалирование**: изменил в Figma → обновил
описание и реестр в среде 2 → отразил в `ds-manifest.md` → при необходимости в коде.
Не откладывать «синк на потом».

| Где закреплено |
|----------------|
| [`02-design-system/AGENTS.md`](../../02-design-system/AGENTS.md) — рабочий цикл |
| [`AGENTS.md`](../../AGENTS.md) — поток данных между средами |
| [`.cursor/rules/20-design-system-isolation.mdc`](../../.cursor/rules/20-design-system-isolation.mdc) — инвариант «текст = Figma» |

---

## 4. Сверка паритета после каждой значимой итерации

После изменения компонента, токена или экрана — **проверка соответствия** Figma и кода
(parity check). Расхождения фиксируются явно, а не замалчиваются.

| Как делать | Где закреплено |
|------------|----------------|
| Скилл `ds/design-system-sync`, фаза 5.1 | [`.cursor/skills/ds/subskills/design-system-sync/SKILL.md`](../../.cursor/skills/ds/subskills/design-system-sync/SKILL.md) |
| Шаблон отчёта | [`_shared/templates/parity-report.md`](parity-report.md) |
| Рабочий файл | `05-code/parity-report.md` или `05-code/reports/parity-YYYY-MM-DD.md` |
| Формальное ревью макета | скилл `quality/design-review` |

---

## 5. Технические ограничения записи в Figma

При создании и правке узлов через Figma MCP:

- **Не вызывать** `resize(W, 0)` на auto-layout — ломает вёрстку.
- **Не создавать** узел TEXT без привязки текстового стиля (`setTextStyleIdAsync`).
- **Проверять высоту компонентов** после каждого батча создания/правки (см. п. 5a).
- **Скриншоты в чат** после проектирования / создания / правки (см. п. 5b).

| Где закреплено |
|----------------|
| [`.cursor/skills/infra/subskills/figma-mcp/SKILL.md`](../../.cursor/skills/infra/subskills/figma-mcp/SKILL.md) — раздел «Ошибки записи» |
| скиллы `ds/handoff-to-figma`, `build/figma-to-proto` — надстройки над `figma-mcp` |
| [`.cursor/rules/25-figma-screenshots-in-chat.mdc`](../../.cursor/rules/25-figma-screenshots-in-chat.mdc) |

### 5a. Высота компонентов (обязательный QA)

Симптом: в канвасе «прозрачные» / обрезанные компоненты при живых fills — обычно
`height` зафиксирован слишком маленьким (часто ~10–100px) при `clipsContent: true`,
или `primaryAxisSizingMode = FIXED` после `resize(W, H)` убивает hug.

**После каждого батча компонентов / low-fi экранов:**

1. Считать `width`/`height` у COMPONENT, COMPONENT_SET и ключевых FRAME.
2. Для auto-layout по оси контента — `primaryAxisSizingMode` / `counterAxisSizingMode` = **AUTO** (hug), не FIXED, если высота не осознанный артборд.
3. Не оставлять родительский frame высотой меньше суммы детей + padding + itemSpacing.
4. Сделать `get_screenshot` хотя бы одного атомарного компонента и одного составного (карточка / empty) — контент должен читаться целиком.
5. На странице Components развести узлы по Y с зазором, чтобы наборы не перекрывались.

| Где закреплено |
|----------------|
| [`02-design-system/AGENTS.md`](../../02-design-system/AGENTS.md) — качество |
| [`.cursor/skills/ds/subskills/handoff-to-figma/SKILL.md`](../../.cursor/skills/ds/subskills/handoff-to-figma/SKILL.md) — QA высоты |

### 5b. Скриншоты экранов и компонентов в чат (обязательно)

Когда проектируем, создаём новые или меняем компоненты / экраны в Figma — после
батча записи агент **обязан**:

1. Вызвать `get_screenshot` по затронутым экранам (и ключевым компонентам).
2. Передать `enableBase64Response: true`, чтобы кадр был виден в чате.
3. В ответе пользователю показать эти скриншоты и кратко сказать, что изменилось.

Батч без скриншотов в чате не закрывать. Чистое чтение без записи — скриншот
не обязателен.

| Где закреплено |
|----------------|
| [`.cursor/rules/25-figma-screenshots-in-chat.mdc`](../../.cursor/rules/25-figma-screenshots-in-chat.mdc) |
| [`04-prototype/AGENTS.md`](../../04-prototype/AGENTS.md), [`02-design-system/AGENTS.md`](../../02-design-system/AGENTS.md) |
| скилл `infra/figma-mcp` |

---

## 6. Перезапуск IDE после настройки MCP

После создания или изменения конфигурации MCP (`.cursor/mcp.json` или аналог в Cursor)
— **перезапустить IDE**, иначе сервер Figma может не подхватиться.

| Где закреплено |
|----------------|
| [`.cursor/skills/infra/subskills/figma-mcp/SKILL.md`](../../.cursor/skills/infra/subskills/figma-mcp/SKILL.md) — первичное подключение |

---

## Карта пересечений (что уже было в метасреде)

| Правило | Было до этого файла | Статус |
|---------|---------------------|--------|
| Только токены | `05-code/AGENTS.md`, `50-code-scope.mdc`, `design-system-sync` | дополнено ссылками |
| Имена 1:1 | частично в `registry.md`, Code Connect | оформлено явно |
| Синк сразу | `02-design-system/AGENTS.md`, инвариант дрейфа | оформлено явно |
| Parity check | дрифт в `design-system-sync` | названо и привязано |
| resize / TEXT style / высота | `figma-mcp`, §5a | дополнено |
| Скриншоты в чат после записи | **не было явно** | §5b + rule `25-figma-screenshots-in-chat` |
| Рестарт IDE | **не было** | добавлено в `figma-mcp` |
