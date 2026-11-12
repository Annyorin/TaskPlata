import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import { expires, money, WithdrawalFlow, type Withdrawal } from './WithdrawalFlow'

function Art({ file, className }: { file: string; className?: string }) {
  return <img className={className} src={`${import.meta.env.BASE_URL}figma/${file}`} alt="" />
}

function StatusBar() {
  return <div className="status" aria-hidden="true">
    <span>8:22</span>
    <div>{['CellularConnection', 'Wifi', 'Battery'].map(icon => <Art key={icon} file={`0-${icon}.svg`} />)}</div>
  </div>
}

function CardThumb({ credit = false, stack = false }: { credit?: boolean; stack?: boolean }) {
  return <span className={stack ? 'card-thumbs card-thumbs-stack' : 'card-thumbs'} role="img"
    aria-label={stack ? 'Три кредитные карты Mastercard' : credit ? 'Кредитная карта Mastercard' : 'Дебетовая карта Mastercard'}>
    {stack && [1, 2].map(index => <span className="card-thumb card-thumb-skin" key={index}><Art file="credit-card-skin.png" /></span>)}
    <span className={credit ? 'card-thumb card-thumb-credit' : 'card-thumb card-thumb-debit'}>
      <Art className="card-thumb-background" file={credit ? '0-Image541.png' : '0-DebitoBgPhysical1.png'} />
      <Art className="card-thumb-mark" file="mastercard-mark.svg" />
    </span>
  </span>
}

function Home({ withdrawal, onAtms, onQr }: { withdrawal: Withdrawal | null; onAtms: () => void; onQr: () => void }) {
  return <main className="content home" aria-label={withdrawal ? 'Home-End' : 'Home-Start'}>
    <header className="profile">
      <Art className="avatar" file="0-BaseViewCornerRadiusControl.png" />
      <div><strong>Santiago <Art file="0-LogoPlus.svg" /></strong><p>1 месяц с Плата</p></div>
      <span className="round profile-arrow"><Art file="0-IcStrokedChevronDown.svg" /></span>
    </header>
    <div className="home-grid">
      <section className="glass"><p>Кэшбек</p><h2 className="cashback">$467.18</h2><div className="perks">
        {['Percent', 'Child', 'Supermarkets', 'SportGoods'].map(icon => <Art key={icon} file={`0-IcStroked${icon}.svg`} />)}
      </div></section>
      <section className="glass"><p>Рассрочка</p><h2>12</h2><p className="muted perks">109 партнёры</p></section>
    </div>
    <section className="glass summary"><div><h2>Переводы</h2><p>$14,157 потрачено в Окт</p></div><span className="transfer-orb"><Art file="0-Gradients1.svg" /><Art className="orb-highlight" file="0-Highlight.svg" /></span></section>
    {withdrawal && <button type="button" className="panel summary cash-qr" onClick={onQr}>
      <Art className="cash-qr-art" file="cash-qr.png" />
      <div className="cash-qr-copy">
        <h2>QR-код для наличных</h2>
        <p>До {expires(withdrawal.expiresAt)}</p>
      </div>
      <div className="cash-qr-meta">
        <span>{money(withdrawal.amount)}</span>
        <CardThumb credit={withdrawal.fee > 0} />
      </div>
    </button>}
    <section className="panel summary"><div><h2>$5,289.39</h2><p>Доступно на кредитке</p></div><div className="card-meta"><small>Pay by Nov 4</small><CardThumb credit stack /></div></section>
    <section className="panel summary"><div><h2>$15,104.57</h2><p>Дебетовая карта</p></div><div className="card-meta earned"><small>$23.78 заработано</small><CardThumb /></div></section>
    <section className="invite summary"><div><h2>Get $300</h2><p>Invite a friend · <span>2 days left</span></p></div><Art file="0-Image.png" /></section>
    <button type="button" className="panel atm-card" onClick={onAtms}>
      <div>
        <h2>Банкоматы</h2>
        <p>Снятие и пополнение наличных</p>
      </div>
      <div className="atm-map"><Art file="atm-map.png" /></div>
    </button>
  </main>
}

const contacts = [
  ['Mamá BBVA', '1-Image2.png'], ['Esposa cariña', '1-Image3.png'],
  ['Ana', '1-Image4.png'], ['Santiago Pérez', '1-Image5.png'],
]
const services = [
  ['Mobile', 'Ic24Mobile'], ['Electricity', 'ElectricityCfe'], ['Water', 'Water'],
  ['Gas', 'Gas'], ['Internet', 'Internet'], ['TV', 'Monitor'], ['Toll', 'Toll'],
  ['Catalog', 'Supermarkets'],
]

function Tile({ label, file, logo = false }: { label: string; file: string; logo?: boolean }) {
  return <div className="tile"><span className={logo ? 'tile-icon logo' : 'tile-icon'}><Art file={file} /></span><span>{label}</span></div>
}

function PaymentGroup({ title, children, wide }: { title: string; children: ReactNode; wide?: boolean }) {
  return <section className="panel group"><header><h2>{title}</h2><Art file="1-Ic16ChevronRight.svg" /></header>
    <div className={wide ? 'tiles wide' : 'tiles'}>{children}</div>
  </section>
}

