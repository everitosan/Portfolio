import PocketBase from 'pocketbase'
import type { CanvasRepository } from './canvas-repository'
import type { CanvasNote, CanvasData } from './canvas-types'
import type { Tag, Lang, PBList } from './types'

const now = () => new Date().toISOString().replace('T', ' ').substring(0, 19)

const COLLECTION = 'notes'

export class PocketBaseCanvasRepository implements CanvasRepository {
  private pb: PocketBase
  private publicPb: PocketBase

  constructor(url: string, publicUrl: string) {
    this.pb = new PocketBase(url)
    this.publicPb = new PocketBase(publicUrl)
  }

  private withUrls(note: CanvasNote): CanvasNote {
    return {
      ...note,
      canvas_url: note.canvas ? this.pb.files.getURL(note, note.canvas) : '',
      cover_url: note.cover ? this.publicPb.files.getURL(note, note.cover) : '',
    }
  }

  async getNotes(lang: Lang, page = 1, perPage = 12): Promise<PBList<CanvasNote>> {
    const result = await this.pb.collection(COLLECTION).getList<CanvasNote>(page, perPage, {
      filter: `lang = "${lang}" && published = true && published_at <= "${now()}"`,
      sort: '-published_at',
      expand: 'tags',
    })
    return { ...result, items: result.items.map((n) => this.withUrls(n)) }
  }

  async getNote(slug: string): Promise<CanvasNote> {
    const note = await this.pb.collection(COLLECTION).getFirstListItem<CanvasNote>(
      `slug = "${slug}" && published = true && published_at <= "${now()}"`,
      { expand: 'tags' }
    )
    return this.withUrls(note)
  }

  async getNotesByTag(tagSlug: string, lang: Lang): Promise<PBList<CanvasNote>> {
    const tag = await this.pb.collection('tags').getFirstListItem<Tag>(`slug = "${tagSlug}"`)
    const result = await this.pb.collection(COLLECTION).getList<CanvasNote>(1, 50, {
      filter: `tags ~ "${tag.id}" && lang = "${lang}" && published = true && published_at <= "${now()}"`,
      sort: '-published_at',
      expand: 'tags',
    })
    return { ...result, items: result.items.map((n) => this.withUrls(n)) }
  }

  async getAllNoteSlugs(): Promise<{ slug: string; lang: Lang }[]> {
    const notes = await this.pb.collection(COLLECTION).getFullList<CanvasNote>({
      filter: `published = true && published_at <= "${now()}"`,
      fields: 'slug,lang',
    })
    return notes.map((n) => ({ slug: n.slug, lang: n.lang }))
  }

  async getCanvasData(note: CanvasNote): Promise<CanvasData> {
    if (!note.canvas_url) return { nodes: [], edges: [] }
    const res = await fetch(note.canvas_url)
    if (!res.ok) throw new Error(`No se pudo descargar el canvas: ${res.status}`)
    const raw = (await res.json()) as Partial<CanvasData>
    return { nodes: raw.nodes ?? [], edges: raw.edges ?? [] }
  }
}
