import type { Lang, Tag } from './types'

/*
 * JSONCanvas spec (https://jsoncanvas.org/spec/1.0/)
 * Es el formato que exporta Obsidian Canvas en los archivos .canvas
 */

export type CanvasColor = string // "1".."6" (preset de Obsidian) o "#rrggbb"

/*
 * styleAttributes: extensión del plugin "Advanced Canvas" (no forma parte del
 * spec de JSONCanvas). Reimplementamos su render aquí con nuestro propio CSS.
 */
export type CanvasStyleAttributes = {
  textAlign?: 'left' | 'center' | 'right' | string
  shape?: 'pill' | 'parallelogram' | 'diamond' | 'circle' | string
  border?: 'dashed' | 'dotted' | 'None' | string
  path?: 'dotted' | 'short-dashed' | 'long-dashed' | string
  [key: string]: string | undefined
}

export type CanvasNodeBase = {
  id: string
  x: number
  y: number
  width: number
  height: number
  color?: CanvasColor
  styleAttributes?: CanvasStyleAttributes
}

export type CanvasTextNode = CanvasNodeBase & {
  type: 'text'
  text: string // markdown
}

export type CanvasFileNode = CanvasNodeBase & {
  type: 'file'
  file: string
  subpath?: string
}

export type CanvasLinkNode = CanvasNodeBase & {
  type: 'link'
  url: string
}

export type CanvasGroupNode = CanvasNodeBase & {
  type: 'group'
  label?: string
  background?: string
  backgroundStyle?: 'cover' | 'ratio' | 'repeat'
}

export type CanvasNode =
  | CanvasTextNode
  | CanvasFileNode
  | CanvasLinkNode
  | CanvasGroupNode

export type CanvasSide = 'top' | 'right' | 'bottom' | 'left'

export type CanvasEdge = {
  id: string
  fromNode: string
  fromSide?: CanvasSide
  toNode: string
  toSide?: CanvasSide
  fromEnd?: 'none' | 'arrow'
  toEnd?: 'none' | 'arrow'
  color?: CanvasColor
  label?: string
  styleAttributes?: CanvasStyleAttributes
}

export type CanvasData = {
  nodes: CanvasNode[]
  edges: CanvasEdge[]
}

/*
 * Modelo de dominio de un apunte (una entrada de la sección /apuntes)
 */

export type CanvasNote = {
  id: string
  title: string
  slug: string
  excerpt: string
  intro: string // markdown; prosa indexable (SEO)
  canvas: string // filename del .canvas en PocketBase
  canvas_url: string // URL pública calculada por el repositorio
  cover: string
  cover_url: string
  tags: string[]
  lang: Lang
  published: boolean
  published_at: string
  created: string
  updated: string
  expand?: {
    tags: Tag[]
  }
}
