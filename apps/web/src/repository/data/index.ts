import type { Lang, ExperienceData, ProjectData, AboutData } from "./types"
import { parse } from "yaml"

const baseApi = import.meta.env.MODE === "development" ? "/data" : "https://evesan.rocks/data"

export class DataRepository {
  fetch = fetch

  constructor(fetchFn: any) {
    this.fetch = fetchFn
  }

  getAbout = async (lang: Lang): Promise<AboutData> => {
    return await this.get(`${baseApi}/about-${lang}.yml`) as AboutData
  }

  getExperience = async (lang: Lang): Promise<ExperienceData> => {
    return await this.get(`${baseApi}/experience-${lang}.yml`) as ExperienceData
  }

  getProjects = async (lang: Lang): Promise<ProjectData> => {
    return await this.get(`${baseApi}/projects-${lang}.yml`) as ProjectData
  }

  private get = async(url: string) => {
    try {
      const response = await this.fetch(url)
      const yamlData = await response.text()
      return parse(yamlData)
    } catch(e) {
      return Promise.reject(e)
    }
  }
}