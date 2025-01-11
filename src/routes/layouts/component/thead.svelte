<script lang="ts">
	import type { Snippet } from "svelte";

  interface Props {
    children?: Snippet;
  }

  let { children }: Props = $props();
</script>


<thead class="bg-slate-50 dark:bg-slate-700">
  {@render children?.()}
</thead>
