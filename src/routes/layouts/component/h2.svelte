<script lang="ts">
  import Anchor from './Anchor.svelte';
  interface Props {
    children?: import('svelte').Snippet;
  }

  let { children }: Props = $props();
</script>

<Anchor tag="h2" class="text-gray-900 dark:text-white leading-tight text-2xl font-bold">{@render children?.()}</Anchor>
