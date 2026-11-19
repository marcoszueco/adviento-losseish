import { TOTAL_DAYS } from '../data/days'

/**
 * Devuelve el último día que puede abrirse hoy (1-25).
 * Fuera de diciembre no hay ningún día disponible, salvo en modo prueba.
 */
export function getRevealedDay(preview: number | null): number {
  if (preview !== null) return clamp(preview)
  const now = new Date()
  if (now.getMonth() !== 11) return 0
  return clamp(now.getDate())
}

/**
 * Modo prueba para revisar el calendario sin esperar a diciembre:
 *   ?preview=12  -> abre hasta el día 12
 *   ?preview=all -> abre los 25 días
 *   ?preview=0   -> deja todo cerrado
 */
export function readPreviewParam(): number | null {
  const raw = new URLSearchParams(window.location.search).get('preview')
  if (raw === null) return null
  if (raw === 'all' || raw === '') return TOTAL_DAYS
  const value = Number.parseInt(raw, 10)
  return Number.isNaN(value) ? null : clamp(value)
}

/** Días que faltan para el 1 de diciembre. */
export function daysUntilDecember(): number {
  const now = new Date()
  const year = now.getMonth() === 11 ? now.getFullYear() + 1 : now.getFullYear()
  const start = Date.UTC(year, 11, 1)
  const today = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate())
  return Math.max(0, Math.round((start - today) / 86_400_000))
}

function clamp(value: number): number {
  return Math.min(TOTAL_DAYS, Math.max(0, value))
}
