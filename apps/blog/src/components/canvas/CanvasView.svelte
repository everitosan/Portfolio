<script lang="ts">
  import CanvasBoard from './CanvasBoard.svelte'
  import type { CanvasData } from '@/lib/canvas-types'

  let {
    title,
    excerpt = '',
    intro = '',
    date,
    backHref,
    backLabel,
    fullscreenLabel,
    exitFullscreenLabel,
    canvas,
    nodesHtml = {},
  }: {
    title: string
    excerpt?: string
    intro?: string
    date: string
    backHref: string
    backLabel: string
    fullscreenLabel: string
    exitFullscreenLabel: string
    canvas: CanvasData
    nodesHtml?: Record<string, string>
  } = $props()

  let fullscreen = $state(false)
</script>

<div class="view" class:fullscreen>
  {#if !fullscreen}
    <header class="view__header">
      <div class="view__topbar">
        <a class="view__back" href={backHref}>← {backLabel}</a>
        <time class="view__date">{date}</time>
      </div>

      <div class="view__content">
        <h1 class="view__title">{title}</h1>
        {#if excerpt}
          <p class="view__excerpt">{excerpt}</p>
        {/if}
        {#if intro}
          <div class="view__intro">{@html intro}</div>
        {/if}
      </div>
    </header>
  {/if}

  <div class="view__board">
    <div class="view__tools">
      <button
        class="view__tool"
        onclick={() => (fullscreen = !fullscreen)}
        title={fullscreen ? exitFullscreenLabel : fullscreenLabel}
      >
        {fullscreen ? `✕ ${exitFullscreenLabel}` : `⛶ ${fullscreenLabel}`}
      </button>
    </div>
    <CanvasBoard {canvas} {nodesHtml} />
  </div>
</div>

<style lang="scss">
  .view {
    position: fixed;
    inset: 0;
    width: 100vw;
    height: 100dvh;
    z-index: 50;
    display: flex;
    flex-direction: column;
    background: #0d0f14;
    background: linear-gradient(
      0deg,
      rgba(2, 0, 36, 0.92) 0%,
      rgba(98, 9, 121, 0.92) 40%,
      rgba(76, 37, 185, 0.92) 100%
    );
  }

  .view__header {
    padding: 16px 28px;
    background: rgba(45, 45, 65, 0.9);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.12);
  }

  .view__topbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
    margin-bottom: 12px;
  }

  .view__back {
    font-family: 'Share Tech Mono', monospace;
    font-size: 13px;
    color: rgba(255, 255, 255, 0.7);
    text-decoration: none;
    &:hover { color: #00ff75; }
  }

  .view__date {
    font-family: 'Share Tech Mono', monospace;
    font-size: 13px;
    color: rgba(255, 255, 255, 0.6);
    white-space: nowrap;
  }

  /* Título | excerpt en una fila; intro debajo a todo el ancho */
  .view__content {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: baseline;
    column-gap: 24px;
    row-gap: 8px;
  }

  .view__title {
    grid-column: 1;
    font-family: 'Orbitron', sans-serif;
    font-size: clamp(1.2rem, 2.5vw, 1.8rem);
    color: #00ff75;
    line-height: 1.2;
    margin: 0;
  }

  .view__excerpt {
    grid-column: 2;
    font-family: 'Saira Condensed', sans-serif;
    font-style: italic;
    color: rgba(255, 255, 255, 0.7);
    font-size: 15px;
    line-height: 1.4;
    margin: 0;
  }

  .view__intro {
    grid-column: 1 / -1;
    font-family: 'Saira Condensed', sans-serif;
    color: rgba(255, 255, 255, 0.85);
    font-size: 15px;
    line-height: 1.5;
    max-height: 22vh;
    overflow-y: auto;

    :global(p) { margin: 0 0 8px; }
    :global(a) { color: #00ff75; }
    :global(h2), :global(h3) {
      font-family: 'Orbitron', sans-serif;
      color: #00ff75;
      font-size: 1rem;
      margin: 8px 0 4px;
    }
    :global(ul), :global(ol) { padding-left: 20px; margin: 0 0 8px; }
  }

  .view__board {
    position: relative;
    flex: 1;
    min-height: 0;
  }

  .view__tools {
    position: absolute;
    top: 12px;
    right: 12px;
    z-index: 10;
    display: flex;
    gap: 8px;
  }

  .view__tool {
    cursor: pointer;
    background: rgba(20, 22, 30, 0.85);
    color: #eaeaf0;
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 6px;
    padding: 6px 10px;
    font-family: 'Share Tech Mono', monospace;
    font-size: 12px;
    line-height: 1;
    &:hover {
      border-color: #00ff75;
      color: #00ff75;
    }
  }

  @media screen and (max-width: 640px) {
    .view__header { padding: 12px 16px; }
    .view__content {
      grid-template-columns: 1fr;
      row-gap: 6px;
    }
    .view__title,
    .view__excerpt { grid-column: 1; }
  }
</style>
