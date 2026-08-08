# Portfolio

Sitio web personal de Everardo, construido como **monorepo** gestionado con [Turborepo](https://turbo.build/) y [pnpm workspaces](https://pnpm.io/workspaces).

## Objetivo

Reunir en un solo repositorio los distintos productos web personales —el portafolio principal y el blog/apuntes— compartiendo componentes de UI, tipos y configuración común. La meta es tener un desarrollo unificado, componentes reutilizables entre proyectos y un despliegue reproducible a un servidor propio.

## Aplicaciones

| App | Descripción | Tecnologías |
| --- | --- | --- |
| **`apps/web`** | Portafolio principal (about, experiencia, proyectos). Sitio con enrutado por idioma (`[lang]`). | [SvelteKit](https://kit.svelte.dev/) (Svelte 3), Vite, TypeScript, Sass, `typed.js`, adapter-node |
| **`apps/blog`** | Blog y "apuntes". Renderiza contenido en Markdown y un modo *canvas* interactivo (grafo de nodos estilo Obsidian). SSR con Node. | [Astro](https://astro.build/) + integración de Svelte 5, [PocketBase](https://pocketbase.io/) como backend/CMS, `marked` + `shiki` (resaltado de código), `@xyflow/svelte` (canvas/flow), RSS y sitemap |

Ambas apps son multi-idioma (`es` / `en`) mediante rutas `[lang]`.

## Paquetes compartidos

| Paquete | Contenido |
| --- | --- |
| **`packages/ui`** | Componentes Svelte reutilizables (`Card`, `Header`, `Menu`, `ProjectCard`, `3D`, `Logo`, etc.). |
| **`packages/types`** | Tipos TypeScript compartidos (entidades del portafolio, `Lang`). |
| **`packages/tsconfig`** | Configuración base de TypeScript. |
| **`packages/eslint-config-custom`** | Reglas de ESLint compartidas. |

## Arquitectura

```
Portfolio/
├── apps/
│   ├── web/          → SvelteKit  (portafolio, adapter-node)
│   └── blog/         → Astro + Svelte 5 + PocketBase (blog / apuntes / canvas)
├── packages/
│   ├── ui/           → Componentes Svelte compartidos  (workspace:*)
│   ├── types/        → Tipos TS compartidos
│   ├── tsconfig/     → Config base de TS
│   └── eslint-config-custom/
├── utils/scripts/    → Scripts de despliegue (deploy-web.sh, deploy-blog.sh)
├── releases/         → Artefactos empaquetados (build.7z)
├── turbo.json        → Definición de tareas (build/dev/lint/check)
├── pnpm-workspace.yaml
└── makefile          → Atajos de desarrollo y despliegue
```

**Puntos clave:**

- **Turborepo** orquesta las tareas (`build`, `dev`, `lint`, `check`) respetando dependencias entre paquetes (`^build`).
- **pnpm workspaces** enlaza `ui` y `types` dentro de las apps (`ui: workspace:*`).
- El **blog** corre en el servidor con **PM2** (SSR de Astro con adapter-node); el contenido se gestiona con **PocketBase** (binario local en desarrollo).
- El **web** se compila y se sube empaquetado (`build.7z`) a `/var/www/html` del servidor remoto.
- Despliegue vía **SSH / SCP / rsync** al host `eve-dev`.
- Node fijado a **v20.17.0** (`.nvmrc`).

## Requisitos

- Node.js `v20.17.0` (usa `nvm use`)
- pnpm `10.12.1` (definido en `packageManager`)
- Para el blog en local: binario de PocketBase incluido en `apps/blog/pocketbase_0.39.4_linux_amd64`

## Comandos de Make

| Comando | Qué hace |
| --- | --- |
| `make dev-web` | Levanta el portafolio (`turbo run dev`) tras cargar la versión de Node del `.nvmrc`. |
| `make dev-blog` | Levanta el blog completo en paralelo: PocketBase + Astro. |
| `make dev-blog-pb` | Arranca solo el servidor de PocketBase (`pocketbase serve`). |
| `make dev-blog-astro` | Arranca solo el dev server de Astro (`pnpm dev`, puerto 4321). |
| `make deploy-web` | Compila `web`, empaqueta en `build.7z` y lo despliega por SSH al servidor remoto. |
| `make deploy-blog` | Compila `blog`, sincroniza con `rsync` y reinicia el proceso con PM2. |

### Scripts de pnpm (alternativa directa)

Desde la raíz del repo:

```bash
pnpm dev      # turbo run dev --parallel  (todas las apps)
pnpm build    # turbo run build
pnpm lint     # turbo run lint
pnpm format   # prettier --write
```

Por app individual:

```bash
pnpm -F web dev      # o build / preview / check
pnpm -F blog dev     # o build / preview / check
```
