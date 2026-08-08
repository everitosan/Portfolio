import { Marked } from 'marked'
import markedShiki from 'marked-shiki'
import { codeToHtml } from 'shiki'
import type { CanvasData } from './canvas-types'

/*
 * Renderiza el markdown de los nodos del canvas EN EL SERVIDOR, con resaltado
 * de sintaxis vía Shiki. El HTML resultante se pasa ya listo al visor (cliente),
 * así que Shiki no pesa nada en el bundle del navegador.
 *
 * Tema dual (sigue al sistema operativo):
 *   - claro por defecto (one-light)
 *   - oscuro vía prefers-color-scheme (one-dark-pro, fondo #282c34 ≈ Things)
 */
const md = new Marked().use(
  markedShiki({
    async highlight(code, lang) {
      try {
        return await codeToHtml(code, {
          lang: lang || 'text',
          themes: { light: 'one-light', dark: 'one-dark-pro' },
          defaultColor: 'light',
        })
      } catch {
        // Lenguaje no soportado → texto plano resaltable
        return await codeToHtml(code, {
          lang: 'text',
          themes: { light: 'one-light', dark: 'one-dark-pro' },
          defaultColor: 'light',
        })
      }
    },
  })
)

/** Devuelve { nodeId: htmlRenderizado } para cada nodo de texto. */
export async function renderCanvasNodesHtml(
  canvas: CanvasData
): Promise<Record<string, string>> {
  const out: Record<string, string> = {}
  await Promise.all(
    (canvas.nodes ?? []).map(async (n) => {
      if (n.type === 'text' && n.text?.trim()) {
        out[n.id] = await md.parse(n.text)
      }
    })
  )
  return out
}
