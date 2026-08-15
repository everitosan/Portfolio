/// <reference types="astro/client" />

declare module '@fontsource/*'
declare module '@fontsource-variable/*'

interface ImportMetaEnv {
  readonly POCKETBASE_URL: string
  readonly POCKETBASE_PUBLIC_URL: string
  readonly PUBLIC_UMAMI_URL?: string
  readonly PUBLIC_UMAMI_WEBSITE_ID?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
