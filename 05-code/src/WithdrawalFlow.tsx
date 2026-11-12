import { useEffect, useRef, useState, type ReactNode } from 'react'
import './styles/withdrawal.css'
import { AtmMap } from './AtmMap'
import withdrawalQr from './withdrawal-qr.svg?raw'

export type Withdrawal = { amount: number; fee: number; expiresAt: number }
export const money = (amount: number) => '$' + amount.toLocaleString('en-US')
export const expires = (timestamp: number) => new Intl.DateTimeFormat('ru-RU', {
  day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit',
}).format(timestamp)

const atms = [
  { name: 'Chedraui Polanco', address: 'г. Мексика, ул. Главная, д. 5', distance: '12 мин · 800 м', hours: 'Открыто до 23:00', x: 28, y: 30, tags: ['Открыт', 'QR-код', 'Снять наличные'] },
  { name: 'Torre Mayor', address: 'Paseo de la Reforma 505', distance: '15 мин · 1 км', hours: 'Круглосуточно', x: 61, y: 20, tags: ['Открыт', 'Круглосуточно', 'QR-код', 'Снять наличные'] },
  { name: 'Río Lerma', address: 'Río Lerma 232', distance: '18 мин · 1,2 км', hours: 'Открыто до 22:00', x: 21, y: 66, tags: ['Открыт', 'Снять наличные'] },
  { name: 'Río Atoyac', address: 'Río Atoyac 89', distance: '20 мин · 1,4 км', hours: 'Закрыто', x: 77, y: 60, tags: ['QR-код', 'Снять наличные'] },
  { name: 'Parque Lincoln', address: 'Emilio Castelar 163', distance: '24 мин · 1,7 км', hours: 'Открыто до 21:00', x: -19, y: 54, tags: ['Открыт', 'QR-код', 'Снять наличные'] },
  { name: 'Río San Joaquín', address: 'Av. Río San Joaquín 415', distance: '27 мин · 1,9 км', hours: 'Круглосуточно', x: 42, y: -20, tags: ['Открыт', 'Круглосуточно', 'QR-код', 'Снять наличные'] },
  { name: 'Circuito Interior', address: 'Circuito Interior 242', distance: '28 мин · 2 км', hours: 'Открыто до 22:00', x: 120, y: 25, tags: ['Открыт', 'Снять наличные'] },
  { name: 'Museo Tamayo', address: 'Paseo de la Reforma 51', distance: '31 мин · 2,2 км', hours: 'Открыто до 20:00', x: 52, y: 121, tags: ['Открыт', 'QR-код', 'Снять наличные'] },
  { name: 'Chapultepec', address: 'Av. Chapultepec 560', distance: '34 мин · 2,4 км', hours: 'Круглосуточно', x: 112, y: 112, tags: ['Открыт', 'Круглосуточно', 'QR-код', 'Снять наличные'] },
]
const filters = ['Открыт', 'Круглосуточно', 'QR-код', 'Снять наличные']
const accounts = [
  { name: 'Дебетовая карта', balance: '$16,307', image: '2-Container.png', fee: 0 },
  { name: 'Кредитная карта', balance: '$15,104.57', image: '2-Container2.png', fee: 10 },
  { name: 'Накопительный счёт', balance: '$8,483.91', image: '2-Image.png', fee: 0 },
]
const maxAmount = 9900
const demoCode = '1234'

function Art({ file, className }: { file: string; className?: string }) {
  return <img src={import.meta.env.BASE_URL + 'figma/' + file} className={className} alt="" />
}

