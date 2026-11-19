# Adviento Los Seish 🎄

Calendario de adviento en forma de mosaico: 24 días, cada uno con una foto y una frase. Los días se van abriendo automáticamente según la fecha (1–24 de diciembre) y el estado de cada puerta se guarda en el navegador.

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

Copia tus 24 fotos en `public/fotos/` con los nombres `01.jpg`, `02.jpg`, …, `24.jpg`.

Mientras no existan, se muestra una tarjeta decorativa de respaldo. Si tus fotos son `.png` o `.webp`, cambia `photoExtension` en `src/config.ts`.

## Cambiar textos

- **Título, subtítulo y pie:** `src/config.ts`
- **Frases de cada día:** `src/data/days.ts` (array `days`, campo `phrase`)

## Modo prueba

Para revisar el calendario sin esperar a diciembre, añade a la URL:

- `?preview=12` → abre hasta el día 12
- `?preview=all` → abre los 24 días
- `?preview=0` → deja todo cerrado

También hay un enlace discreto abajo del todo («Ver todos los días (modo prueba)»). En modo prueba, los días abiertos se guardan por separado para no mezclarse con los reales. El enlace «Reiniciar días abiertos» borra ese estado.

## Subir a GitHub

El repositorio local ya está inicializado en la rama `main` con un primer commit. Crea el repositorio vacío en GitHub y ejecuta:

```bash
git remote add origin https://github.com/TU_USUARIO/TU_REPOSITORIO.git
git push -u origin main
```

Después, cada cambio se sube con `git add .`, `git commit -m "mensaje"` y `git push`.

## Desplegar en Vercel

1. Entra en [vercel.com](https://vercel.com) y haz login con GitHub.
2. **Add New → Project** y elige el repositorio.
3. Vercel detecta Vite automáticamente. Confirma que el comando de build es `npm run build` y el directorio de salida `dist` (ya viene en `vercel.json`).
4. Pulsa **Deploy**.

Cada vez que hagas `git push`, Vercel actualizará la web sola.

## Estructura

```
src/
├── App.tsx              # Interfaz, estado de puertas abiertas y animaciones
├── config.ts            # Título, subtítulo y extensión de fotos
├── data/days.ts         # 24 frases + composición del mosaico
├── lib/date.ts          # Lógica de revelado por fecha y modo prueba
├── styles.css           # Diseño navideño y responsive
└── main.tsx
public/
├── favicon.svg
└── fotos/               # Aquí van 01.jpg ... 24.jpg
```
