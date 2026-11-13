import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from 'react'

type Pin = { name: string; x: number; y: number }
const tiles = [-2, -1, 0, 1, 2]
const initialCamera = { x: 0, y: 0, zoom: 1 }
const origin = { x: 53, y: 47 }

function cluster<T extends Pin>(pins: T[], width: number, height: number, zoom: number) {
  const groups: T[][] = []
  for (const pin of pins) {
    const neighbors = groups.filter(group => group.some(other =>
      Math.hypot((pin.x - other.x) * width, (pin.y - other.y) * height) * zoom / 100 < 88))
    groups.push([pin, ...neighbors.flat()])
    for (const group of neighbors) groups.splice(groups.indexOf(group), 1)
  }
  return groups
}

function Icon({ file }: { file: string }) {
  return <img src={import.meta.env.BASE_URL + 'figma/' + file} alt="" draggable={false} />
}

export function AtmMap<T extends Pin>({ pins, location, route, onSelect, onLocate, onBack }: {
  pins: T[]; location: boolean; route: T | null; onSelect: (pin: T) => void; onLocate: () => void; onBack: () => void
}) {
  const [camera, setCamera] = useState(() => {
    const routeOutsideInitialView = route && (route.x < 0 || route.x > 100 || route.y < 0 || route.y > 100)
    return routeOutsideInitialView ? { ...initialCamera, zoom: .55 } : initialCamera
  })
  const [size, setSize] = useState({ width: 402, height: 350 })
  const map = useRef<HTMLDivElement>(null)
  const drag = useRef<{ id: number; x: number; y: number; offsetX: number; offsetY: number } | null>(null)
  const dragged = useRef(false)
  const groups = cluster(pins, size.width, size.height, camera.zoom)

  function zoomBy(delta: number) {
    setCamera(current => ({ ...current, zoom: Math.max(.55, Math.min(2.4, current.zoom + delta)) }))
  }

  useEffect(() => {
    const element = map.current
    if (!element) return
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect
      setSize({ width, height })
    })
    observer.observe(element)
    const wheel = (event: WheelEvent) => {
      event.preventDefault()
      if (event.deltaY) zoomBy(event.deltaY < 0 ? .15 : -.15)
    }
    element.addEventListener('wheel', wheel, { passive: false })
    return () => {
      observer.disconnect()
      element.removeEventListener('wheel', wheel)
    }
  }, [])

  function move(event: PointerEvent<HTMLDivElement>) {
    const start = drag.current
    if (!start || start.id !== event.pointerId) return
    const dx = event.clientX - start.x
    const dy = event.clientY - start.y
    if (!dragged.current && Math.hypot(dx, dy) < 5) return
    if (!dragged.current) event.currentTarget.setPointerCapture(event.pointerId)
    dragged.current = true
    setCamera(current => ({
      ...current,
      x: Math.max(-size.width * .8, Math.min(size.width * .8, start.offsetX + dx)),
      y: Math.max(-size.height * .8, Math.min(size.height * .8, start.offsetY + dy)),
    }))
  }

  return <div ref={map} className="flow-map">
    <div className="flow-map-gesture" onPointerDown={event => {
      if (event.button !== 0 || !event.isPrimary) return
      dragged.current = false
      drag.current = { id: event.pointerId, x: event.clientX, y: event.clientY, offsetX: camera.x, offsetY: camera.y }
    }} onPointerMove={move}
    onPointerUp={() => { drag.current = null }}
    onPointerCancel={() => { drag.current = null }}
    onPointerLeave={() => { if (!dragged.current) drag.current = null }}
    onClickCapture={event => {
      if (!dragged.current || event.detail === 0) return
      dragged.current = false
      event.stopPropagation()
    }}>
      <div className="flow-map-scene" style={{ transform: 'translate(' + camera.x + 'px, ' + camera.y + 'px) scale(' + camera.zoom + ')',
        '--pin-scale': 1 / camera.zoom } as CSSProperties}>
        <div className="flow-map-tiles" aria-hidden="true">
          {tiles.flatMap(y => tiles.map(x => <img key={x + ':' + y} className="flow-map-bg"
            style={{ scale: (Math.abs(x) % 2 ? -1 : 1) + ' ' + (Math.abs(y) % 2 ? -1 : 1) }}
            src={import.meta.env.BASE_URL + 'figma/atm-street.png'} alt="" draggable={false} />))}
        </div>
        {location && <span className="flow-you" role="img" aria-label="My location" />}
        {route && <span className="flow-route-line" style={{
          '--route-x': route.x + '%', '--route-y': route.y + '%',
          '--route-width': Math.abs(origin.x - route.x) + '%', '--route-height': Math.abs(origin.y - route.y) + '%',
        } as CSSProperties} />}
        {groups.map(group => {
          const [pin] = group
          if (group.length === 1) return <button className="flow-pin" type="button" key={pin.name}
            style={{ left: pin.x + '%', top: pin.y + '%' }} aria-label={pin.name} onClick={() => onSelect(pin)}>
            <Icon file="atm-pin-bg.png" /><Icon file="atm-pin-logo.svg" />
          </button>

          const x = group.reduce((sum, item) => sum + item.x, 0) / group.length
          const y = group.reduce((sum, item) => sum + item.y, 0) / group.length
          return <button className="flow-pin flow-cluster" type="button" key={group.map(item => item.name).join(':')}
            style={{ left: x + '%', top: y + '%' }} aria-label={'ATMs: ' + group.length + '. Zoom in'}
            onClick={() => zoomBy(.45)}>{group.length}</button>
        })}
      </div>
    </div>
    <div className="flow-map-back"><button className="flow-icon" type="button" aria-label="Back" onClick={onBack}><Icon file="flow-back.svg" /></button></div>
    <div className="flow-map-controls">
      <button className="flow-icon" type="button" aria-label="Zoom in" onClick={() => zoomBy(.25)}><Icon file="map-plus.svg" /></button>
      <button className="flow-icon" type="button" aria-label="Zoom out" onClick={() => zoomBy(-.25)}><Icon file="map-minus.svg" /></button>
      <button className="flow-icon" type="button" aria-label="My location" onClick={() => {
        if (location) setCamera(initialCamera)
        else onLocate()
      }}><Icon file="map-location.svg" /></button>
    </div>
  </div>
}
