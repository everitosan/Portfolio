<script lang="ts">
  import { SvelteFlow, Background, Controls, type Node, type Edge } from '@xyflow/svelte'
  import '@xyflow/svelte/dist/style.css'
  import { canvasToFlow } from '@/lib/canvas-to-flow'
  import { loadCanvasTheme } from '@/lib/canvas-theme'
  import type { CanvasData } from '@/lib/canvas-types'
  import CanvasNode from './CanvasNode.svelte'
  import CanvasGroupNode from './CanvasGroupNode.svelte'

  // Carga el CSS del tema activo (definido por PUBLIC_CANVAS_THEME).
  loadCanvasTheme()

  let {
    canvas,
    nodesHtml = {},
  }: { canvas: CanvasData; nodesHtml?: Record<string, string> } = $props()

  const { nodes: initialNodes, edges: initialEdges } = canvasToFlow(canvas)
  // Inyecta el HTML pre-renderizado (Shiki) en los nodos que lo tengan.
  for (const n of initialNodes) {
    const html = nodesHtml[n.id]
    if (html) (n.data as { html?: string }).html = html
  }

  let nodes = $state.raw<Node[]>(initialNodes)
  let edges = $state.raw<Edge[]>(initialEdges)

  const nodeTypes = {
    canvasNode: CanvasNode,
    canvasGroup: CanvasGroupNode,
  }
</script>

<div class="board" data-canvas-theme>
  <SvelteFlow
    bind:nodes
    bind:edges
    {nodeTypes}
    colorMode="system"
    fitView
    nodesDraggable={false}
    nodesConnectable={false}
    elementsSelectable={false}
    minZoom={0.1}
    proOptions={{ hideAttribution: true }}
  >
    <Background gap={24} />
    <Controls showLock={false} />
  </SvelteFlow>
</div>

<style>
  .board {
    width: 100%;
    height: 100%;
    min-height: 0;
    overflow: hidden;
    /* El color de fondo lo aporta el tema activo (var --xy-background-color). */
    background: var(--xy-background-color, transparent);
  }

  /* Etiquetas de arista con tamaño legible (como Obsidian) */
  .board :global(.svelte-flow__edge-text) {
    font-family: var(--node-font, sans-serif);
    font-size: 13px;
  }
</style>
