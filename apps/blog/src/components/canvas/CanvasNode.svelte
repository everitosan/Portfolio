<script lang="ts">
  import { Handle, Position, type NodeProps } from '@xyflow/svelte'
  import { marked } from 'marked'
  import type { FlowNodeData } from '@/lib/canvas-to-flow'

  let { data }: NodeProps = $props()
  const d = data as FlowNodeData

  const sides = [
    { pos: Position.Top, id: 'top' },
    { pos: Position.Right, id: 'right' },
    { pos: Position.Bottom, id: 'bottom' },
    { pos: Position.Left, id: 'left' },
  ]

  // styleAttributes de Advanced Canvas (reimplementados con nuestro CSS)
  const shape = $derived(d.style?.shape ?? 'default')
  const border = $derived((d.style?.border ?? 'solid').toLowerCase())
  const textAlign = $derived(d.style?.textAlign)
  // Formas recortadas con clip-path (el borde se dibuja con una capa aparte)
  const clipped = $derived(shape === 'diamond' || shape === 'parallelogram')

  const html = $derived(
    d.kind === 'link'
      ? `<a href="${d.url}" target="_blank" rel="noopener">${d.url}</a>`
      : (d.html ?? marked.parse(d.label ?? '')) // d.html: pre-renderizado con Shiki (servidor)
  )

  let bodyEl = $state<HTMLDivElement | undefined>()

  // Añade un botón "copiar" a cada bloque de código del nodo y fuerza que
  // todos los enlaces del markdown abran en una pestaña nueva.
  $effect(() => {
    void html // re-ejecuta si cambia el contenido
    const el = bodyEl
    if (!el) return
    el.querySelectorAll('a[href]').forEach((a) => {
      a.setAttribute('target', '_blank')
      a.setAttribute('rel', 'noopener noreferrer')
    })
    el.querySelectorAll('pre').forEach((pre) => {
      if (pre.querySelector('.copy-btn')) return
      const btn = document.createElement('button')
      btn.className = 'copy-btn'
      btn.type = 'button'
      btn.textContent = '⧉'
      btn.title = 'Copiar'
      btn.addEventListener('click', async (e) => {
        e.stopPropagation()
        const code = pre.querySelector('code')?.textContent ?? pre.textContent ?? ''
        try {
          await navigator.clipboard.writeText(code)
          btn.textContent = '✓'
          setTimeout(() => (btn.textContent = '⧉'), 1200)
        } catch {
          /* clipboard no disponible */
        }
      })
      pre.appendChild(btn)
    })
  })
</script>

<div
  class="cnode"
  class:link={d.kind === 'link'}
  class:clipped
  class:colored={!!d.color}
  data-shape={shape}
  data-border={border}
  style:--accent={d.color ?? 'var(--canvas-default-accent)'}
