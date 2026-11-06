---
type: visual-prompt-schema
env: 03-content
updated: 2026-09-02
---

# Схема JSON-промпта (visual/prompts/*.json)

```json
{
  "asset_key": "string — совпадает с content-package",
  "mode": "text-to-image | image-to-image | reference-based | inpainting | outpainting",
  "tool": "midjourney | krea | nano-banana | gpt-image | weave",
  "style": {
    "sref": "url | null",
    "sref_weight": 100,
    "style_ref_image": "path | null",
    "palette": ["#hex"],
    "negative": ["string"]
  },
  "composition": {
    "aspect": "1:1 | 4:3 | 16:9 | …",
    "focal_point": "string",
    "camera": "string"
  },
  "subject": "string",
  "scene": "string",
  "lighting": "string",
  "i2i": {
    "source": "path to collage or frame",
    "strength": 0.45
  },
  "grid": {
    "rows": 4,
    "cols": 4,
    "cell_usage": "icon set | pattern | variants"
  },
  "seed": null,
  "series_id": "string — общий id для серии",
  "series_index": 1,
  "notes": "string"
}
```

Правила:
- Один ассет — один JSON. Варианты итераций — `series_index` или отдельные файлы `-v2.json`.
- `tool` согласован с матрицей в `_shared/content/VISUAL-PIPELINE.md`.
- После генерации в `content-package` ссылка на этот файл в колонке «Промпт».
