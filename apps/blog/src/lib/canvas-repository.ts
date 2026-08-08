import type { Lang, PBList } from './types'
import type { CanvasNote, CanvasData } from './canvas-types'

export interface CanvasRepository {
  getNotes(lang: Lang, page?: number, perPage?: number): Promise<PBList<CanvasNote>>
  getNote(slug: string): Promise<CanvasNote>
  getNotesByTag(tagSlug: string, lang: Lang): Promise<PBList<CanvasNote>>
  getAllNoteSlugs(): Promise<{ slug: string; lang: Lang }[]>
  /** Descarga y parsea el archivo .canvas asociado a un apunte. */
  getCanvasData(note: CanvasNote): Promise<CanvasData>
}