function WithdrawalCode({ reveal }: { reveal: boolean }) {
  const gesture = useRef<{ id: number; x: number; y: number } | null>(null)
  const dragged = useRef(false)
  const [replay, setReplay] = useState(0)

  return <button type="button" className="flow-qr-image" data-reveal={reveal || replay > 0 || undefined}
    aria-label="Повторить анимацию QR-кода"
    onClick={event => {
      if (event.detail === 0 || !dragged.current) setReplay(count => count + 1)
    }}
    onPointerDown={event => {
      if (!event.isPrimary || event.button !== 0 || matchMedia('(prefers-reduced-motion: reduce)').matches) return
      dragged.current = false
      gesture.current = { id: event.pointerId, x: event.clientX, y: event.clientY }
      event.currentTarget.setPointerCapture(event.pointerId)
      event.currentTarget.dataset.tilting = ''
    }}
    onPointerMove={event => {
      const start = gesture.current
      if (!start || start.id !== event.pointerId) return
      if (Math.hypot(event.clientX - start.x, event.clientY - start.y) > 5) dragged.current = true
      if (!dragged.current) return
      const tilt = (distance: number) => Math.max(-8, Math.min(8, distance / 9)) + 'deg'
      event.currentTarget.style.setProperty('--qr-tilt-x', tilt(start.y - event.clientY))
      event.currentTarget.style.setProperty('--qr-tilt-y', tilt(event.clientX - start.x))
    }}
    onLostPointerCapture={event => {
      if (gesture.current?.id !== event.pointerId) return
      gesture.current = null
      delete event.currentTarget.dataset.tilting
      event.currentTarget.style.removeProperty('--qr-tilt-x')
      event.currentTarget.style.removeProperty('--qr-tilt-y')
    }}>
    <span key={replay} aria-hidden="true" dangerouslySetInnerHTML={{ __html: withdrawalQr }} />
  </button>
}

function Back({ onClick }: { onClick: () => void }) {
  return <button type="button" className="flow-icon" aria-label="Назад" onClick={onClick}><Art file="flow-back.svg" /></button>
}

function Overlay({ title, variant = '', onClose, children }: {
  title: string; variant?: string; onClose?: () => void; children: ReactNode
}) {
  const dialog = useRef<HTMLDialogElement>(null)
  useEffect(() => {
    const current = dialog.current
    current?.showModal()
    return () => current?.close()
  }, [])
  return <dialog ref={dialog} className={'flow-overlay ' + variant} aria-label={title}
    onCancel={event => { event.preventDefault(); onClose?.() }}>
    {children}
  </dialog>
}

type Step = 'map-loading' | 'map' | 'atm' | 'amount' | 'qr'
type Modal = 'location' | 'accounts' | 'help' | 'push' | 'pin' | 'processing' | null

