import type { Node, Edge } from '@xyflow/svelte'
import type {
  CanvasData,
  CanvasNode,
  CanvasColor,
  CanvasStyleAttributes,
} from './canvas-types'

/*
 * Colores de Obsidian Canvas.
 * Los valores "1".."6" son presets: los resolvemos a variables CSS que aporta
 * el tema activo (ver src/styles/canvas-themes/), para que cambien con el tema.
 * Cualquier otro valor es un hex directo y se deja pasar tal cual.
 */
export function resolveColor(color?: CanvasColor): string | undefined {
  if (!color) return undefined
  if (/^[1-6]$/.test(color)) return `var(--canvas-color-${color})`
  return color
}

/** Contenido que exponemos a los nodos custom de Svelte Flow */
export type FlowNodeData = {
  kind: CanvasNode['type']
  label: string
  url?: string
  color?: string
  isGroup: boolean
  style?: CanvasStyleAttributes
  /** HTML pre-renderizado en el servidor (con Shiki). Si existe, tiene prioridad. */
  html?: string
}

/** Traduce el atributo `path` de Advanced Canvas a stroke-dasharray. */
function edgeDash(path?: string): string {
  switch (path) {
    case 'dotted':
      return 'stroke-dasharray:1 6;stroke-linecap:round;'
    case 'short-dashed':
      return 'stroke-dasharray:6 6;'
    case 'long-dashed':
      return 'stroke-dasharray:14 8;'
    default:
      return ''
  }
}

/**
 * Convierte un .canvas (JSONCanvas) en nodes/edges para Svelte Flow.
 * Las coordenadas de Obsidian y de Svelte Flow comparten origen (top-left),
 * así que se mapean 1:1.
 */
export function canvasToFlow(canvas: CanvasData): {
  nodes: Node<FlowNodeData>[]
  edges: Edge[]
} {
  // Los grupos deben quedar detrás del resto para que se vean como contenedores.
  const sorted = [...(canvas.nodes ?? [])].sort((a, b) => {
    const ga = a.type === 'group' ? 0 : 1
    const gb = b.type === 'group' ? 0 : 1
    return ga - gb
  })

  const nodes: Node<FlowNodeData>[] = sorted.map((n) => ({
    id: n.id,
    type: n.type === 'group' ? 'canvasGroup' : 'canvasNode',
    position: { x: n.x, y: n.y },
    width: n.width,
    height: n.height,
    selectable: false,
    connectable: false,
    deletable: false,
    draggable: false,
    data: {
      kind: n.type,
      label: nodeLabel(n),
      url: n.type === 'link' ? n.url : undefined,
      color: resolveColor(n.color),
      isGroup: n.type === 'group',
      style: n.styleAttributes,
    },
  }))

  const edges: Edge[] = (canvas.edges ?? []).map((e) => {
    const stroke = e.color ? `stroke:${resolveColor(e.color)};` : ''
    const dash = edgeDash(e.styleAttributes?.path)
    const style = `${stroke}${dash}` || undefined
    return {
      id: e.id,
      source: e.fromNode,
      target: e.toNode,
      sourceHandle: e.fromSide,
      targetHandle: e.toSide,
      label: e.label,
      animated: false,
      style,
      markerEnd:
        e.toEnd === 'none'
          ? undefined
          : ({ type: 'arrowclosed', width: 18, height: 18 } as unknown as never),
    }
  })

  return { nodes, edges }
}

function nodeLabel(n: CanvasNode): string {
  switch (n.type) {
    case 'text':
      return n.text ?? ''
    case 'link':
      return n.url ?? ''
    case 'file':
      return n.file ?? ''
    case 'group':
      return n.label ?? ''
  }
}

/**
 * Extrae el texto del canvas como markdown plano, para renderizarlo en SSR.
 * Esto es lo que indexan los buscadores (el diagrama interactivo es solo JS).
 */
export function canvasToText(canvas: CanvasData): string {
  const parts: string[] = []
  for (const n of canvas.nodes ?? []) {
    if (n.type === 'text' && n.text?.trim()) {
      parts.push(n.text.trim())
    } else if (n.type === 'group' && n.label?.trim()) {
      parts.push(`## ${n.label.trim()}`)
    } else if (n.type === 'link') {
      parts.push(`- ${n.url}`)
    }
  }
  return parts.join('\n\n')
}
