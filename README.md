# Adviento Los Seish 🎄

Calendario de adviento con **25 días**: una foto y una frase por día, y una foto especial el 25. Las puertas aparecen en un mosaico desordenado de baldosas pastel y se abren según la fecha (1–25 de diciembre). Cada apertura muestra la foto arriba y la frase debajo en una ventana.

Hecho con **Vite + React + TypeScript**. Listo para desplegar en **Vercel**.

## Puesta en marcha

```bash
npm install
npm run dev
```

Abre la URL que muestra Vite (normalmente `http://localhost:5173`).

Para generar la versión de producción:

```bash
npm run build
```

## Añadir las fotos

Copia tus 25 fotos en `public/fotos/` con los nombres `01.jpg`, `02.jpg`, …, `25.jpg`. La del día 25 es la especial.

Mientras no existan, se muestra una tarjeta de respaldo con el número. Si tus fotos son `.png` o `.webp`, cambia `photoExtension` en `src/config.ts`.

## Cambiar textos

- **Título, intro, frase de ejemplo y pie:** `src/config.ts`
- **Frases de cada día:** `src/data/days.ts` (campo `phrase`)

## Orden y forma del mosaico

En `src/data/days.ts` está el array `days`, que se pinta en el orden en que aparece. Para mover un día, cambia su posición en el array. Cada entrada permite:

- `color`: `red` | `blue` | `green` | `ochre`
- `shape`: `a` | `b` | `c` | `d` (esquinas redondeadas asimétricas)
- `wide: true` → ocupa dos columnas
- `tall: true` → ocupa dos filas
- `special: true` → estilo del día 25

El grid usa `grid-auto-flow: dense`, así que las baldosas se van encajando solas. Es 2 columnas en móvil, 3 en tablet, 5 en escritorio y 6 en pantallas grandes.

## Modo prueba

Para revisar el calendario sin esperar a diciembre, añade a la URL:

- `?preview=12` → abre hasta el día 12
- `?preview=all` → abre los 25 días
- `?preview=0` → deja todo cerrado

También hay un enlace discreto abajo del todo. En modo prueba, los días abiertos se guardan por separado para no mezclarse con los reales.

## Subir cambios a GitHub / Vercel

El repositorio remoto es `https://github.com/marcoszueco/adviento-losseish`.

```bash
git add .
git commit -m "Describe tus cambios"
git push
```

Vercel detecta cada `git push` y redespliega automáticamente: **no hace falta pulsar Redeploy**. Solo sería necesario si cambias algo desde el panel de Vercel.

## Estructura

```
src/
├── App.tsx              # Interfaz, mosaico, ventana del día y estado guardado
├── config.ts            # Título, intro, frase de ejemplo y extensión de fotos
├── data/days.ts         # 25 frases, orden y forma de cada baldosa
├── lib/date.ts          # Revelado por fecha, cuenta atrás y modo prueba
├── styles.css           # Diseño editorial pastel y responsive
└── main.tsx
public/
├── favicon.svg
└── fotos/               # Aquí van 01.jpg ... 25.jpg
```
