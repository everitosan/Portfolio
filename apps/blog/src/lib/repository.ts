import { PocketBaseRepository } from './pocketbase-repository'
import { PocketBaseCanvasRepository } from './pocketbase-canvas-repository'
import type { BlogRepository } from './blog-repository'
import type { CanvasRepository } from './canvas-repository'

function pbUrls() {
  const url = process.env.POCKETBASE_URL ?? 'http://localhost:8090'
  const publicUrl = process.env.POCKETBASE_PUBLIC_URL ?? url
  return { url, publicUrl }
}

// Punto único de acceso al repositorio.
// Para cambiar de fuente de datos, reemplaza PocketBaseRepository
// por otra implementación de BlogRepository.
export function getRepository(): BlogRepository {
  const { url, publicUrl } = pbUrls()
  return new PocketBaseRepository(url, publicUrl)
}

// Repositorio de apuntes (diagramas .canvas de Obsidian).
export function getCanvasRepository(): CanvasRepository {
  const { url, publicUrl } = pbUrls()
  return new PocketBaseCanvasRepository(url, publicUrl)
}

export function readingTime(content: string): number {
  const words = content.trim().split(/\s+/).length
  return Math.ceil(words / 200)
}
