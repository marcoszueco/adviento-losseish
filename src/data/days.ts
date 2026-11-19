export type TileColor = 'red' | 'blue' | 'green' | 'ochre'
export type TileShape = 'a' | 'b' | 'c' | 'd'

export interface AdventDay {
  day: number
  phrase: string
  color: TileColor
  shape: TileShape
  /** Ocupa dos columnas en el mosaico. */
  wide?: boolean
  /** Ocupa dos filas en el mosaico. */
  tall?: boolean
  /** El día 25: foto especial. */
  special?: boolean
  /** Baldosa de prueba: se puede abrir y cerrar desde hoy. */
  demo?: boolean
  /** Día del que tomar la foto (para la baldosa de prueba). */
  photoDay?: number
  /** Nombre de archivo concreto, si la foto no sigue la numeración 01..25. */
  photoFile?: string
}

export const TOTAL_DAYS = 25

/**
 * Orden de aparición en el mosaico (aleatorio a propósito) y tamaño/color de cada puerta.
 * Las fotos se leen de /public/fotos/01.jpg ... 25.jpg (ver src/config.ts).
 */
export const days: AdventDay[] = [
  { day: 18, phrase: 'Guarda un momento de calma solo para ti.', color: 'red', shape: 'a' },
  { day: 9, phrase: 'Cada día que pasa, un motivo más para celebrar.', color: 'blue', shape: 'b' },
  { day: 3, phrase: 'Hoy toca esperar con ilusión: lo bonito llega a su tiempo.', color: 'green', shape: 'c', tall: true },
  { day: 20, phrase: 'Hoy brinda por todo lo que ha salido bien este año.', color: 'ochre', shape: 'd' },
  { day: 19, phrase: 'Ya casi está aquí. Escucha el tintineo de la ilusión.', color: 'blue', shape: 'a', wide: true },
  { day: 11, phrase: 'Hoy: abraza fuerte, aunque sea de lejos.', color: 'ochre', shape: 'b' },
  { day: 23, phrase: 'Mañana será Navidad. Cierra los ojos y pide un deseo.', color: 'red', shape: 'c' },
  { day: 24, phrase: 'La última puerta antes de la magia: prepara el brindis y la mesa.', color: 'green', shape: 'd', tall: true },
  { day: 14, phrase: 'La ilusión se contagia: compártela sin miedo.', color: 'blue', shape: 'a' },
  { day: 1, phrase: 'Empezamos por lo pequeño: un abrazo que dura un segundo de más.', color: 'red', shape: 'b', wide: true, tall: true },
  { day: 21, phrase: 'La última semana sabe a hogar, a mantel y a risas.', color: 'green', shape: 'c' },
  { day: 7, phrase: 'Hay magia en las cosas sencillas si las miras con cariño.', color: 'ochre', shape: 'd' },
  {
    day: 25,
    phrase: 'Feliz Navidad. De todo lo que vimos este mes, lo que se queda es lo que vivimos juntos.',
    color: 'green',
    shape: 'a',
    wide: true,
    tall: true,
    special: true,
  },
  { day: 10, phrase: 'La mejor decoración es la gente que se reúne alrededor.', color: 'red', shape: 'b' },
  { day: 5, phrase: 'Comparte una sonrisa: es la mejor forma de empezar el adviento.', color: 'blue', shape: 'c', wide: true },
  { day: 8, phrase: 'Deja una ventana abierta a la sorpresa.', color: 'ochre', shape: 'd' },
  { day: 2, phrase: 'Las luces que enciendes afuera también encienden algo adentro.', color: 'red', shape: 'a' },
  { day: 22, phrase: 'Deja una silla libre para quien no pudo estar.', color: 'blue', shape: 'b', tall: true },
  { day: 6, phrase: 'Los pequeños detalles son los que hacen grandes los recuerdos.', color: 'green', shape: 'c' },
  { day: 16, phrase: 'Perdona rápido y abraza despacio.', color: 'ochre', shape: 'd' },
  { day: 4, phrase: 'Un café caliente, una manta y ganas de que llegue diciembre.', color: 'blue', shape: 'a', wide: true },
  { day: 15, phrase: 'Mira el cielo: hasta las estrellas se preparan para brillar.', color: 'green', shape: 'b' },
  { day: 17, phrase: 'La mesa está más bonita cuando se sienta quien quieres.', color: 'red', shape: 'c', tall: true },
  { day: 12, phrase: 'La nieve no hace falta cuando hay ganas de compartir.', color: 'ochre', shape: 'd' },
  { day: 13, phrase: 'Escribe ese mensaje que llevas tiempo pensando.', color: 'ochre', shape: 'a', wide: true, tall: true },
]

/** Baldosa de prueba: vive fuera del calendario, al final de la página. */
export const demoDay: AdventDay = {
  day: 0,
  phrase: 'Así se abre cada día: la foto primero y la frase justo debajo. Vuelve a abrirla cuando quieras. HYPE!',
  color: 'blue',
  shape: 'a',
  demo: true,
  photoFile: 'ejemplo.jpeg',
}
