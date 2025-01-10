<script lang="ts">
	import type { Snippet } from 'svelte';
  import Anchor from './Anchor.svelte';
  interface Props {
    children?: Snippet;
  }

  let { children }: Props = $props();
</script>

<Anchor tag="h3" class="text-gray-900 dark:text-white leading-tight text-xl font-bold">{@render children?.()}</Anchor>
