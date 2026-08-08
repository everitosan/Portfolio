import { getRepository, getCanvasRepository } from './repository'
import type { Lang, Tag, Post, PBList } from './types'
import type { CanvasNote } from './canvas-types'

export type FeedKind = 'post' | 'note'

export type FeedItem = {
  kind: FeedKind
  title: string
  slug: string
  url: string
  excerpt: string
  cover_url: string
  published_at: string
  tags: Tag[]
}

// Cuántos elementos traemos de cada colección para fusionar en memoria.
// Suficiente para un blog personal; si algún día crece, se pagina en origen.
const MERGE_LIMIT = 200

function postToFeed(lang: Lang) {
  return (p: Post): FeedItem => ({
    kind: 'post',
    title: p.title,
    slug: p.slug,
    url: `/${lang}/${p.slug}`,
    excerpt: p.excerpt,
    cover_url: p.cover_url,
    published_at: p.published_at,
    tags: (p.expand?.tags ?? []) as Tag[],
  })
}

function noteToFeed(lang: Lang) {
  return (n: CanvasNote): FeedItem => ({
    kind: 'note',
    title: n.title,
    slug: n.slug,
    url: `/${lang}/apuntes/${n.slug}`,
    excerpt: n.excerpt,
    cover_url: n.cover_url,
    published_at: n.published_at,
    tags: (n.expand?.tags ?? []) as Tag[],
  })
}

/**
 * Feed unificado: posts + apuntes (notes) ordenados por fecha.
 * Es resiliente: si la colección `notes` aún no existe, muestra solo posts.
 */
export async function getFeed(lang: Lang, page = 1, perPage = 12) {
  const [postsRes, notesRes] = await Promise.allSettled([
    getRepository().getPosts(lang, 1, MERGE_LIMIT),
    getCanvasRepository().getNotes(lang, 1, MERGE_LIMIT),
  ])

  const posts =
    postsRes.status === 'fulfilled' ? postsRes.value.items.map(postToFeed(lang)) : []
  const notes =
    notesRes.status === 'fulfilled' ? notesRes.value.items.map(noteToFeed(lang)) : []

  if (notesRes.status === 'rejected') {
    console.error('Feed: no se pudieron cargar los apuntes:', notesRes.reason)
  }

  const all = [...posts, ...notes].sort((a, b) =>
    b.published_at.localeCompare(a.published_at)
  )

  const totalItems = all.length
  const totalPages = Math.max(1, Math.ceil(totalItems / perPage))
  const start = (page - 1) * perPage
  const items = all.slice(start, start + perPage)

  return { items, page, perPage, totalItems, totalPages } satisfies PBList<FeedItem>
}

/**
 * Feed unificado filtrado por tag: posts + apuntes (notes) con ese tag,
 * ordenados por fecha. Resiliente: si `notes` no existe, muestra solo posts.
 */
export async function getFeedByTag(tagSlug: string, lang: Lang): Promise<FeedItem[]> {
  const [postsRes, notesRes] = await Promise.allSettled([
    getRepository().getPostsByTag(tagSlug, lang),
    getCanvasRepository().getNotesByTag(tagSlug, lang),
  ])

  const posts =
    postsRes.status === 'fulfilled' ? postsRes.value.items.map(postToFeed(lang)) : []
  const notes =
    notesRes.status === 'fulfilled' ? notesRes.value.items.map(noteToFeed(lang)) : []

  if (notesRes.status === 'rejected') {
    console.error('Feed: no se pudieron cargar los apuntes por tag:', notesRes.reason)
  }

  return [...posts, ...notes].sort((a, b) => b.published_at.localeCompare(a.published_at))
}
