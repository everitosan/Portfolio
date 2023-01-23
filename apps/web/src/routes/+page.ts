import { error } from "@sveltejs/kit"
import type { PageLoad } from "./$types"
import { DataRepository } from "../repository/data"
import type { ManifestData } from "types/entities"
import type { Lang } from "types/lang"

export const prerender = true

type ManifestLangMap = {
  lang: Lang,
  data: ManifestData
}

type ManifestPageData = {
  langs: Array<ManifestLangMap>
}

export const load = (async ({ fetch }) => {
  try {
    const langs: ManifestLangMap[] = []

    const esData: ManifestData = await new DataRepository(fetch).getManifest("es")
    langs.push({ lang: "es", data: esData})
    
    const enData: ManifestData = await new DataRepository(fetch).getManifest("en")
    langs.push({ lang: "en", data: enData})
    
    return {langs} as ManifestPageData
  } catch(e) {
    console.log(e)
    throw error(404, `${e}`);
  }
}) satisfies PageLoad