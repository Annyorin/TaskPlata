---
type: ds-component
env: 02-design-system
status: draft
figma-node: "2323:1154"
updated: 2026-11-10
---

# Button

## Назначение
Главное действие экрана и тихое соседнее действие. Капсула на всю ширину блока.

## Анатомия
Подпись `Foundation/Heading MD` по центру. Сверху и снизу `space/16`, по бокам `space/24`, радиус `radius/full`. Высота 52. Loading заменяет подпись дугой 20 px.

## Варианты
| Вариант | Значения | Когда |
|---------|----------|-------|
| Style | Primary, Secondary | Оранжевое действие и белая капсула (чек, ввести вручную) |
| State | Default, Pressed, Disabled, Loading | Pressed и Disabled на кадрах не было |
| Label | текст | У Loading подписи нет |

## Состояния
Default и Loading сняты с кадров. Pressed primary — `fill/brand-pressed` (`orange/600` `#E34700`). Pressed secondary — `bg/pressed` (`gray/200` `#D4D4D6`). Disabled primary — opacity 0.4. Disabled secondary — белая капсула и `text/secondary`. Error, hover и focus у кнопки нет: ошибка живёт у поля.

## Токены
| Свойство | Токен |
|----------|-------|
| Primary заливка | fill/brand |
| Primary текст | text/inverse |
| Secondary заливка | bg/surface |
| Secondary текст | text/primary |
| Радиус | radius/full |
| Подпись | Foundation/Heading MD |

## Правила применения
На ширину блока, не на ширину слова. На тёмном сканере Secondary остаётся белой.

## Чем не является
Icon button — отдельный круг 36. Action tile — плитка с иконкой и подписью под ней.
