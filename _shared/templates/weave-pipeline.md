---
type: weave-pipeline
env: 03-content
status: draft
asset_key: string
updated: YYYY-MM-DD
---

# Weave pipeline — <asset_key>

Figma file: `fileKey` → `02-design-system/figma/registry.md` (если заведён)  
Шаблон: Welcome | Iterations | Editing | Compositor

## Входы
| Нода | Тип | Источник |
|------|-----|----------|
| prompt | text | `visual/prompts/<asset>.json` |
| style_ref | image | `visual/styles/…` |
| base_image | image | `visual/assets/…` |

## Граф нод

```
[Welcome: prompt + refs] → [Iterations: branch A/B] → [Editing: inpaint/upscale] → [Compositor: layers]
```

## Выход
- Файл: `visual/assets/<asset_key>-weave.png`
- Параметры финальной ноды:

## Итерации
| # | Что меняли | Результат |
|---|------------|-----------|

## MCP
Вызов через `infra/figma-mcp` → weave_list_tools / weave_run_tool.
