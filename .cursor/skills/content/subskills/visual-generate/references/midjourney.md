# Midjourney — sref и серии

Предусловие: JSON с `"tool": "midjourney"`.

## Результаты

- `visual/assets/<asset_key>.png` (серия `-01`, `-02`…);
- `visual/styles/sref-library.md`.

## Process

1. **sref**: если нет в библиотеке — 3–5 референсов бренда → URL; запись в `sref-library.md`.
2. Промпт из JSON: subject + scene + lighting + composition.camera.
3. Параметры: `--sref <url> --sw <weight>` + aspect.
4. Серия: один sref, меняй только subject/scene; `series_id`.
5. Лучший кадр → `visual/assets/`; rejects опционально в `_rejects/`.
6. Seed / job id → `notes` в JSON.

## Gate

- [ ] sref задокументирован;
- [ ] ≥1 финал в assets;
- [ ] стиль согласован с ToV и брифом.

## Rules

- Только иллюстрации / маркетинг, не UI-макеты.
- Negative из JSON — в `--no` или тексте промпта.

Канон: VISUAL-PIPELINE §5.
