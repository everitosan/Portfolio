/*
 * Selección de tema del visor de diagramas.
 *
 * Los temas viven en src/styles/canvas-themes/<nombre>.css y definen el
 * contrato de variables sobre [data-canvas-theme]. El tema activo se elige
 * con la variable de entorno PUBLIC_CANVAS_THEME (por defecto "things").
 *
 * Pedimos el CSS con `?url` para que Vite lo emita como asset real (hasheado)
 * y devolvemos su URL; luego inyectamos el <link> a mano. Esto evita el bug de
 * Vite donde un CSS importado dinámicamente vía glob se registra para preload
 * pero nunca se escribe el archivo (MIME text/html al pedirlo).
 */
const themes = import.meta.glob('../styles/canvas-themes/*.css', {
  query: '?url',
  import: 'default',
})

const DEFAULT_THEME = 'things'

export async function loadCanvasTheme(): Promise<void> {
  if (typeof document === 'undefined') return
  const name = import.meta.env.PUBLIC_CANVAS_THEME || DEFAULT_THEME
  const key = `../styles/canvas-themes/${name}.css`
  const loader = themes[key] ?? themes[`../styles/canvas-themes/${DEFAULT_THEME}.css`]
  if (!loader) return

  const href = (await loader()) as string
  if (document.querySelector(`link[data-canvas-theme][href="${href}"]`)) return

  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = href
  link.setAttribute('data-canvas-theme', '')
  document.head.appendChild(link)
}
