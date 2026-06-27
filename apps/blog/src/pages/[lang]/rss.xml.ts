import rss from '@astrojs/rss'
import type { APIRoute } from 'astro'
import { getRepository } from '@/lib/repository'
import type { Lang } from '@/lib/types'

export const GET: APIRoute = async ({ params, site }) => {
  const lang = params.lang as Lang
  if (lang !== 'en' && lang !== 'es') return new Response(null, { status: 404 })

  const { items: posts } = await getRepository().getPosts(lang, 1, 50)

  return rss({
    title: lang === 'en' ? "Everardo's Blog" : 'EveSan · Blog',
    description:
      lang === 'en'
        ? 'Thoughts on software development, tools and ideas.'
        : 'Pensamientos sobre desarrollo de software, herramientas e ideas.',
    site: site!,
    items: posts.map((post) => ({
      title: post.title,
      description: post.excerpt,
      pubDate: new Date(post.published_at),
      link: `/${lang}/${post.slug}`,
    })),
  })
}
