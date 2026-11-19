import { useCallback, useEffect, useMemo, useState } from 'react'
import type { CSSProperties } from 'react'
import { config } from './config'
import { days, type AdventDay } from './data/days'
import { getRevealedDay, readPreviewParam } from './lib/date'

type TileState = 'locked' | 'ready' | 'open'

const preview = readPreviewParam()

function storageKey(): string {
  return `adviento-losseish:abiertos${preview === null ? '' : ':preview'}`
}

function readOpened(): Set<number> {
  try {
    const raw = window.localStorage.getItem(storageKey())
    if (!raw) return new Set<number>()
    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) return new Set<number>()
    return new Set(
      parsed.filter((n): n is number => typeof n === 'number' && n >= 1 && n <= 24),
    )
  } catch {
    return new Set<number>()
  }
}

export default function App() {
  const revealedDay = useMemo(() => getRevealedDay(preview), [])
  const [opened, setOpened] = useState<Set<number>>(readOpened)
  const [hintDay, setHintDay] = useState<number | null>(null)

  useEffect(() => {
    try {
      window.localStorage.setItem(storageKey(), JSON.stringify([...opened]))
    } catch {
      // El almacenamiento puede estar desactivado; no es crítico.
    }
  }, [opened])

  useEffect(() => {
    if (hintDay === null) return
    const timeout = window.setTimeout(() => setHintDay(null), 1800)
    return () => window.clearTimeout(timeout)
  }, [hintDay])

  const handleOpen = useCallback((day: number) => {
    setOpened((previous) => new Set(previous).add(day))
  }, [])

  const handleLocked = useCallback((day: number) => setHintDay(day), [])
  const handleReset = useCallback(() => setOpened(new Set<number>()), [])

  const status =
    preview !== null
      ? preview === 24
        ? '🔧 Modo prueba · todos los días abiertos'
        : preview === 0
          ? '🔧 Modo prueba · todo cerrado'
          : `🔧 Modo prueba · hasta el día ${preview}`
      : revealedDay === 0
        ? 'Nos vemos el 1 de diciembre ✨'
        : revealedDay === 24
          ? '¡Ya están todos los días! Feliz Navidad 🎄'
          : `Hoy puedes descubrir el día ${revealedDay} 🎁`

  const openedCount = days.filter((item) => opened.has(item.day)).length

  return (
    <div className="app">
      <div className="snow" aria-hidden="true">
        {Array.from({ length: 28 }, (_, index) => (
          <span key={index} style={{ '--i': index } as CSSProperties} />
        ))}
      </div>

      <header className="hero">
        <div className="hero__garland" aria-hidden="true">
          {Array.from({ length: 17 }, (_, index) => (
            <i key={index} style={{ '--bulb': index } as CSSProperties} />
          ))}
        </div>
        <span className="hero__star" aria-hidden="true">✦</span>
        <h1>{config.title}</h1>
        <p className="hero__subtitle">{config.subtitle}</p>
        <p className="hero__status">{status}</p>
        <p className="hero__progress" aria-label={`${openedCount} de 24 días abiertos`}>
          {openedCount} / 24 días descubiertos
        </p>
      </header>

      <main className="calendar-wrapper">
        <div className="calendar">
          {days.map((item) => {
            const state: TileState = opened.has(item.day)
              ? 'open'
              : item.day <= revealedDay
                ? 'ready'
                : 'locked'

            return (
              <DayTile
                key={item.day}
                data={item}
                state={state}
                showHint={hintDay === item.day}
                onOpen={handleOpen}
                onLocked={handleLocked}
              />
            )
          })}
        </div>
      </main>

      <footer className="footer">
        <p>{config.footer} <span aria-hidden="true">✦</span></p>
        <div className="footer__tools">
          {preview === null ? (
            <a href="?preview=24">Ver todos los días (modo prueba)</a>
          ) : (
            <>
              <a href={window.location.pathname}>Salir del modo prueba</a>
              <button type="button" onClick={handleReset}>Reiniciar días abiertos</button>
            </>
          )}
        </div>
      </footer>
    </div>
  )
}

interface DayTileProps {
  data: AdventDay
  state: TileState
  showHint: boolean
  onOpen: (day: number) => void
  onLocked: (day: number) => void
}

function DayTile({ data, state, showHint, onOpen, onLocked }: DayTileProps) {
  const isOpen = state === 'open'
  const label =
    state === 'locked'
      ? `Día ${data.day}: disponible el ${data.day} de diciembre`
      : isOpen
        ? `Día ${data.day} abierto: ${data.phrase}`
        : `Abrir día ${data.day}`

  const classes = [
    'tile',
    data.featured ? 'tile--featured' : '',
    state === 'locked' ? 'tile--locked' : '',
    state === 'ready' ? 'tile--ready' : '',
    isOpen ? 'tile--open' : '',
    showHint ? 'tile--hint' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button
      type="button"
      className={classes}
      style={{ '--area': data.area } as CSSProperties}
      aria-label={label}
      onClick={() => (state === 'locked' ? onLocked(data.day) : onOpen(data.day))}
    >
      <span className="tile__door" aria-hidden="true">
        <span className="tile__ribbon tile__ribbon--v" />
        <span className="tile__ribbon tile__ribbon--h" />
        <span className="tile__number">{String(data.day).padStart(2, '0')}</span>
        <span className="tile__flake">❄</span>
        <span className="tile__day-label">DÍA {data.day}</span>
        {state === 'ready' && <span className="tile__open-label">Toca para abrir</span>}
      </span>

      <span className="tile__reveal">
        <DayPhoto day={data.day} />
        <span className="tile__caption">
          <span className="tile__caption-day">DÍA {data.day}</span>
          <span className="tile__phrase">{data.phrase}</span>
        </span>
      </span>

      {showHint && <span className="tile__hint">¡Aún no! Vuelve el día {data.day}</span>}
    </button>
  )
}

function DayPhoto({ day }: { day: number }) {
  const [failed, setFailed] = useState(false)
  const name = String(day).padStart(2, '0')

  if (failed) {
    return (
      <span className="photo-fallback">
        <span className="photo-fallback__flake" aria-hidden="true">❄</span>
        <span className="photo-fallback__text">Foto del día {name}</span>
      </span>
    )
  }

  return (
    <img
      className="photo"
      src={`${import.meta.env.BASE_URL}fotos/${name}.${config.photoExtension}`}
      alt=""
      loading="lazy"
      onError={() => setFailed(true)}
    />
  )
}
