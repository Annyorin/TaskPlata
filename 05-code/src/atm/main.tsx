import { useEffect, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { createRoot } from 'react-dom/client'
import './atm.css'

type Screen = 'home' | 'scan' | 'confirm' | 'code' | 'processing' | 'counting' | 'cash' | 'done' | 'returned'
type Locale = 'ru' | 'en' | 'es'

const demo = { amount: '$100', code: '1234', balance: '$2,450', pickupSeconds: 16, resendSeconds: 26 }
const labels = {
  ru: ['ENG', 'Support', 'Exit', 'Deposit', 'Withdraw', 'Имитировать сканирование QR', 'Вы хотите снять', 'Комиссию видно в приложении', 'Отменить', 'Снять', 'Check balance', 'Код', 'Очистить', 'Код неверный. Попробуйте ещё раз.', 'Отправить код ещё раз', 'через', 'Дождитесь завершения операции', 'Считаем деньги', 'Возьмите наличные', 'Деньги будут автоматически возвращены в банкомат через', 'сек', 'Забрать наличные', 'Вы забрали наличные', 'Наличные возвращены в банкомат', 'На главный экран', 'Пополнение недоступно в этом сценарии.', 'Для демонстрации используйте код 1234.', 'Закрыть', 'Демо-код', 'Отправить', 'Код отправлен повторно'],
  en: ['ESP', 'Support', 'Exit', 'Deposit', 'Withdraw', 'Simulate QR scan', 'You want to withdraw', 'See the fee in the app', 'Cancel', 'Withdraw', 'Check balance', 'Code', 'Clear', 'Incorrect code. Try again.', 'Resend code', 'in', 'Wait for the transaction to finish', 'Counting cash', 'Take your cash', 'Cash will be taken back in', 'sec', 'Take cash', 'Cash collected', 'Cash returned to the ATM', 'Back to home', 'Deposits are unavailable in this scenario.', 'Use code 1234 for this demo.', 'Close', 'Demo code', 'Submit', 'Code sent again'],
  es: ['RUS', 'Ayuda', 'Salir', 'Depositar', 'Retirar', 'Simular escaneo QR', 'Quieres retirar', 'Consulta la comisión en la app', 'Cancelar', 'Retirar', 'Consultar saldo', 'Código', 'Borrar', 'Código incorrecto. Inténtalo de nuevo.', 'Reenviar código', 'en', 'Espera a que termine la operación', 'Contando el efectivo', 'Retira tu efectivo', 'El cajero recuperará el efectivo en', 's', 'Tomar efectivo', 'Retiraste el efectivo', 'El cajero recuperó el efectivo', 'Volver al inicio', 'Los depósitos no están disponibles en este escenario.', 'Usa el código 1234 para esta demo.', 'Cerrar', 'Código de prueba', 'Enviar', 'Código reenviado'],
} as const

const asset = (file: string) => import.meta.env.BASE_URL + 'atm/' + file
const nextLocale: Record<Locale, Locale> = { ru: 'en', en: 'es', es: 'ru' }

function Atm() {
  const [screen, setScreen] = useState<Screen>('home')
  const [locale, setLocale] = useState<Locale>('en')
  const [code, setCode] = useState('')
  const [invalid, setInvalid] = useState(false)
  const [balance, setBalance] = useState(false)
  const [cashSeconds, setCashSeconds] = useState(demo.pickupSeconds)
  const [resendSeconds, setResendSeconds] = useState(demo.resendSeconds)
  const [resent, setResent] = useState(false)
  const [notice, setNotice] = useState<'deposit' | 'support' | null>(null)
  const input = useRef<HTMLInputElement>(null)
  const dialog = useRef<HTMLDialogElement>(null)
  const heading = useRef<HTMLDivElement>(null)

  const [language, support, exit, deposit, withdraw, scan, confirm, fee, cancel, proceed,
    checkBalance, codeLabel, clear, invalidCode, resend, inTime, processing, counting,
    take, returnText, seconds, collect, done, returned, home, noDeposit, help, close,
    demoCode, submit, sent] = labels[locale]
  const isWelcome = screen === 'home' || screen === 'scan'

  useEffect(() => { document.documentElement.lang = locale }, [locale])

  useEffect(() => {
    if (notice) dialog.current?.showModal()
    else dialog.current?.close()
  }, [notice])

  useEffect(() => {
    if (screen === 'code') input.current?.focus()
    else heading.current?.focus()
  }, [screen])

  useEffect(() => {
    if (screen !== 'processing' && screen !== 'counting') return
    const id = window.setTimeout(() => setScreen(screen === 'processing' ? 'counting' : 'cash'),
      screen === 'processing' ? 1800 : 2200)
    return () => window.clearTimeout(id)
  }, [screen])

  useEffect(() => {
    if (screen !== 'cash') return
    const deadline = Date.now() + demo.pickupSeconds * 1000
    const timer = window.setInterval(() => {
      const remaining = Math.max(0, Math.ceil((deadline - Date.now()) / 1000))
      setCashSeconds(remaining)
      if (remaining === 0) setScreen('returned')
    }, 100)
    return () => window.clearInterval(timer)
  }, [screen])

  useEffect(() => {
    if (screen !== 'code' || resendSeconds === 0) return
    const timer = window.setTimeout(() => setResendSeconds(resendSeconds - 1), 1000)
    return () => window.clearTimeout(timer)
  }, [screen, resendSeconds])

  function reset() {
    setScreen('home')
    setCode('')
    setInvalid(false)
    setBalance(false)
    setCashSeconds(demo.pickupSeconds)
    setResendSeconds(demo.resendSeconds)
    setResent(false)
  }

  function verify(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (code === demo.code) setScreen('processing')
    else {
      setInvalid(true)
      input.current?.select()
    }
  }

  return (
    <main className="atm" data-screen={screen} aria-label="Plata ATM">
      <img className={isWelcome ? 'welcome-art' : 'glow'} src={asset(isWelcome ? 'home.png' : 'glow.svg')} alt="" />
      {!isWelcome && <img className="banner" src={asset('banner.png')} alt="" />}
      <div className="atm-tools">
        <button onClick={() => setLocale(nextLocale[locale])}>{language}</button>
        <button onClick={() => setNotice('support')}>{support}</button>
        {screen !== 'home' && <button className="accent exit" onClick={reset}>
          <img src={asset('exit.svg')} alt="" />{exit}
        </button>}
      </div>
      <div className="atm-screen" key={screen} ref={heading} tabIndex={-1}>
        {screen === 'home' && <>
          <img className="tap" src={asset('tap.png')} alt="" />
          <div className="main-actions">
            <button onClick={() => setNotice('deposit')}><img src={asset('deposit.svg')} alt="" />{deposit}</button>
            <button onClick={() => setScreen('scan')}><img src={asset('withdraw.svg')} alt="" />{withdraw}</button>
          </div>
        </>}
        {screen === 'scan' && <button className="scanner" onClick={() => setScreen('confirm')}>
          <img src={asset('scan.png')} alt="" /><span>{scan}</span>
        </button>}
        {screen === 'confirm' && <>
          <div className="message"><h1>{confirm} {demo.amount}</h1><p>{fee}</p></div>
          <div className="confirm-actions">
            <button onClick={reset}>{cancel}</button>
            <button className="accent" onClick={() => setScreen('code')}>{proceed} {demo.amount}</button>
          </div>
        </>}
        {screen === 'code' && <>
          <img className="card" src={asset('card.png')} alt="Mastercard •••• 6994" />
          <button className="balance" aria-pressed={balance} onClick={() => setBalance(!balance)}>
            <img src={asset('eye.svg')} alt="" />{balance ? demo.balance : checkBalance}
          </button>
          <form className="code-form" onSubmit={verify}>
            <div className="code-entry">
              <input ref={input} aria-label={codeLabel} aria-invalid={invalid}
                inputMode="numeric" autoComplete="off" value={code} placeholder={codeLabel}
                onChange={event => { setCode(event.target.value.replace(/\D/g, '').slice(0, 4)); setInvalid(false) }} />
              <button type="button" onClick={() => { setCode(''); setInvalid(false); input.current?.focus() }}>{clear}</button>
            </div>
            <div className="code-help">
              {resendSeconds > 0 ? <span>{resend} {inTime} {resendSeconds} {seconds}</span>
                : <button type="button" onClick={() => { setResendSeconds(demo.resendSeconds); setResent(true) }}>{resend}</button>}
              {invalid && <span role="alert" className="code-error">{invalidCode}</span>}
              {resent && <span role="status">{sent}</span>}
            </div>
            <div className="demo-actions">
              <button type="button" onClick={() => { setCode(demo.code); setInvalid(false); input.current?.focus() }}>{demoCode} {demo.code}</button>
              <button className="accent" disabled={code.length !== 4}>{submit}</button>
            </div>
          </form>
        </>}
        {screen === 'processing' && <div className="message" role="status"><h1>{processing}</h1></div>}
        {screen === 'counting' && <div className="message" role="status"><h1>{counting}</h1></div>}
        {screen === 'cash' && <>
          <div className="message"><h1>{take}</h1><p>{returnText} <strong>{cashSeconds}</strong> {seconds}</p>
            <progress aria-label={returnText} max={demo.pickupSeconds} value={cashSeconds} />
          </div>
          <div className="confirm-actions"><button className="accent" onClick={() => setScreen('done')}>{collect}</button></div>
        </>}
        {(screen === 'done' || screen === 'returned') && <>
          <div className="message"><h1>{screen === 'done' ? done : returned}</h1></div>
          <div className="confirm-actions"><button className="accent" onClick={reset}>{home}</button></div>
        </>}
      </div>
      <dialog ref={dialog} onClose={() => setNotice(null)} aria-labelledby="atm-dialog-title">
        <h2 id="atm-dialog-title">{notice === 'deposit' ? deposit : support}</h2>
        <p>{notice === 'deposit' ? noDeposit : help}</p>
        <button className="accent" onClick={() => setNotice(null)}>{close}</button>
      </dialog>
    </main>
  )
}

createRoot(document.getElementById('root')!).render(<Atm />)
