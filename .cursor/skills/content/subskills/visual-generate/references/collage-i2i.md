# Collage → visual (image-to-image)

Предусловие: JSON с `mode: image-to-image` и коллаж.

## Результаты

- `visual/assets/<asset_key>-collage.png`;
- `visual/assets/<asset_key>.png`.

## Process

1. Коллаж: блоки, стрелки, роли (не финальный дизайн).
2. Сохранить `-collage.png`; обновить `i2i.source`.
3. **Strength 0.35–0.55** — ниже = layout, выше = дрейф.
4. Инструмент: Krea i2i или MJ image prompt — по брифу (`tool`).
5. При дрейфе — снизить strength или зафиксировать контуры в Krea canvas.
6. Точечная доводка → ветка GPT Image или `figma-weave`.

## Gate

- [ ] композиция узнаваема vs коллаж;
- [ ] стиль = ToV;
- [ ] collage сохранён для трассировки.

## Rules

- Коллаж = структура; стиль — в JSON style / sref.
- Wireframe из среды 4 — только как экспорт PNG.

Канон: VISUAL-PIPELINE §9.
