/// <reference types="astro/client" />

declare module '@fontsource/*'
declare module '@fontsource-variable/*'

interface ImportMetaEnv {
  readonly POCKETBASE_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
