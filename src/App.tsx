import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { config } from './config'
import { days, demoDay, TOTAL_DAYS, type AdventDay } from './data/days'
import { daysUntilDecember, getRevealedDay, readPreviewParam } from './lib/date'

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
      parsed.filter((n): n is number => typeof n === 'number' && n >= 1 && n <= TOTAL_DAYS),
    )
  } catch {
    return new Set<number>()
  }
}

function countdownLabel(revealedDay: number): string {
  if (preview !== null) {
    return preview === TOTAL_DAYS
      ? 'MODO PRUEBA · TODOS LOS DÍAS'
      : preview === 0
        ? 'MODO PRUEBA · TODO CERRADO'
        : `MODO PRUEBA · HASTA EL DÍA ${preview}`
  }
  if (revealedDay >= TOTAL_DAYS) return 'FELIZ NAVIDAD'
  const remaining = revealedDay === 0 ? daysUntilDecember() : TOTAL_DAYS - revealedDay
  return `Faltan ${remaining} ${remaining === 1 ? 'día' : 'días'}`
}

export default function App() {
  const revealedDay = useMemo(() => getRevealedDay(preview), [])
  const [opened, setOpened] = useState<Set<number>>(readOpened)
  const [hintDay, setHintDay] = useState<number | null>(null)
  const [selectedDay, setSelectedDay] = useState<number | null>(null)

  const selected = selectedDay === null ? undefined : days.find((item) => item.day === selectedDay)

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

  const closeDialog = useCallback(() => setSelectedDay(null), [])

  const handleTile = useCallback((day: number, state: TileState) => {
    if (state === 'locked') {
      setHintDay(day)
      return
    }
    setOpened((previous) => new Set(previous).add(day))
    setSelectedDay(day)
  }, [])

  return (
    <div className="app">
      <header className="site-header">
        <span className="site-header__brand">{config.title}</span>
      </header>

      <main>
        <section className="intro">
          <h1 className="intro__headline">{config.headline}</h1>
          <div className="intro__countdown">
            <span className="intro__line" />
            <span>{countdownLabel(revealedDay)}</span>
            <span className="intro__line" />
          </div>
        </section>

        <section className="calendar-section" aria-label="Calendario de adviento">
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
                  isToday={preview === null && revealedDay === item.day}
                  hint={hintDay === item.day}
                  onSelect={handleTile}
                />
              )
            })}
          </div>
        </section>

        <section className="demo-section" aria-label="Baldosa de ejemplo">
          <p className="demo-section__label">Ejemplo · se abre y se cierra cuando quieras</p>
          <div className="demo-section__tile">
            <DayTile
              data={demoDay}
              state="ready"
              isToday={false}
              hint={false}
              onSelect={handleTile}
            />
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <p>{config.footer}</p>
      </footer>

      {selected && <DayDialog data={selected} onClose={closeDialog} />}
    </div>
  )
}

interface DayTileProps {
  data: AdventDay
  state: TileState
  isToday: boolean
  hint: boolean
  onSelect: (day: number, state: TileState) => void
}

function DayTile({ data, state, isToday, hint, onSelect }: DayTileProps) {
  const label = data.demo
    ? 'Abrir la ventana de prueba (se puede volver a abrir cuando quieras)'
    : state === 'locked'
      ? `Día ${data.day}, se abre el ${data.day} de diciembre`
      : state === 'open'
        ? `Ver de nuevo el día ${data.day}`
        : `Abrir día ${data.day}${data.special ? ', la foto especial' : ''}`

  const classes = [
    'tile',
    `tile--${data.color}`,
    `tile--shape-${data.shape}`,
    data.wide ? 'tile--wide' : '',
    data.tall ? 'tile--tall' : '',
    data.special ? 'tile--special' : '',
    data.demo ? 'tile--demo' : '',
    state === 'locked' ? 'tile--locked' : '',
    state === 'ready' ? 'tile--ready' : '',
    state === 'open' ? 'tile--open' : '',
    isToday ? 'tile--today' : '',
    hint ? 'tile--hint' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button
      type="button"
      className={classes}
      aria-label={label}
      onClick={() => onSelect(data.day, state)}
    >
      {state === 'open' ? (
        <span className="tile__photo">
          <DayPhoto day={data.photoDay ?? data.day} />
        </span>
      ) : (
        <span className="tile__face" aria-hidden="true">
          <span className="tile__number">{data.demo ? '✦' : data.day}</span>
          <span className="tile__rule" />
          {data.special && <span className="tile__special">especial</span>}
          {data.demo && <span className="tile__special">ejemplo</span>}
          {state === 'ready' && <span className="tile__dot" />}
        </span>
      )}
      {hint && <span className="tile__hint">¡Aún no! Día {data.day}</span>}
    </button>
  )
}

function DayDialog({ data, onClose }: { data: AdventDay; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null
    closeRef.current?.focus()
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
      previous?.focus()
    }
  }, [onClose])

  return (
    <div className="dialog-backdrop" onClick={onClose}>
      <div
        className="dialog"
        role="dialog"
        aria-modal="true"
        aria-label={data.demo ? 'Ventana de ejemplo' : `Día ${data.day}`}
        onClick={(event) => event.stopPropagation()}
      >
        <button ref={closeRef} type="button" className="dialog__close" onClick={onClose} aria-label="Cerrar">
          <span aria-hidden="true">×</span>
        </button>
        <div className="dialog__media">
          <DayPhoto day={data.photoDay ?? data.day} />
        </div>
        <div className="dialog__caption">
          <p className="dialog__eyebrow">
            {data.demo ? 'Ejemplo · así se abre cada día' : `Día ${data.day}${data.special ? ' · especial' : ''}`}
          </p>
          <p className="dialog__phrase">{data.phrase}</p>
        </div>
      </div>
    </div>
  )
}

function DayPhoto({ day }: { day: number }) {
  const [failed, setFailed] = useState(false)
  const name = String(day).padStart(2, '0')

  if (failed) {
    return (
      <span className="photo-fallback">
        <span className="photo-fallback__line" />
        <span className="photo-fallback__text">{name}</span>
        <span className="photo-fallback__line" />
      </span>
    )
  }

  return (
    <img
      className="photo"
      src={`${import.meta.env.BASE_URL}fotos/${name}.${config.photoExtension}`}
      alt={`Foto del día ${day}`}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  )
}
