import type { Post, Tag, Lang, PBList } from './types'

export interface BlogRepository {
  getPosts(lang: Lang, page?: number, perPage?: number): Promise<PBList<Post>>
  getPost(slug: string): Promise<Post>
  getPostsByTag(tagSlug: string, lang: Lang): Promise<PBList<Post>>
  getTag(slug: string): Promise<Tag>
  getAllTags(): Promise<Tag[]>
  getAllPostSlugs(): Promise<{ slug: string; lang: Lang }[]>
}
