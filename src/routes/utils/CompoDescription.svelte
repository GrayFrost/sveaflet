<script lang="ts">
  interface Props {
    pClass?: string;
    children?: import('svelte').Snippet;
  }

  let { pClass = 'text-lg text-gray-600 dark:text-gray-400', children }: Props = $props();
</script>

<p class={pClass}>
  {@render children?.()}
</p>