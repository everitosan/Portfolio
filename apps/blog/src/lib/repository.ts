import { PocketBaseRepository } from './pocketbase-repository'
import type { BlogRepository } from './blog-repository'

// Punto único de acceso al repositorio.
// Para cambiar de fuente de datos, reemplaza PocketBaseRepository
// por otra implementación de BlogRepository.
export function getRepository(): BlogRepository {
  const url = import.meta.env.POCKETBASE_URL ?? 'http://localhost:8090'
  return new PocketBaseRepository(url)
}

export function readingTime(content: string): number {
  const words = content.trim().split(/\s+/).length
  return Math.ceil(words / 200)
}
