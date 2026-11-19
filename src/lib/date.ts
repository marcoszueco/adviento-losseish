/**
 * Devuelve el último día que puede abrirse hoy (1-24).
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
 *   ?preview=all -> abre los 24 días
 *   ?preview=0   -> deja todo cerrado
 */
export function readPreviewParam(): number | null {
  const raw = new URLSearchParams(window.location.search).get('preview')
  if (raw === null) return null
  if (raw === 'all' || raw === '') return 24
  const value = Number.parseInt(raw, 10)
  return Number.isNaN(value) ? null : clamp(value)
}

function clamp(value: number): number {
  return Math.min(24, Math.max(0, value))
}
