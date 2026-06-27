export type Lang = 'es' | 'en'

export type Tag = {
  id: string
  name: string
  slug: string
  created: string
  updated: string
}

export type Post = {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  cover: string       // filename stored by PocketBase
  cover_url: string   // full URL computed by the repository
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

export type PBList<T> = {
  page: number
  perPage: number
  totalItems: number
  totalPages: number
  items: T[]
}
