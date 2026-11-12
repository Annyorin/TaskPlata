# Аудит приложения Banco Plata по SCRN

Источник: [scrn.gallery/app/plata](https://scrn.gallery/app/plata). iOS, приложение 2.0 (Liquid Glass), снимок от 10 июня 2026: 160 сценариев, 93+ экрана. Снимок сделан **до запуска сети банкоматов** (июль 2026), поэтому снятия наличных в нём нет.

## Главное

1. **Ни одного сценария снятия наличных или карты банкоматов.** Функция проектируется с нуля. Ничего существующего ломать не нужно, но и опереться не на что.
2. **«Перевод» и «Пополнение» стоят парой в трёх местах:**
   - вкладка Pay (Deposit + Transfer вверху);
   - экран счёта Cuenta (Deposit / Bill pay / Transfer);
   - экран кредита (Pay / Bill pay / Transfer).

   Ряд быстрых действий счёта — запретная зона по условию задачи.
3. **На экране карты уже есть «ATM Withdrawals».** Это переключатель в «Security options»: Show PIN, Change PIN, Online purchases, ATM Withdrawals. Для пользователя банкомат уже связан с картой и её настройками — это естественный «дом» для снятия без карты.
4. **В приложении уже есть шаблон «код для получения денег».** Пополнение наличными в OXXO через tapipay показывает 16-значный код («Read the numbers to the cashier»), комиссию ($52) и лимит ($5 000). **Справа вверху у этого кода — кнопка «Поделиться».** Для пополнения это безопасно, а для снятия такой паттерн опасен: его нельзя переносить как есть.
5. **У безопасности есть бренд — «Escudo de Plata».** Это тёмный экран в Profile → Financial security: «Monto transaccional» (сумма, выше которой операция требует дополнительной проверки), лимит денежных операций, доверенные получатели. Защиту QR-снятия логично показывать как часть Escudo, а не изобретать новый язык.
6. **Снятие с кредита уже существует, но только переводом.** Кнопка «Withdraw» на экране кредита ведёт в сценарий «Withdraw your available balance with MSI»: сумма → план платежей → перевод по CLABE. Комиссия показана явно («Commission for deferring $24.36»), путь денег тоже («Crédito → Cuenta → BBVA»). Это хороший образец честного раскрытия цены, но слово «Withdraw» уже занято значением «перевести с кредита». Название для наличных нужно другое, иначе будет путаница.

## Карта информационной архитектуры

```
Нижняя плавающая панель: Home · Pay · Invest · Invite ($200) + отдельная кнопка чата (Support)

Home
├── Профиль (аватар) → Plata+, Verify identity, Personal details,
│                      Financial security («Escudo de Plata»), Destination accounts, Settings…
├── Cashback · MSI to defer
├── Transactions
├── Crédito — баланс, карты (физ. + вирт. + «+»), Payment dates
│   └── экран кредита: Withdraw (MSI), Pay / Bill pay / Transfer, Credit payment, Pay with CLABE…
│       └── карта: Set limit, Freeze / Reissue / Discard, Security options (PIN, Online, ATM Withdrawals)
├── Cuenta — баланс, карты, «+ Ahorro»
│   └── экран счёта: Deposit / Bill pay / Transfer, Transactions, Deposit with CLABE, «Transfer your salary»
│       └── карта: те же Freeze / Reissue / Discard, Security options
├── Ahorro Fijo 7% — Deposit
├── Investment portfolio
└── NEW PRODUCTS (скрытый раздел внизу)

Pay
├── Deposit · Transfer            ← запретная пара
├── Favorites
└── Bill payments

Пополнение кредита → Card / From my Plata account / CLABE / Cash
                     Cash → In stores (OXXO, Kiosko — код tapipay) / In banks (BBVA, Banorte…)
```

## Какие пробелы это закрывает

| Пробел (из предыдущего разбора) | Что теперь известно | Что осталось открытым |
|---|---|---|
| Где «Перевод» и «Пополнение» | Вкладка Pay и ряд быстрых действий на экранах счетов | — |
| Структура приложения 2.0 | Четыре вкладки + чат, счета карточками на Home, карты внутри счетов | Как именно настраивается Home в 2.0 |
| Есть ли карта банкоматов | Нет (на июнь 2026) | Не появилась ли после запуска сети |
| Счета, с которых можно снять | Cuenta, Crédito, Ahorro Fijo (+ Flexible по сайту) | Правила по каждому |
| Тон и язык | Интерфейс на английском и испанском; короткие глаголы; комиссия показывается явно | Испанская версия текстов |
| Паттерн безопасности | «Escudo de Plata», Monto transaccional, Monetary operations limit | Есть ли распознавание звонка или скриншота |
| Код для получения денег | tapipay-код с кнопкой «Поделиться» | — |

## Выводы для точки входа

- **Не подходят:** вкладка Pay (там Deposit + Transfer) и ряд быстрых действий счёта (там Deposit / Transfer).
- **Сильные кандидаты:**
  1. **Экран карты** рядом с Freeze / Reissue / Discard. Ментально «снять без карты» — действие про карту, а «ATM Withdrawals» уже живёт в её настройках. Плюс: охватывает сценарии «карта заморожена, перевыпускается, едет».
  2. **Отдельная карточка на Home** в духе карточек Cashback / MSI. Например, «Cajeros Plata · 2 рядом» с живым статусом. Она становится частью сетки виджетов, а не ряда денежных операций. Риск: пользователь может убрать её при настройке Home.
  3. **Кнопка в шапке экрана счёта** по аналогии с «+ Ahorro» и «Withdraw»: это точечная акция вне ряда быстрых действий. Но слово «Withdraw» уже занято — нужен значок наличных и другое название, например «Efectivo».
- **Контекстные входы:** баннер в отслеживании доставки карты («Карта едет — наличные доступны уже сейчас»), экран заморозки карты, NEW PRODUCTS.

## Выводы для безопасности и контента

- Не повторять у QR кнопку «Поделиться», как у кода tapipay. Явно объяснить, почему её нет.
- Показывать защиту через Escudo de Plata: тёмный «защищённый» режим экрана с QR визуально связан с брендом безопасности.
- Monto transaccional уже приучает к дополнительной проверке крупных операций. Подтверждение снятия на телефоне впишется в ту же логику.
- Комиссию снятия с кредита показывать так же, как в сценарии Withdraw: построчно, с итогом и путём денег.

## Экраны-ориентиры

- Главный экран: https://scrn.gallery/app/plata?screen=6a28701d2a7044080ba1e167
- Главный экран, счета: https://scrn.gallery/app/plata?screen=6a28701d2a7044080ba1e168
- Вкладка Pay: https://scrn.gallery/app/plata?screen=6a29b71d78d043a3a8a0e3a4
- Экран Cuenta: https://scrn.gallery/app/plata?screen=6a296b83c29e72170c8764a2
- Экран Crédito с Withdraw: https://scrn.gallery/app/plata?screen=6a29635fc29e72170c86e18c
- Карта: https://scrn.gallery/app/plata?screen=6a296b864b415cd45f34339a
- Security options с ATM Withdrawals: https://scrn.gallery/app/plata?screen=6a29636298728aa370324acb
- Код tapipay в OXXO: https://scrn.gallery/app/plata?screen=6a29bac178d043a3a8a10b35
- Escudo de Plata: https://scrn.gallery/app/plata?screen=6a29d8e578d043a3a8a1746f
- Условия снятия с кредита: https://scrn.gallery/app/plata?screen=6a2ac876f6d36d2b4dae050f
