<script lang="ts">
  import type { NodeProps } from '@xyflow/svelte'
  import type { FlowNodeData } from '@/lib/canvas-to-flow'

  let { data }: NodeProps = $props()
  const d = data as FlowNodeData
</script>

<div class="cgroup" style:--accent={d.color ?? 'var(--canvas-default-accent)'}>
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
</style>
