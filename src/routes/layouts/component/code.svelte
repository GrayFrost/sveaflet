<script lang="ts">
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();
</script>

<code class="text-primary-700 dark:text-primary-700">{@render children?.()}</code>
