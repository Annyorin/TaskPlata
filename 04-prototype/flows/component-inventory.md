---
type: component-inventory
env: 04-prototype
status: draft
updated: 2026-11-10
---

# Component inventory (вход в DS)

Выведено из low-fi страницы «Lo-Fi» (`2217:1131` + `2324:1322`) и HTML-доски. Кандидаты, не компоненты DS.

| Компонент (рабочее имя) | Где нужен (экраны) | Варианты / состояния | Приоритет |
|-------------------------|--------------------|----------------------|-----------|
| Home cash card | HOME / W-CASH | nearest ATM, active request, attention | M |
| Cash hub header | CASH | first time, has request, off | M |
| How-to step | HOWTO | 1, 2, 3 | S |
| Amount field | NEW-AMT | default, error | M |
| Amount chips | NEW-AMT | default, selected | M |
| Account row | NEW-AMT | selected, fee, free | M |
| ATM recommendation | NEW-ATM | recommended | M |
| Summary rows | NEW-SUM, DONE, SH-CONFIRM | receive, fee, total | M |
| Created overlay | OV-CREATED | step 1/3 | M |
| Readiness ring | REQ | 5/5, 4/5 attention, expired | M |
| Search field | MAP | default, filled | M |
| Filter chip | MAP | default, selected | M |
| ATM row | MAP | open, closed, 24h | M |
| ATM detail | ATM-DET | photo, status, actions | M |
| Info row | ATM-DET, REQ, SH-CONFIRM, DONE | label + value | M |
| Button | почти все | primary, secondary, on dark | M |
| Sheet | SH-CHEAP, SH-REDIRECT, SH-CANCEL, SH-CONFIRM | title, body, 2–3 CTA | M |
| Overlay dim | OV-CREATED, OV-CALL, ESC-ALERT | sheets and alerts | M |
| ATM prompt | ATM-MODE подсказка | silhouette + step | M |
| Live QR | ATM-MODE QR | 30 s, exit | M |
| Confirm sheet | SH-CONFIRM | amount, face, reject | M |
| Dispense lock | ATM-MODE выдача | no dismiss | M |
| Refund tracker | FAIL | 3 steps | M |
| Empty geo | MAP-GEO | districts + enable location | S |
| Inline error | NEW-AMT-ERR | missing amount + alternatives | M |

## Не компоненты (пока паттерны)

- Карта с пинами: фон и точки, не отдельный компонент.
- Статус-бар и «назад»: хром кадра, на hi-fi из hola / iOS.
- Физический экран банкомата: вне приложения.
