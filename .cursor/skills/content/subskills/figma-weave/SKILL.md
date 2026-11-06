---
name: figma-weave
description: Фаза 5 контента — нодовые пайплайны в Figma Weave (Welcome, Iterations, Editing, Compositor) для визуальных ассетов. Использовать когда нужна композиция слоёв, ветвление вариантов или inpaint/upscale внутри Figma.
---

# Figma Weave — фаза 5

## Среда

`03-content/`. Результат: `visual/weave/<asset_key>-pipeline.md` по шаблону
[`weave-pipeline.md`](../../../../../_shared/templates/weave-pipeline.md)
+ `visual/assets/<asset_key>-weave.png`.

Предусловие: `infra/figma-mcp` загружен; есть промпт и хотя бы один слой/кадр.

## Шаблоны пайплайнов

| Шаблон | Когда |
|--------|-------|
| **Welcome** | старт: prompt + refs + aspect |
| **Iterations** | 2+ ветки визуала (A/B hero) |
| **Editing** | inpaint, upscale, color correction |
| **Compositor** | фон + субъект + оверлей (маркетинг) |

Типичная цепочка: `Welcome → Iterations → Editing → Compositor`.

## Process

1. Выбери шаблон под задачу из брифа.
2. Задокументируй граф нод в `-pipeline.md` до работы в Figma.
3. Входы: `visual/prompts/*.json`, `visual/assets/*`, style refs.
4. MCP: `weave_list_tools` → `weave_get_tool_inputs` → `weave_run_tool`.
5. Фиксируй итерации в таблице pipeline-файла.
6. Экспорт финала → `visual/assets/<asset_key>-weave.png`.

## Gate

- [ ] pipeline.md описывает граф;
- [ ] финальный экспорт есть;
- [ ] не затронуты UI-компоненты DS (только ассеты).

## Rules

- Weave — **визуальные ассеты** контента, не экраны продукта (среда 4).
- fileKey — через registry среды 2, если файл общий; иначе отдельный Weave-файл
  с пометкой в `NOTES.md`.
- При лимите MCP — пользователь выполняет ноды вручную по `-pipeline.md`.

Канон: [`VISUAL-PIPELINE.md`](../../../../../_shared/content/VISUAL-PIPELINE.md) §10.
