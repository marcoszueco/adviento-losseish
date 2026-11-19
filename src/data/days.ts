export interface AdventDay {
  day: number
  phrase: string
  /** Posición en el mosaico de escritorio: fila / columna / fila-fin / columna-fin. */
  area: string
  /** Los días destacados ocupan 2x2 casillas en el mosaico de escritorio. */
  featured: boolean
}

/**
 * Las 24 frases y la composición del mosaico.
 * Las fotos se leen de /public/fotos/01.jpg ... 24.jpg (ver src/config.ts).
 */
export const days: AdventDay[] = [
  {
    day: 1,
    phrase: 'La Navidad empieza hoy, poquito a poquito, en el corazón.',
    area: '1 / 1 / span 2 / span 2',
    featured: true,
  },
  { day: 2, phrase: 'Las luces que enciendes afuera también encienden algo adentro.', area: '1 / 3 / 2 / 4', featured: false },
  { day: 3, phrase: 'Hoy toca esperar con ilusión: lo bonito llega a su tiempo.', area: '1 / 4 / 2 / 5', featured: false },
  { day: 4, phrase: 'Un café caliente, una manta y ganas de que llegue diciembre.', area: '1 / 5 / 2 / 6', featured: false },
  { day: 5, phrase: 'Comparte una sonrisa: es la mejor forma de empezar el adviento.', area: '1 / 6 / 2 / 7', featured: false },
  { day: 6, phrase: 'Los pequeños detalles son los que hacen grandes los recuerdos.', area: '2 / 3 / 3 / 4', featured: false },
  { day: 7, phrase: 'Hay magia en las cosas sencillas si las miras con cariño.', area: '2 / 4 / 3 / 5', featured: false },
  { day: 8, phrase: 'Deja una ventana abierta a la sorpresa.', area: '2 / 5 / 3 / 6', featured: false },
  { day: 9, phrase: 'Cada día que pasa, un motivo más para celebrar.', area: '2 / 6 / 3 / 7', featured: false },
  {
    day: 10,
    phrase: 'La mejor decoración es la gente que se reúne alrededor.',
    area: '3 / 1 / span 2 / span 2',
    featured: true,
  },
  { day: 11, phrase: 'Hoy: abraza fuerte, aunque sea de lejos.', area: '3 / 3 / 4 / 4', featured: false },
  { day: 12, phrase: 'La nieve no hace falta cuando hay ganas de compartir.', area: '3 / 4 / 4 / 5', featured: false },
  { day: 13, phrase: 'Escribe ese mensaje que llevas tiempo pensando.', area: '3 / 5 / 4 / 6', featured: false },
  { day: 14, phrase: 'La ilusión se contagia: compártela sin miedo.', area: '3 / 6 / 4 / 7', featured: false },
  { day: 15, phrase: 'Mira el cielo: hasta las estrellas se preparan para brillar.', area: '4 / 3 / 5 / 4', featured: false },
  { day: 16, phrase: 'Perdona rápido y abraza despacio.', area: '4 / 4 / 5 / 5', featured: false },
  { day: 17, phrase: 'La mesa está más bonita cuando se sienta quien quieres.', area: '4 / 5 / 5 / 6', featured: false },
  { day: 18, phrase: 'Guarda un momento de calma solo para ti.', area: '4 / 6 / 5 / 7', featured: false },
  {
    day: 19,
    phrase: 'Ya casi está aquí. Escucha el tintineo de la ilusión.',
    area: '5 / 1 / span 2 / span 2',
    featured: true,
  },
  { day: 20, phrase: 'Hoy brinda por todo lo que ha salido bien este año.', area: '5 / 3 / 6 / 4', featured: false },
  { day: 21, phrase: 'La última semana sabe a hogar, a mantel y a risas.', area: '5 / 4 / 6 / 5', featured: false },
  {
    day: 22,
    phrase: 'Deja una silla libre para quien no pudo estar.',
    area: '5 / 5 / span 2 / span 2',
    featured: true,
  },
  { day: 23, phrase: 'Mañana será Navidad. Cierra los ojos y pide un deseo.', area: '6 / 3 / 7 / 4', featured: false },
  { day: 24, phrase: '¡Feliz Navidad! Que este mosaico de momentos siga creciendo.', area: '6 / 4 / 7 / 5', featured: false },
]
