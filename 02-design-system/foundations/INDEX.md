---
type: foundations
env: 02-design-system
status: draft
updated: 2026-11-10
---

# Foundations

Снято с кадров входа, главной, платежей, карт и доставки. В Figma это коллекции `Foundation / Primitive`, `Foundation / Semantic`, `Foundation / Space`, `Foundation / Radius`, текстовые стили `Foundation/…` и доска `Foundations` на странице «Дизайн-система».

В этом файле Figma нет отдельных семейств SF Pro Display и SF Pro Text. Оба оптических размера идут семейством **SF Pro**.

## Цвет

Примитивы. Семантика на них ссылается.

| Токен | Hex | Откуда |
|-------|-----|--------|
| orange/500 | `#FF5000` | заливка primary-кнопки |
| ink/900 | `#121416` | текст. На jpeg он сжимается почти в чёрный |
| white | `#FFFFFF` | карточки и шиты |
| canvas | `#F7F7F9` | фон экрана |
| gray/500 | `#8A8A8C` | вторичный текст |
| green/500 | `#12B94E` | галка успеха |
| red/500 | `#EC262F` | счётчик на таббаре |
| purple/500 | `#5F2EB4` | статус Frozen, короткая подпись |

| Роль | Алиас |
|------|--------|
| bg/canvas | canvas |
| bg/surface | white |
| bg/inverse | ink/900 |
| text/primary | ink/900 |
| text/secondary | gray/500 |
| text/inverse | white |
| fill/brand | orange/500 |
| fill/success | green/500 |
| fill/danger | red/500 |
| fill/frozen | purple/500 |

Синий переключателя и ссылки Show на кадрах слишком мелкие, в токены не попали.

## Текст

| Стиль | Шрифт | Кегль / интерлиньяж | Трекинг | Роль |
|-------|--------|---------------------|---------|------|
| Heading 3XL | SF Pro Bold | 34 / 40 | 0.37 | заголовок экрана |
| Heading 2XL | SF Pro Bold | 28 / 34 | 0 | заголовок шита, крупная сумма |
| Heading LG | SF Pro Bold | 20 / 24 | 0.38 | секция, сумма в карточке |
| Heading MD | SF Pro Semibold | 17 / 20 | −0.41 | кнопка, имя |
| Heading SM | SF Pro Semibold | 13 / 16 | 0 | таб, плитка |
| Body LG | SF Pro Regular | 17 / 20 | −0.41 | строка списка |
| Body MD | SF Pro Regular | 15 / 18 | −0.24 | подзаголовок |
| Body SM | SF Pro Regular | 13 / 16 | 0 | подпись |

## Отступы

Шаг 4: 0, 4, 8, 12, 16, 20, 24, 32, 40.

## Радиус

8 миниатюра карты, 12 поле, 16 плитка, 20 карточка счёта, 32 шит, 999 капсула и круг.

## Тень

`Foundation/Card` — тихая тень белой карточки на сером фоне: y 4, blur 16, чёрный 8%. Это уровень, не замер с кадра.
