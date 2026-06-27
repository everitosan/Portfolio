import PocketBase from 'pocketbase'
import type { BlogRepository } from './blog-repository'
import type { Post, Tag, Lang, PBList } from './types'

const now = () => new Date().toISOString().replace('T', ' ').substring(0, 19)

export class PocketBaseRepository implements BlogRepository {
  private pb: PocketBase
  private publicPb: PocketBase

  constructor(url: string, publicUrl: string) {
    this.pb = new PocketBase(url)
    this.publicPb = new PocketBase(publicUrl)
  }

  private withCoverUrl(post: Post): Post {
    return {
      ...post,
      cover_url: post.cover
        ? this.publicPb.files.getURL(post, post.cover)
        : '',
    }
  }

  async getPosts(lang: Lang, page = 1, perPage = 12): Promise<PBList<Post>> {
    const result = await this.pb.collection('posts').getList<Post>(page, perPage, {
      filter: `lang = "${lang}" && published = true && published_at <= "${now()}"`,
      sort: '-published_at',
      expand: 'tags',
    })
    return { ...result, items: result.items.map((p) => this.withCoverUrl(p)) }
  }

  async getPost(slug: string): Promise<Post> {
    const post = await this.pb.collection('posts').getFirstListItem<Post>(
      `slug = "${slug}" && published = true && published_at <= "${now()}"`,
      { expand: 'tags' }
    )
    return this.withCoverUrl(post)
  }

  async getPostsByTag(tagSlug: string, lang: Lang): Promise<PBList<Post>> {
    const tag = await this.pb.collection('tags').getFirstListItem<Tag>(`slug = "${tagSlug}"`)
    const result = await this.pb.collection('posts').getList<Post>(1, 50, {
      filter: `tags ~ "${tag.id}" && lang = "${lang}" && published = true && published_at <= "${now()}"`,
      sort: '-published_at',
      expand: 'tags',
    })
    return { ...result, items: result.items.map((p) => this.withCoverUrl(p)) }
  }

  async getTag(slug: string): Promise<Tag> {
    return this.pb.collection('tags').getFirstListItem<Tag>(`slug = "${slug}"`)
  }

  async getAllTags(): Promise<Tag[]> {
    return this.pb.collection('tags').getFullList<Tag>({ sort: 'name' })
  }

  async getAllPostSlugs(): Promise<{ slug: string; lang: Lang }[]> {
    const posts = await this.pb.collection('posts').getFullList<Post>({
      filter: `published = true && published_at <= "${now()}"`,
      fields: 'slug,lang',
    })
    return posts.map((p) => ({ slug: p.slug, lang: p.lang }))
  }
}
