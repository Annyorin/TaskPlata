import { useEffect, useRef, useState, type ReactNode } from 'react'
import './styles/withdrawal.css'
import { AtmMap } from './AtmMap'
import withdrawalQr from './withdrawal-qr.svg?raw'

export type Withdrawal = { amount: number; fee: number; expiresAt: number }
export const money = (amount: number) => '$' + amount.toLocaleString('en-US')
export const expires = (timestamp: number) => new Intl.DateTimeFormat('en-US', {
  day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit',
}).format(timestamp)

const atms = [
  { name: 'Chedraui Polanco', address: 'Av. Ejército Nacional 843, Granada, Ciudad de México', distance: '12 min · 800 m', hours: 'Open until 11 PM', x: 28, y: 30, tags: ['Open', 'QR code', 'Withdraw cash'] },
  { name: 'Torre Mayor', address: 'Paseo de la Reforma 505', distance: '15 min · 1 km', hours: 'Open 24 hours', x: 61, y: 20, tags: ['Open', 'Open 24 hours', 'QR code', 'Withdraw cash'] },
  { name: 'Río Lerma', address: 'Río Lerma 232', distance: '18 min · 1.2 km', hours: 'Open until 10 PM', x: 21, y: 66, tags: ['Open', 'Withdraw cash'] },
  { name: 'Río Atoyac', address: 'Río Atoyac 89', distance: '20 min · 1.4 km', hours: 'Closed', x: 77, y: 60, tags: ['QR code', 'Withdraw cash'] },
  { name: 'Parque Lincoln', address: 'Emilio Castelar 163', distance: '24 min · 1.7 km', hours: 'Open until 9 PM', x: -19, y: 54, tags: ['Open', 'QR code', 'Withdraw cash'] },
  { name: 'Río San Joaquín', address: 'Av. Río San Joaquín 415', distance: '27 min · 1.9 km', hours: 'Open 24 hours', x: 42, y: -20, tags: ['Open', 'Open 24 hours', 'QR code', 'Withdraw cash'] },
  { name: 'Circuito Interior', address: 'Circuito Interior 242', distance: '28 min · 2 km', hours: 'Open until 10 PM', x: 120, y: 25, tags: ['Open', 'Withdraw cash'] },
  { name: 'Museo Tamayo', address: 'Paseo de la Reforma 51', distance: '31 min · 2.2 km', hours: 'Open until 8 PM', x: 52, y: 121, tags: ['Open', 'QR code', 'Withdraw cash'] },
  { name: 'Chapultepec', address: 'Av. Chapultepec 560', distance: '34 min · 2.4 km', hours: 'Open 24 hours', x: 112, y: 112, tags: ['Open', 'Open 24 hours', 'QR code', 'Withdraw cash'] },
]
const filters = ['Open', 'Open 24 hours', 'QR code', 'Withdraw cash']
const accounts = [
  { name: 'Debit card', balance: '$16,307', image: '2-Container.png', fee: 0 },
  { name: 'Credit card', balance: '$15,104.57', image: '2-Container2.png', fee: 10 },
  { name: 'Savings account', balance: '$8,483.91', image: '2-Image.png', fee: 0 },
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
    aria-label="Replay QR code animation"
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
      if (!start && event.pointerType === 'mouse' && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
        const card = event.currentTarget
        const bounds = card.getBoundingClientRect()
        const angle = (fraction: number) => Math.max(-8, Math.min(8, fraction * 16)) + 'deg'
        card.style.setProperty('--qr-tilt-x', angle(.5 - (event.clientY - bounds.top) / bounds.height))
        card.style.setProperty('--qr-tilt-y', angle((event.clientX - bounds.left) / bounds.width - .5))
        return
      }
      if (!start || start.id !== event.pointerId) return
      if (Math.hypot(event.clientX - start.x, event.clientY - start.y) > 5) dragged.current = true
      if (!dragged.current) return
      const tilt = (distance: number) => Math.max(-8, Math.min(8, distance / 9)) + 'deg'
      event.currentTarget.style.setProperty('--qr-tilt-x', tilt(start.y - event.clientY))
      event.currentTarget.style.setProperty('--qr-tilt-y', tilt(event.clientX - start.x))
    }}
    onPointerLeave={event => {
      if (gesture.current) return
      event.currentTarget.style.removeProperty('--qr-tilt-x')
      event.currentTarget.style.removeProperty('--qr-tilt-y')
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
  return <button type="button" className="flow-icon" aria-label="Back" onClick={onClick}><Art file="flow-back.svg" /></button>
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
  const [activeFilters, setActiveFilters] = useState<string[]>(['Open'])
  const [route, setRoute] = useState(false)
  const [revealQr, setRevealQr] = useState(false)
  const [showDemoHint, setShowDemoHint] = useState(false)

  useEffect(() => {
    if (!showDemoHint) return
    const timeout = window.setTimeout(() => setShowDemoHint(false), 2300)
    return () => window.clearTimeout(timeout)
  }, [showDemoHint])
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
        <p className="flow-map-loading-status" role="status">Loading map</p>
      </div>
      <div className="flow-map-back"><Back onClick={onHome} /></div>
    </main>}
    {step === 'map' && <main className="flow-map-screen" aria-label="ATM map"
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
          <button className="flow-map-grabber" type="button" aria-expanded={mapExpanded}
            aria-label={mapExpanded ? 'Collapse list' : 'Expand list'}
            onClick={event => {
              const screen = event.currentTarget.closest('.flow-map-screen')
              const sheet = event.currentTarget.closest<HTMLElement>('.flow-map-sheet')
              if (!screen || !sheet) return
              const peek = parseFloat(getComputedStyle(screen).getPropertyValue('--expanded-map-peek'))
              screen.scrollTo({ top: mapExpanded ? 0 : sheet.offsetTop - peek, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' })
            }} />
          <h2>ATMs</h2>
          {!mapExpanded && <button type="button" className="flow-map-sheet-back" aria-label="Home" onClick={onHome}>
            <Art file="flow-back.svg" />
          </button>}
          {mapExpanded && <button type="button" className="flow-icon flow-map-sheet-close" aria-label="Collapse list"
            onClick={event => event.currentTarget.closest('.flow-map-screen')?.scrollTo({
              top: 0,
              behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
            })}>×</button>}
          {route && <p className="flow-route-note" role="status">Route to {atm.name} · {atm.distance}</p>}
          <div className="flow-chips flow-filters" role="group" aria-label="Filters">
            {filters.map(filter => <button type="button" key={filter} aria-pressed={activeFilters.includes(filter)}
              onClick={() => setActiveFilters(current => current.includes(filter) ? current.filter(item => item !== filter) : [...current, filter])}>{filter}</button>)}
          </div>
        </header>
        <div className="flow-atms">
          {visibleAtms.map(item => <button type="button" key={item.name} onClick={() => { setMapExpanded(false); setSelected(atms.indexOf(item)); setRoute(false); setStep('atm') }}>
            <span>{item.name}<small>{item.address}</small><small className={item.hours === 'Closed' ? 'flow-closed' : 'flow-open'}>{item.hours}</small></span>
            <small>{item.distance}</small>
          </button>)}
          {!visibleAtms.length && <p>No ATMs match these filters</p>}
        </div>
      </section>
    </main>}

    {step === 'atm' && <main className="flow-page flow-detail">
      <div className="flow-entrance"><Art file="atm-entrance.png" /><Back onClick={() => setStep('map')} /></div>
      <div className="flow-detail-content">
        <header>
          <h2>{atm.name}</h2>
          <p>{atm.distance.split(' · ')[0]} · <span className={atm.hours === 'Closed' ? 'flow-closed' : 'flow-open'}>{atm.hours}</span></p>
        </header>
        <div className="flow-chips">{atm.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
        <dl className="flow-detail-list">
          <dt>Address</dt><dd>{atm.address}</dd>
          <dt>Hours</dt><dd className={atm.hours === 'Closed' ? 'flow-closed' : undefined}>{atm.hours}</dd>
          <dt>Cash available</dt><dd>Over $1,000,000</dd>
          <dt>Accepted currencies</dt><dd>Pesos, US dollars, euros</dd>
        </dl>
        <button className="flow-secondary flow-route-button" type="button" onClick={() => {
          setActiveFilters([]); setRoute(true); setStep('map')
        }}>Get directions</button>
        {atm.tags.includes('QR code') && <button className="flow-primary" type="button" onClick={() => withdrawal ? setStep('qr') : setStep('amount')}>Withdraw with QR</button>}
      </div>
    </main>}

    {step === 'amount' && <main className="flow-page flow-padded flow-amount" inert={modal === 'help' || modal === 'accounts'}>
      <div className="flow-top"><Back onClick={() => setStep('atm')} /><button ref={helpTrigger} type="button" className="flow-icon" aria-label="How to withdraw cash" onClick={() => setModal('help')}>?</button></div>
      <h1>Withdraw with QR</h1>
      <button ref={accountTrigger} type="button" className="flow-account" onClick={() => setModal('accounts')} aria-label={'Select account: ' + accounts[account].name}>
        <span className="flow-account-thumbnail">
          <Art file={account === 0 ? 'withdrawal-debit.png' : accounts[account].image} />
          {account === 0 && <Art className="flow-account-thumbnail-stroke" file="withdrawal-debit-stroke.svg" />}
        </span>
        <span className="flow-account-copy">{accounts[account].balance}<small>{accounts[account].name}</small></span>
        <Art className="flow-account-chevron" file="account-chevron.svg" />
      </button>
      <div className="flow-amount-field">
        <span aria-hidden="true">$</span><input aria-label="Amount" value={amount} inputMode="none" placeholder="Amount" onChange={event => updateAmount(event.target.value)} />
        {validAmount
          ? <small className={fee ? 'flow-fee' : 'flow-no-fee'} aria-live="polite">{fee ? 'Commission ' + money(fee) : 'No commission'}</small>
          : <button type="button" className="flow-amount-max" onClick={() => setAmount(String(maxAmount))}>Maximum {money(maxAmount)}</button>}
      </div>
      <div className="flow-chips">{[10, 100, 500, 1000].map(preset => <button type="button" key={preset} aria-pressed={value === preset} onClick={() => setAmount(String(preset))}>{preset}</button>)}</div>
      <button type="button" className="flow-primary flow-generate" disabled={!validAmount} onClick={() => {
        onChange({ amount: value, fee, expiresAt: Date.now() + 24 * 60 * 60 * 1000 })
        setRevealQr(true)
        setShowDemoHint(true)
        setStep('qr')
      }}>Generate QR code</button>
      <div className="flow-keypad" aria-label="Amount keypad">
        {['1','2','3','4','5','6','7','8','9','','0','⌫'].map((key, index) => key
          ? <button type="button" key={key} aria-label={key === '⌫' ? 'Delete digit' : key} onClick={() => updateAmount(key === '⌫' ? amount.slice(0, -1) : amount + key)}>{key}</button>
          : <span key={index} />)}
      </div>
    </main>}

    {step === 'qr' && withdrawal && <main className="flow-page flow-padded flow-qr" inert={modal === 'help'}>
      <div className="flow-top"><Back onClick={onHome} /><button ref={helpTrigger} type="button" className="flow-icon" aria-label="How to withdraw cash" onClick={() => setModal('help')}>?</button></div>
      <h1>Withdraw with QR</h1>
      <WithdrawalCode reveal={revealQr} />
      <dl className="flow-qr-data">
        <dt>Amount</dt><dd>{money(withdrawal.amount)}</dd>
        <dt>Expires</dt><dd>{expires(withdrawal.expiresAt)}</dd>
        <dt>Commission</dt><dd>{money(withdrawal.fee)}</dd>
      </dl>
      <button className="flow-map-link" type="button" onClick={openMap}><Art file="withdrawal-map-link.png" />Find ATMs<Art file="1-Ic16ChevronRight.svg" /></button>
      <p className="flow-warning"><span><Art file="withdrawal-notice.svg" /></span>Never share this code.</p>
      <div className="flow-qr-actions">
        <div className="flow-demo-anchor">
          {showDemoHint && <span className="flow-demo-hint" role="status">Demo notification</span>}
          <button type="button" className="flow-secondary flow-demo" onClick={() => {
            setShowDemoHint(false)
            setPin('')
            setPinError(false)
            setModal('push')
          }}>Demo: Scan QR at the ATM</button>
        </div>
        <button type="button" className="flow-primary" onClick={onHome}>Back to Home</button>
        <button type="button" className="flow-secondary" onClick={finish}>Cancel QR code</button>
      </div>
    </main>}

    {modal === 'location' && <Overlay title="Location access" variant="flow-prompt flow-location-prompt" onClose={() => { setPermission('denied'); close() }}>
      <div className="flow-permission-copy">
        <h2>Allow Plata to access your location?</h2>
        <p>Plata uses your location to show where you are on the map.</p>
      </div>
      <div className="flow-permission-actions">
        <button type="button" onClick={() => { setPermission('denied'); close() }}>Do Not Allow</button>
        <button type="button" onClick={() => {
          setPermission('allowed')
          close()
        }}>Allow</button>
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
        <h2 id="withdrawal-accounts-title">Select account</h2>
        {accounts.map((item, index) => <button type="button" className="flow-account" key={item.name}
          ref={index === account ? button => button?.focus({ preventScroll: true }) : undefined}
          onClick={() => { setAccount(index); closeAccounts() }}>
          <Art file={item.image} /><span>{item.name}<small>{item.balance}</small></span><Art file="1-Ic16ChevronRight.svg" />
        </button>)}
        <button className="flow-primary" type="button" onClick={closeAccounts}>Close</button>
      </section>
    </div>}
    {modal === 'help' && <div className="flow-help-layer" data-closing={helpClosing || undefined}>
      <section className="flow-help-sheet flow-instructions" role="dialog" aria-modal="true" aria-labelledby="withdrawal-help-title"
        onAnimationEnd={event => {
          if (event.target === event.currentTarget && event.animationName === 'bottom-panel-exit') closeHelp()
        }}
        onKeyDown={event => {
          if (event.key === 'Tab') event.preventDefault()
          if (event.key === 'Escape') dismissHelp()
        }}>
        <h2 id="withdrawal-help-title">How to withdraw cash</h2>
        <ol>
          <li>Create a cash withdrawal request in the app. Your QR code is valid for 24 hours.</li>
          <li>Select “Withdraw with QR” at the ATM.</li>
          <li>Confirm the withdrawal from the notification, enter the code at the ATM, then take your cash.</li>
        </ol>
        <button type="button" className="flow-primary" ref={button => button?.focus({ preventScroll: true })} onClick={dismissHelp}>Got it</button>
      </section>
    </div>}
    {modal === 'push' && withdrawal && <Overlay title="Plata demo notification" variant="flow-notification" onClose={close}>
      <button type="button" className="flow-notification-banner" aria-label="Confirm withdrawal"
        aria-describedby="withdrawal-notification-message" onClick={() => setModal('pin')}>
        <span className="flow-notification-icon">
          <Art file="plata-notification.png" /><Art file="plata-notification-logo.svg" />
        </span>
        <span className="flow-notification-copy">
          <span className="flow-notification-header"><strong>Plata</strong><time dateTime="09:41">9:41 AM</time></span>
          <span id="withdrawal-notification-message">Never share code {demoCode}. Withdrawal amount: {money(withdrawal.amount)}</span>
        </span>
      </button>
    </Overlay>}
    {modal === 'pin' && <Overlay title="Confirmation code" variant="flow-prompt" onClose={close}>
      <form onSubmit={event => {
        event.preventDefault()
        if (pin === demoCode) setModal('processing')
        else setPinError(true)
      }}>
        <h2>Enter the code at the ATM</h2><p>Enter the four digits from the Plata demo notification.</p>
        <input className="flow-pin-input" aria-label="Code from notification" autoFocus inputMode="numeric" maxLength={4} value={pin} onChange={event => { setPin(event.target.value.replace(/\D/g, '')); setPinError(false) }} />
        {pinError && <p className="flow-fee" role="alert">Incorrect code. Check the notification.</p>}
        <button className="flow-primary" type="submit" disabled={pin.length !== 4}>Confirm code</button>
      </form>
    </Overlay>}
    {modal === 'processing' && withdrawal && <Overlay title="Withdrawal in progress" variant="flow-processing" onClose={finish}>
      <button type="button" className="flow-icon flow-dismiss" aria-label="Close" onClick={finish}>×</button>
      <Art file="withdrawal-processing.png" />
      <h2>Withdrawal in progress<br />{money(withdrawal.amount)}</h2><p>The Plata ATM is counting your cash</p>
      <button className="flow-primary" type="button" onClick={finish}>OK</button>
    </Overlay>}
  </div>
}
