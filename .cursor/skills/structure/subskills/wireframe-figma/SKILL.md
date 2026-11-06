---
name: wireframe-figma
description: Pre-DS / Structure — low-fi wireframes в Figma из PRD и сценариев через MCP (серые фреймы, без компонентов DS). Использовать когда нужны каркасы в Figma перед дизайн-системой: «low-fi в Figma», «вайрфреймы из PRD через MCP».
---

# Wireframe Figma — low-fi через MCP

## Среда

`04-prototype/`. Результаты:
- low-fi frames в Figma Design file;
- спеки/ссылки в `screens/` + строки в `screens/SCREEN-MAP.md` (пометка `lofi`);
- `flows/component-inventory.md` по
  [`component-inventory.md`](../../../../../_shared/templates/component-inventory.md).

Предусловие: `flows/scenarios.md` (или явный список экранов из PRD).  
Желательно: `flows/figjam.md`.  
Перед MCP: `infra/figma-mcp` + `/figma-generate-design` или `use_figma` для серых каркасов.

**Исключение pre-DS:** зеркало `ds-manifest` не обязательно — каркасы **без** инстансов DS.

## Process

1. Список экранов из scenarios / FigJam.
2. Создай или открой **Design** file (не FigJam) для wireframes; page `Lo-Fi`.
3. На каждый экран — frame (мобильный/десктоп по PRD): серые блоки, подписи ролей
   («header», «list», «CTA»), без брендового цвета и без ComponentSet DS.
4. Связь с сценариями: в имени frame или в `screens/<name>.md` — `SC*`.
5. SCREEN-MAP: экран | node-id | `lofi` | version `pre-ds`.
6. **Скриншоты в чат** — `get_screenshot` собранных кадров (`enableBase64Response: true`);
   показать пользователю. Канон §5b.
7. **Component inventory**: пройди каркасы → таблица атомов (Button, Input, Card…)
   в `flows/component-inventory.md` — вход в DS.

## Gate

- [ ] все Must-сценарии имеют хотя бы один кадр;
- [ ] нет использования библиотеки DS (её ещё может не быть);
- [ ] inventory заполнен (≥5 кандидатов в компоненты или «мало экранов» с пометкой);
- [ ] скриншоты экранов вынесены в чат.

## Rules

- HTML-доска (`wireframe-board`) — параллельный обзор, не замена этого шага перед DS.
- Hi-fi и `search_design_system` — только после появления manifest (обычный цикл Prototype).
- После inventory — задача в группу `ds` (gate «с нуля» уже закрыт pre-DS).

Канон: [`PRE-DS-PIPELINE.md`](../../../../../_shared/structure/PRE-DS-PIPELINE.md).
