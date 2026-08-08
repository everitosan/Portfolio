<script lang="ts">
  import { Handle, Position, type NodeProps } from '@xyflow/svelte'
  import type { FlowNodeData } from '@/lib/canvas-to-flow'

  let { data }: NodeProps = $props()
  const d = data as FlowNodeData

  const sides = [
    { pos: Position.Top, id: 'top' },
    { pos: Position.Right, id: 'right' },
    { pos: Position.Bottom, id: 'bottom' },
    { pos: Position.Left, id: 'left' },
  ]
</script>

<div class="cgroup" style:--accent={d.color ?? 'var(--canvas-default-accent)'}>
  {#each sides as s}
    <Handle type="target" position={s.pos} id={s.id} isConnectable={false} />
    <Handle type="source" position={s.pos} id={s.id} isConnectable={false} />
  {/each}

  {#if d.label}
    <span class="cgroup__label">{d.label}</span>
  {/if}
</div>

<style lang="scss">
  .cgroup {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    border: 1px solid var(--accent);
    border-radius: 8px;
    background: rgba(125, 130, 150, 0.05);
  }

  .cgroup__label {
    position: absolute;
    top: -12px;
    left: 12px;
    padding: 2px 10px;
    border-radius: 5px;
    background: var(--node-bg, #2c313c);
    border: 1px solid var(--accent);
    font-family: var(--node-font, sans-serif);
    font-size: 13px;
    color: var(--node-text, #dadada);
  }

  /* Handles invisibles (diagrama de solo lectura), solo sirven de ancla
     para que las aristas card→grupo encuentren su punto de conexión. */
  .cgroup :global(.svelte-flow__handle) {
    opacity: 0;
    pointer-events: none;
  }
</style>
