import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types'
import { DataRepository } from "../../../repository/data"
import type { Lang } from "types/lang"
import type { ExperienceData } from "types/entities"

export const prerender = true

export const load = (async ({ fetch, params }) => {
  try {
    const data: ExperienceData = await new DataRepository(fetch).getExperience(params.lang as Lang)
    return data
  } catch(e) {
    throw error(404, 'Not found');
  }
}) satisfies PageLoad