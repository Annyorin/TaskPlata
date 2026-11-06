# Krea — Flux 2, canvas, upscale

Предусловие: JSON с `"tool": "krea"`.

## Результат

`visual/assets/<asset_key>.png` (+ опционально `-canvas.png`).

## Workflow

### A. Поиск композиции (Real-time canvas)

1. Набросок на canvas; промпт из JSON — фокус на композицию.
2. Style Explorer — перебор стиля без смены сцены.
3. Экспорт → `visual/assets/<asset_key>-canvas.png`.

### B. Финал (Flux 2 Pro)

1. Canvas-кадр или t2i из JSON.
2. Полный subject + scene + lighting.
3. Апскейлер → целевое разрешение (hero 2× retina).

### C. Image-to-image

Если `mode: image-to-image` — strength из `i2i.strength`.

## Gate

- [ ] путь в `notes` (canvas → flux → upscale);
- [ ] финал в assets;
- [ ] разрешение ≥ брифа.

## Rules

- Canvas = поиск, Flux 2 = финал; upscale на hero обязателен.

Канон: VISUAL-PIPELINE §6.
