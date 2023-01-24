type HeadData = {
  title: string
  description: string
}

/*
 * Manifest types
 */

export type ManifestData = {
  head: HeadData
  content: string
}

/*
 * About types
 */

export type AboutData = {
  head: HeadData
  title: string
  content: string
}

/*
 * Experience types
 */

type ExperiencePosition = {
  logo: string
  color: string
  company: string
  position: string
  lapse: string
  description: string
}

export type ExperienceData = {
  head: HeadData
  title: string
  positions: ExperiencePosition[]
}

/*
 * Project types
 */
type Project = {
  name: string
  url: string
  description: string
}

type ProjectCategory = {
  name: string
  color: string
  projects: Project[]
}

export type ProjectData = {
  head: HeadData
  title: string
  categories: ProjectCategory[]
}
