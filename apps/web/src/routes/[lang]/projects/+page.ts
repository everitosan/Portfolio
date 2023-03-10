import { error } from '@sveltejs/kit'
import type { PageLoad } from './$types'
import { DataRepository } from "../../../repository/data"
import type { Lang } from "types/lang"
import type { ProjectData } from "types/entities"

export const prerender = true

export const load = (async ({ fetch, params }) => {
  try {
    const data: ProjectData = await new DataRepository(fetch).getProjects(params.lang as Lang)
    return data
  } catch(e) {
    console.log(e)
    throw error(404, `${e}`);
  }
}) satisfies PageLoad