>
  {#each sides as s}
    <Handle type="target" position={s.pos} id={s.id} isConnectable={false} />
    <Handle type="source" position={s.pos} id={s.id} isConnectable={false} />
  {/each}

  {#if clipped}
    <div class="cnode__clip" aria-hidden="true"></div>
  {/if}

  <div class="cnode__body" bind:this={bodyEl} style:text-align={textAlign}>{@html html}</div>
</div>

<style lang="scss">
  .cnode {
    position: relative;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    background: var(--node-bg, rgba(20, 22, 30, 0.92));
    border: 1px solid var(--accent);
    border-left: 3px solid var(--accent);
    border-radius: 6px;
  }

  /* Nodos con color: el fondo entero se tiñe con el acento (como Obsidian),
     en vez de solo el borde. La intensidad la controla --node-tint-strength. */
  .cnode.colored {
    background: color-mix(
      in srgb,
      var(--accent) var(--node-tint-strength, 14%),
      var(--node-bg, rgba(20, 22, 30, 0.92))
    );
    font-family: var(--node-font, sans-serif);
    color: var(--node-text, #eaeaf0);
    font-size: 18px;
    line-height: 1.45;
  }

  /* --- Estilo de borde (Advanced Canvas: border) --- */
  .cnode[data-border='dashed'] { border-style: dashed; }
  .cnode[data-border='dotted'] { border-style: dotted; }
  .cnode[data-border='none'] { border-color: transparent; }

  /* --- Formas basadas en border-radius (soportan borde real) --- */
  .cnode[data-shape='pill'] {
    border-radius: 999px;
    border-left-width: 1px;
  }
  .cnode[data-shape='circle'] {
    border-radius: 50%;
    border-left-width: 1px;
  }

  /* --- Formas recortadas (diamond, parallelogram) --- */
  .cnode.clipped {
    background: transparent;
    border: none;
    border-radius: 0;
  }
  /* Capa de relleno + borde: el color de acento asoma como "borde" */
  .cnode__clip {
    position: absolute;
    inset: 0;
    z-index: 0;
    background: var(--accent);
  }
  .cnode__clip::after {
    content: '';
    position: absolute;
    inset: 1.5px;
    background: var(--node-bg, rgba(20, 22, 30, 0.92));
  }
  .cnode.colored .cnode__clip::after {
    background: color-mix(
      in srgb,
      var(--accent) var(--node-tint-strength, 14%),
      var(--node-bg, rgba(20, 22, 30, 0.92))
    );
  }
  .cnode[data-border='none'] .cnode__clip { background: transparent; }

  .cnode[data-shape='diamond'] .cnode__clip,
  .cnode[data-shape='diamond'] .cnode__clip::after {
    clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
  }
  .cnode[data-shape='parallelogram'] .cnode__clip,
  .cnode[data-shape='parallelogram'] .cnode__clip::after {
    clip-path: polygon(14% 0%, 100% 0%, 86% 100%, 0% 100%);
  }

  /* --- Contenido --- */
  .cnode__body {
    position: relative;
    z-index: 1;
    padding: 8px 12px;
    height: 100%;
    overflow: auto;
    box-sizing: border-box;
  }
  /* Nodos-etiqueta (formas): texto centrado verticalmente, como en Obsidian */
  .cnode[data-shape='pill'] .cnode__body,
  .cnode[data-shape='circle'] .cnode__body,
  .cnode[data-shape='diamond'] .cnode__body {
    display: flex;
    flex-direction: column;
    justify-content: center;
    overflow: hidden;
  }
  /* Los diamantes necesitan más margen para no chocar con los vértices */
  .cnode[data-shape='diamond'] .cnode__body { padding: 8px 22%; }

  .cnode.link {
    font-family: var(--node-mono-font, monospace);
    font-size: 12px;
  }

  .cnode__body :global(h1),
  .cnode__body :global(h2),
  .cnode__body :global(h3),
  .cnode__body :global(h4),
  .cnode__body :global(h5),
  .cnode__body :global(h6) {
    font-family: inherit;
    font-weight: 700;
    margin: 0 0 8px;
    line-height: 1.3;
  }
  /* Encabezados coloreados por nivel (como Dracula for Obsidian).
     El tema aporta --node-hN-color; si no, caen a --node-text. */
  .cnode__body :global(h1) { color: var(--node-h1-color, var(--node-text, #eaeaf0)); font-size: 1.5em; }
  .cnode__body :global(h2) { color: var(--node-h2-color, var(--node-text, #eaeaf0)); font-size: 1.25em; }
  .cnode__body :global(h3) { color: var(--node-h3-color, var(--node-text, #eaeaf0)); font-size: 1.1em; }
  .cnode__body :global(h4) { color: var(--node-h4-color, var(--node-text, #eaeaf0)); font-size: 1em; }
  .cnode__body :global(h5) { color: var(--node-h5-color, var(--node-text, #eaeaf0)); font-size: 0.95em; }
  .cnode__body :global(h6) { color: var(--node-h6-color, var(--node-text, #eaeaf0)); font-size: 0.9em; }
  .cnode__body :global(strong),
  .cnode__body :global(b) { color: var(--node-strong-color, inherit); }
  .cnode__body :global(em),
  .cnode__body :global(i) { color: var(--node-em-color, inherit); }

  .cnode__body :global(p) { margin: 0 0 6px; }
  .cnode__body :global(p:last-child) { margin-bottom: 0; }
  .cnode__body :global(ul),
  .cnode__body :global(ol) { margin: 0 0 6px; padding-left: 18px; }
  .cnode__body :global(a) { color: var(--accent); }
  .cnode__body :global(code) {
    font-family: var(--node-mono-font, monospace);
    font-size: 0.85em;
    color: var(--node-code-color, inherit);
    background: var(--node-code-bg, rgba(0, 0, 0, 0.4));
    padding: 0.1em 0.35em;
    border-radius: 3px;
  }
  .cnode__body :global(pre) {
    position: relative;
    background: var(--node-codeblock-bg, rgba(0, 0, 0, 0.5));
    border: 1px solid rgba(128, 128, 140, 0.25);
    padding: 8px 10px;
    border-radius: 6px;
    font-family: var(--node-mono-font, monospace);
    /* Ajuste de línea, como en Obsidian */
    white-space: pre-wrap;
    overflow-wrap: anywhere;
  }
  .cnode__body :global(pre code) {
    color: inherit;
    background: none;
    padding: 0;
    font-size: 0.82em;
    line-height: 1.5;
    white-space: inherit;
    overflow-wrap: inherit;
  }

  /* Botón de copiar (inyectado por JS) */
  .cnode__body :global(.copy-btn) {
    position: absolute;
    top: 5px;
    right: 5px;
    cursor: pointer;
    padding: 1px 6px;
    font-size: 12px;
    line-height: 1.4;
    color: inherit;
    background: rgba(0, 0, 0, 0.35);
    border: 1px solid rgba(128, 128, 140, 0.4);
    border-radius: 4px;
    opacity: 0;
    transition: opacity 0.15s;
  }
  .cnode__body :global(pre:hover .copy-btn) { opacity: 0.9; }
  .cnode__body :global(.copy-btn:hover) { opacity: 1; }
  /* Shiki: tema oscuro cuando el SO lo prefiere (defaultColor: light) */
  @media (prefers-color-scheme: dark) {
    .cnode__body :global(.shiki),
    .cnode__body :global(.shiki span) {
      color: var(--shiki-dark) !important;
      background-color: var(--shiki-dark-bg) !important;
    }
  }

  /* --- Tablas --- */
  .cnode__body :global(table) {
    border-collapse: collapse;
    width: 100%;
    margin: 4px 0 8px;
    font-size: 0.92em;
  }
  .cnode__body :global(th),
  .cnode__body :global(td) {
    border: 1px solid rgba(128, 128, 140, 0.28);
    padding: 4px 10px;
    text-align: left;
    white-space: nowrap;
  }
  .cnode__body :global(th) {
    font-weight: 700;
    background: rgba(128, 128, 140, 0.1);
  }

  /* Handles invisibles (diagrama de solo lectura) */
  :global(.cnode) :global(.svelte-flow__handle) {
    opacity: 0;
    pointer-events: none;
  }
</style>
