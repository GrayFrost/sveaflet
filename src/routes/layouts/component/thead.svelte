<script lang="ts">
  interface Props {
    children?: import('svelte').Snippet;
  }

  let { children }: Props = $props();
</script>


<thead class="bg-slate-50 dark:bg-slate-700">
  {@render children?.()}
</thead>