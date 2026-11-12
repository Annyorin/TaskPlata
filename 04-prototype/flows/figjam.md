---
type: figjam-board
env: 04-prototype
status: draft
updated: 2026-11-10
---

# FigJam — sitemap и user flows

**Figma board URL:** [Плата — снятие по QR](https://www.figma.com/board/wuavgnZfhQSrc1t93ezdcp/?node-id=87-1542)  
**fileKey:** `wuavgnZfhQSrc1t93ezdcp`  
**Секция:** `87:1542` Plata QR canon  
**Зарегистрирован в** `02-design-system/figma/registry.md`: yes (владелец доски — Prototype; новая секция канона — 2026-11-10)

Источник: [`IA.md`](IA.md), план экранов [`qr-withdraw-flow.md`](qr-withdraw-flow.md), сценарии [`scenarios.md`](scenarios.md).

Старый форк Т-банка **не канон:** секция [`37:4202`](https://www.figma.com/board/wuavgnZfhQSrc1t93ezdcp/?node-id=37-4202). Не патчить.

## Sitemap

| Узел | Тип | Родитель | Примечание |
|------|-----|----------|------------|
| Главная | раздел | корень | таббар |
| W-CASH | экран (карточка) | Главная | вход и статус заявки |
| Карта: Снять без карты | entry | Карта | не рядом с Перевод / Пополнение |
| CASH | экран-хаб | Наличные | одно место без карты |
| HOWTO | модал | CASH | только первый раз |
| NEW-AMT / NEW-ATM / NEW-SUM | модальный поток | CASH | 3 шага заявки |
| MAP | экран | CASH / REQ | поиск сети |
| ATM-DET | экран | MAP | фото, этаж, «Снять здесь» |
| REQ | экран | CASH | заявка 24 ч, QR нет |
| ATM-MODE | fullscreen | REQ | живой QR 30 с |
| SH-CONFIRM | шит | ATM-MODE | Face ID после скана |
| DONE | экран | выдача ок | чек |
| FAIL | экран | выдача нет | автовозврат |

## User flows

| ID | Название | Старт → финиш | Узлы FigJam |
|----|----------|---------------|-------------|
| F1 | Дома: создать заявку | Главная / карта → REQ | `87:1549` |
| F2 | Поиск банкомата | CASH/REQ → Снять здесь | `87:1551` |
| F3 | У банкомата | REQ → DONE / FAIL | `87:1553` |

## Связь с PRD

PRD ещё нет. Трассировка к заданию T1–T6, JTBD J1–J8, MoSCoW в [`ice-moscow.md`](ice-moscow.md).