function Payments({ onTopUp }: { onTopUp: (button: HTMLButtonElement) => void }) {
  return <main className="content payments">
    <header className="payments-heading"><h1>Платежи</h1><span className="round search"><Art file="1-IcStrokedSearch.svg" /></span></header>
    <div className="actions">
      <button type="button" className="panel" onClick={event => onTopUp(event.currentTarget)}><Art file="1-Ic28ColoredTopup.svg" />Пополнить</button>
      <div className="panel"><Art file="1-Ic28ColoredSend.svg" />Перевести</div>
    </div>
    <PaymentGroup title="Переводы">{contacts.map(([label, file]) => <Tile key={label} label={label} file={file} logo />)}</PaymentGroup>
    <PaymentGroup title="Мои платежи"><Tile label="Televia прпрп" file="1-Image.png" logo /><Tile label="Add" file="2-IcStrokedPlusSmall.svg" /></PaymentGroup>
    <PaymentGroup title="Оплата счетов" wide>{services.map(([label, icon]) => <Tile key={label} label={label} file={`1-${icon}.svg`} />)}</PaymentGroup>
  </main>
}

const accounts = [
  ['Кредитная карта', '$14,905.65', '2-Container2.png'],
  ['Дебетовая карта', '$9,513.75', '2-Container.png'],
  ['Накопительный счёт', '$8,483.91', '2-Image.png'],
]

function Sheet({ onClose }: { onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    closeRef.current?.focus()
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', closeOnEscape)
    return () => document.removeEventListener('keydown', closeOnEscape)
  }, [onClose])

  return <div className="sheet-layer">
    <div className="scrim" aria-hidden="true" onClick={onClose} />
    <section className="sheet" role="dialog" aria-modal="true" aria-labelledby="sheet-title">
      <button ref={closeRef} className="sheet-dismiss" type="button" onClick={onClose}>Закрыть</button>
      <h2 id="sheet-title">Выбрать счёт</h2>
      <ul className="panel accounts">
        {accounts.map(([title, balance, file]) => <li key={title}>
          <span className="account-art"><Art file={file} />{file === '2-Container2.png' && <Art className="account-overlay" file="2-Container3.svg" />}</span>
          <span>{title}<small>{balance}</small></span><Art className="account-chevron" file="1-Ic16ChevronRight.svg" />
        </li>)}
      </ul>
    </section>
  </div>
}

type Screen = 'home' | 'pay'

function TabBar({ screen, onNavigate }: { screen: Screen; onNavigate: (screen: Screen) => void }) {
  return <nav className="tabbar" aria-label="Основная навигация">
    <div className="tabs">
      <button type="button" aria-current={screen === 'home' ? 'page' : undefined} onClick={() => onNavigate('home')}><Art file={`${screen === 'home' ? 0 : 1}-HomescreenStroke.svg`} />Home</button>
      <button type="button" aria-current={screen === 'pay' ? 'page' : undefined} onClick={() => onNavigate('pay')}><Art file={`${screen === 'pay' ? 1 : 0}-TransferStroke.svg`} />Pay</button>
      <span><Art file="0-InvestStroke.svg" />Invest</span>
      <span><b>$300</b>Invite</span>
    </div>
    <span className="round chat"><Art file="0-ChatStroke.svg" /></span>
  </nav>
}

export function App() {
  const [screen, setScreen] = useState<Screen>('home')
  const [cashEntry, setCashEntry] = useState<'map' | 'qr' | null>(null)
  const [withdrawal, setWithdrawal] = useState<Withdrawal | null>(null)
  const [sheetOpen, setSheetOpen] = useState(false)
  const topUpTrigger = useRef<HTMLButtonElement>(null)
  const closeSheet = useCallback(() => setSheetOpen(false), [])

  useEffect(() => {
    if (!sheetOpen) topUpTrigger.current?.focus()
  }, [sheetOpen])

  function navigate(nextScreen: Screen) {
    setCashEntry(null)
    setScreen(nextScreen)
  }

  return <div className="iphone-stage">
    <div className="iphone-mockup">
      <div className={`phone ${screen === 'home' && !cashEntry ? 'home-surface' : ''}`}>
        <div className={cashEntry ? 'screen screen-withdrawal' : 'screen'} inert={sheetOpen}>
          <StatusBar />
          {cashEntry
            ? <WithdrawalFlow entry={cashEntry} withdrawal={withdrawal}
                onChange={setWithdrawal} onHome={() => navigate('home')} />
            : <div className="scroll-area" key={screen}>
                {screen === 'home'
                  ? <Home withdrawal={withdrawal} onAtms={() => setCashEntry('map')} onQr={() => setCashEntry('qr')} />
                  : <Payments onTopUp={button => {
                      topUpTrigger.current = button
                      setSheetOpen(true)
                    }} />}
              </div>}
          {!cashEntry && <TabBar screen={screen} onNavigate={navigate} />}
        </div>
        {sheetOpen && <Sheet onClose={closeSheet} />}
        <div className="system-bottom-indicator" aria-hidden="true" />
      </div>
      <Art className="iphone-frame" file="iphone-frame.png" />
    </div>
  </div>
}
