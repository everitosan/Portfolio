// Helper function to render markdown with marked

export const renderer = {
  link(href: string, title: string, text: string) {
    return `<a target="_blank" rel="noreferrer" href="${href}" >${text}</a>`
  }
}