export function WithdrawalFlow({ entry, withdrawal, onChange, onHome }: {
  entry: 'map' | 'qr'; withdrawal: Withdrawal | null; onChange: (value: Withdrawal | null) => void; onHome: () => void
}) {
  const [step, setStep] = useState<Step>(entry === 'map' ? 'map-loading' : entry)
  const [mapExpanded, setMapExpanded] = useState(false)
  const [permission, setPermission] = useState<'unknown' | 'allowed' | 'denied'>('unknown')
  const [modal, setModal] = useState<Modal>(null)
  const [selected, setSelected] = useState(0)
  const [activeFilters, setActiveFilters] = useState<string[]>(['Открыт'])
  const [route, setRoute] = useState(false)
  const [revealQr, setRevealQr] = useState(false)
  const [account, setAccount] = useState(0)
  const [amount, setAmount] = useState('')
  const [pin, setPin] = useState('')
  const [pinError, setPinError] = useState(false)
  const atm = atms[selected]
  const value = Number(amount)
  const fee = accounts[account].fee
  const validAmount = value > 0 && value <= maxAmount
  const visibleAtms = atms.filter(item => activeFilters.every(filter => item.tags.includes(filter)))
  const close = () => setModal(null)
  const helpTrigger = useRef<HTMLButtonElement>(null)
  const [helpClosing, setHelpClosing] = useState(false)
  const accountTrigger = useRef<HTMLButtonElement>(null)
  function closeAccounts() {
    close()
    requestAnimationFrame(() => accountTrigger.current?.focus({ preventScroll: true }))
  }
  function closeHelp() {
    close()
    setHelpClosing(false)
    requestAnimationFrame(() => helpTrigger.current?.focus({ preventScroll: true }))
  }

  function dismissHelp() {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) closeHelp()
    else setHelpClosing(true)
  }

  useEffect(() => {
    if (step !== 'map-loading') return
    const timeout = window.setTimeout(() => {
      setStep('map')
      if (permission === 'unknown') setModal('location')
    }, 3000)
    return () => window.clearTimeout(timeout)
  }, [step, permission])

  function openMap() {
    setRevealQr(false)
    setStep(permission === 'unknown' ? 'map-loading' : 'map')
  }

  function finish() {
    onChange(null)
    onHome()
  }

  function updateAmount(next: string) {
    if (/^\d{0,5}$/.test(next)) setAmount(next.replace(/^0+(?=\d)/, ''))
  }

  return <div className="withdrawal-flow">
    {step === 'map-loading' && <main className="flow-map-loading">
      <div className="flow-map-loading-art">
        <Art file="map-loading-lines.svg" />
        <p className="flow-map-loading-status" role="status">Загружаем карту</p>
      </div>
      <div className="flow-map-back"><Back onClick={onHome} /></div>
    </main>}
    {step === 'map' && <main className="flow-map-screen" aria-label="Карта банкоматов"
      data-expanded={mapExpanded || undefined}
      onScroll={event => {
        const screen = event.currentTarget
        const sheet = screen.querySelector<HTMLElement>('.flow-map-sheet')
        const header = screen.querySelector<HTMLElement>('.flow-map-sheet-header')
        if (sheet && header) {
          const stickyTop = parseFloat(getComputedStyle(header).top)
          setMapExpanded(screen.scrollTop >= sheet.offsetTop - stickyTop - 1)
        }
      }}>
      <AtmMap pins={visibleAtms} location={permission === 'allowed'} route={route ? atm : null}
        onBack={onHome} onLocate={() => setModal('location')}
        onSelect={item => { setMapExpanded(false); setSelected(atms.indexOf(item)); setRoute(false); setStep('atm') }} />
      <section className="flow-map-sheet">
        <header className="flow-map-sheet-header">
          <h2>Банкоматы</h2>
          {!mapExpanded && <button type="button" className="flow-map-sheet-back" aria-label="На главную" onClick={onHome}>
            <Art file="flow-back.svg" />
          </button>}
          {mapExpanded && <button type="button" className="flow-icon flow-map-sheet-close" aria-label="Свернуть список"
            onClick={event => event.currentTarget.closest('.flow-map-screen')?.scrollTo({
              top: 0,
              behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
            })}>×</button>}
          {route && <p className="flow-route-note" role="status">Маршрут до {atm.name} · {atm.distance}</p>}
          <div className="flow-chips flow-filters" role="group" aria-label="Фильтры">
            {filters.map(filter => <button type="button" key={filter} aria-pressed={activeFilters.includes(filter)}
              onClick={() => setActiveFilters(current => current.includes(filter) ? current.filter(item => item !== filter) : [...current, filter])}>{filter}</button>)}
          </div>
        </header>
        <div className="flow-atms">
          {visibleAtms.map(item => <button type="button" key={item.name} onClick={() => { setMapExpanded(false); setSelected(atms.indexOf(item)); setRoute(false); setStep('atm') }}>
            <span>{item.name}<small>{item.address}</small><small className={item.hours === 'Закрыто' ? 'flow-closed' : 'flow-open'}>{item.hours}</small></span>
            <small>{item.distance}</small>
          </button>)}
          {!visibleAtms.length && <p>По этим фильтрам банкоматов нет</p>}
        </div>
      </section>
    </main>}

    {step === 'atm' && <main className="flow-page flow-detail">
      <div className="flow-entrance"><Art file="atm-entrance.png" /><Back onClick={() => setStep('map')} /></div>
      <div className="flow-detail-content">
        <header>
          <h2>{atm.name}</h2>
          <p>{atm.distance.split(' · ')[0]} · <span className={atm.hours === 'Закрыто' ? 'flow-closed' : 'flow-open'}>{atm.hours.toLowerCase()}</span></p>
        </header>
        <div className="flow-chips">{atm.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
        <dl className="flow-detail-list">
          <dt>Где находится</dt><dd>{atm.address}</dd>
          <dt>Время работы</dt><dd className={atm.hours === 'Закрыто' ? 'flow-closed' : undefined}>{atm.hours}</dd>
          <dt>Сейчас в банкомате</dt><dd>Более $1 000 000</dd>
          <dt>Банкомат принимает</dt><dd>Песо, Доллары, Евро</dd>
        </dl>
        <button className="flow-secondary flow-route-button" type="button" onClick={() => {
          setActiveFilters([]); setRoute(true); setStep('map')
        }}>Проложить маршрут</button>
        {atm.tags.includes('QR-код') && <button className="flow-primary" type="button" onClick={() => withdrawal ? setStep('qr') : setStep('amount')}>Снять наличные по QR</button>}
      </div>
    </main>}

    {step === 'amount' && <main className="flow-page flow-padded flow-amount" inert={modal === 'help' || modal === 'accounts'}>
      <div className="flow-top"><Back onClick={() => setStep('atm')} /><button ref={helpTrigger} type="button" className="flow-icon" aria-label="Как снять наличные" onClick={() => setModal('help')}>?</button></div>
      <h1>Наличные по QR</h1>
      <button ref={accountTrigger} type="button" className="flow-account" onClick={() => setModal('accounts')} aria-label={'Выбрать счёт: ' + accounts[account].name}>
        <span className="flow-account-thumbnail">
          <Art file={account === 0 ? 'withdrawal-debit.png' : accounts[account].image} />
          {account === 0 && <Art className="flow-account-thumbnail-stroke" file="withdrawal-debit-stroke.svg" />}
        </span>
        <span className="flow-account-copy">{accounts[account].balance}<small>{accounts[account].name}</small></span>
        <Art className="flow-account-chevron" file="account-chevron.svg" />
      </button>
      <div className="flow-amount-field">
        <span aria-hidden="true">$</span><input aria-label="Сумма" value={amount} inputMode="none" placeholder="Сумма" onChange={event => updateAmount(event.target.value)} />
        <small className={value > maxAmount || (validAmount && fee) ? 'flow-fee' : validAmount ? 'flow-no-fee' : ''} aria-live="polite">
          {validAmount ? fee ? 'Комиссия ' + money(fee) : 'Без комиссии' : 'Максимум ' + money(maxAmount)}
        </small>
      </div>
      <div className="flow-chips">{[10, 100, 500, 1000].map(preset => <button type="button" key={preset} aria-pressed={value === preset} onClick={() => setAmount(String(preset))}>{preset}</button>)}</div>
      <button type="button" className="flow-primary flow-generate" disabled={!validAmount} onClick={() => {
        onChange({ amount: value, fee, expiresAt: Date.now() + 24 * 60 * 60 * 1000 })
        setRevealQr(true)
        setStep('qr')
      }}>Получить QR-код</button>
      <div className="flow-keypad" aria-label="Ввод суммы">
        {['1','2','3','4','5','6','7','8','9','','0','⌫'].map((key, index) => key
          ? <button type="button" key={key} aria-label={key === '⌫' ? 'Удалить цифру' : key} onClick={() => updateAmount(key === '⌫' ? amount.slice(0, -1) : amount + key)}>{key}</button>
          : <span key={index} />)}
      </div>
    </main>}

    {step === 'qr' && withdrawal && <main className="flow-page flow-padded flow-qr" inert={modal === 'help'}>
      <div className="flow-top"><Back onClick={onHome} /><button ref={helpTrigger} type="button" className="flow-icon" aria-label="Как снять наличные" onClick={() => setModal('help')}>?</button></div>
      <h1>Наличные по QR</h1>
      <WithdrawalCode reveal={revealQr} />
      <dl className="flow-qr-data">
        <dt>На сумму</dt><dd>{money(withdrawal.amount)}</dd>
        <dt>Действует до</dt><dd>{expires(withdrawal.expiresAt)}</dd>
        <dt>Комиссия</dt><dd>{money(withdrawal.fee)}</dd>
      </dl>
      <button className="flow-map-link" type="button" onClick={openMap}><Art file="withdrawal-map-link.png" />Банкоматы на карте<Art file="1-Ic16ChevronRight.svg" /></button>
      <p className="flow-warning"><Art file="withdrawal-warning.png" />Никому не передавайте код.</p>
      <div className="flow-qr-actions">
        <button type="button" className="flow-secondary flow-demo" onClick={() => { setPin(''); setPinError(false); setModal('push') }}>Демо: отсканировать QR в банкомате</button>
        <button type="button" className="flow-primary" onClick={onHome}>Перейти на главную</button>
        <button type="button" className="flow-secondary" onClick={finish}>Отменить действие QR-кода</button>
      </div>
    </main>}

    {modal === 'location' && <Overlay title="Доступ к местоположению" variant="flow-prompt flow-location-prompt" onClose={() => { setPermission('denied'); close() }}>
      <div className="flow-permission-copy">
        <h2>Разрешить приложению «Plata» доступ к&nbsp;местоположению?</h2>
        <p>Приложению необходим доступ к&nbsp;данным вашей геопозиции, чтобы&nbsp;найти вас&nbsp;на&nbsp;карте</p>
      </div>
      <div className="flow-permission-actions">
        <button type="button" onClick={() => { setPermission('denied'); close() }}>Не разрешать</button>
        <button type="button" onClick={() => { setPermission('allowed'); close() }}>Разрешить</button>
      </div>
    </Overlay>}
    {modal === 'accounts' && <div className="flow-help-layer">
      <section className="flow-help-sheet" role="dialog" aria-modal="true" aria-labelledby="withdrawal-accounts-title"
        onKeyDown={event => {
          if (event.key === 'Escape') closeAccounts()
          if (event.key !== 'Tab') return
          const buttons = event.currentTarget.querySelectorAll('button')
          const first = buttons[0]
          const last = buttons[buttons.length - 1]
          if (document.activeElement === (event.shiftKey ? first : last)) {
            event.preventDefault()
            if (event.shiftKey) last.focus()
            else first.focus()
          }
        }}>
        <h2 id="withdrawal-accounts-title">Выбрать счёт</h2>
        {accounts.map((item, index) => <button type="button" className="flow-account" key={item.name}
          ref={index === account ? button => button?.focus({ preventScroll: true }) : undefined}
          onClick={() => { setAccount(index); closeAccounts() }}>
          <Art file={item.image} /><span>{item.name}<small>{item.balance}</small></span><Art file="1-Ic16ChevronRight.svg" />
        </button>)}
        <button className="flow-secondary" type="button" onClick={closeAccounts}>Закрыть</button>
      </section>
    </div>}
    {modal === 'help' && <div className="flow-help-layer" data-closing={helpClosing || undefined}>
      <section className="flow-help-sheet" role="dialog" aria-modal="true" aria-labelledby="withdrawal-help-title"
        onAnimationEnd={event => {
          if (event.target === event.currentTarget && event.animationName === 'bottom-panel-exit') closeHelp()
        }}
        onKeyDown={event => {
          if (event.key === 'Tab') event.preventDefault()
          if (event.key === 'Escape') dismissHelp()
        }}>
        <h2 id="withdrawal-help-title">Как снять наличные</h2>
        <ol>
          <li>Создайте заявку на снятие наличных в приложении. QR-код действителен 24 часа.</li>
          <li>На банкомате нажмите «Снятие по QR».</li>
          <li>Подтвердите снятие через пуш-уведомление, введите код в банкомате и получите деньги.</li>
        </ol>
        <button type="button" className="flow-primary" ref={button => button?.focus({ preventScroll: true })} onClick={dismissHelp}>Понятно</button>
      </section>
    </div>}
    {modal === 'push' && withdrawal && <Overlay title="Демо-уведомление Plata" variant="flow-notification" onClose={close}>
      <button type="button" className="flow-notification-banner" aria-label="Подтвердить снятие"
        aria-describedby="withdrawal-notification-message" onClick={() => setModal('pin')}>
        <span className="flow-notification-icon">
          <Art file="plata-notification.png" /><Art file="plata-notification-logo.svg" />
        </span>
        <span className="flow-notification-copy">
          <span className="flow-notification-header"><strong>Plata</strong><time dateTime="09:41">9:41 AM</time></span>
          <span id="withdrawal-notification-message">Никому не говорите код {demoCode}! Вы снимаете {money(withdrawal.amount)}</span>
        </span>
      </button>
    </Overlay>}
    {modal === 'pin' && <Overlay title="Код подтверждения" variant="flow-prompt" onClose={close}>
      <form onSubmit={event => {
        event.preventDefault()
        if (pin === demoCode) setModal('processing')
        else setPinError(true)
      }}>
        <h2>Введите код в банкомате</h2><p>Введите четыре цифры из демо-уведомления Plata.</p>
        <input className="flow-pin-input" aria-label="Код из уведомления" autoFocus inputMode="numeric" maxLength={4} value={pin} onChange={event => { setPin(event.target.value.replace(/\D/g, '')); setPinError(false) }} />
        {pinError && <p className="flow-fee" role="alert">Неверный код. Проверьте уведомление.</p>}
        <button className="flow-primary" type="submit" disabled={pin.length !== 4}>Подтвердить код</button>
      </form>
    </Overlay>}
    {modal === 'processing' && withdrawal && <Overlay title="Операция выполняется" variant="flow-processing" onClose={finish}>
      <button type="button" className="flow-icon flow-dismiss" aria-label="Закрыть" onClick={finish}>×</button>
      <Art file="withdrawal-processing.png" />
      <h2>Операция выполняется<br />{money(withdrawal.amount)}</h2><p>Банкомат Plata считает деньги</p>
      <button className="flow-primary" type="button" onClick={finish}>Ок</button>
    </Overlay>}
  </div>
}
