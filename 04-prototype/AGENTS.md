# Среда 4 — Prototype

Сборка структуры (в т.ч. pre-DS), затем экранов и флоу в Figma на зеркале
дизайн-системы, с контентом из среды 3.

Канон pre-DS: [`../_shared/structure/PRE-DS-PIPELINE.md`](../_shared/structure/PRE-DS-PIPELINE.md).

## Границы

- Работаю только в `04-prototype/`.
- Входы:
  - всегда для hi-fi: `02-design-system/outputs/ds-manifest.md`, `03-content/outputs/content-package.md`;
  - **pre-DS:** достаточно `01-research/outputs/prd.md` (+ digest); manifest ещё может отсутствовать.
- Наружу отдаю `outputs/build-log.md`.
- Дизайн-систему **не меняю**. Нужен новый компонент — контракт к среде 2.

## Pre-DS (DS ещё нет)

Порядок: `figjam-ia` → `scenario-map` → `wireframe-figma` (+ `component-inventory`).
Артефакты: `flows/figjam.md`, `flows/scenarios.md`, `flows/component-inventory.md`,
low-fi frames. Затем — отдельная задача в группу `ds` (gate «с нуля»).

## Зеркало дизайн-системы

`mirror/` — локальная копия из `ds-manifest.md`, read-only.  
Перед **hi-fi** сборкой сверь `mirror/ds-mirror.md` с манифестом.  
Pre-DS low-fi зеркало не требует.

## Структура

| Каталог | Содержимое |
|---------|------------|
| `mirror/` | зеркало дизайн-системы, read-only |
| `screens/` | спецификации экранов + [`SCREEN-MAP.md`](screens/SCREEN-MAP.md) |
| `flows/` | FigJam, сценарии, inventory, переходы |
| `outputs/` | лог сборок и ссылки на узлы Figma |

Протокол Figma — `infra/figma-mcp`. Скиллы: `structure`, `build`, `quality`.

## Рабочий цикл (hi-fi)

1. Обнови зеркало из `ds-manifest.md`.
2. Опиши экран в `screens/` — из компонентов зеркала и ключей контент-пакета.
3. Собери в Figma: `search_design_system` → `use_figma`.
4. **Скриншоты в чат** — `get_screenshot` каждого собранного/изменённого экрана
   (`enableBase64Response: true`); показать кадры в ответе пользователю.
5. Свяжи экраны в `flows/`.
6. Запись в SCREEN-MAP и `outputs/build-log.md`.

То же для low-fi / правок существующих кадров: после записи — скриншот экрана в чат.
Канон: [`../_shared/figma-code-invariants.md`](../_shared/figma-code-invariants.md) §5b.

## Инвариант (hi-fi)

Ни один элемент экрана не создаётся вручную, если в зеркале есть подходящий компонент.
Отсутствие компонента — сигнал для среды 2. Low-fi pre-DS этому инварианту не подчиняется.
