<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		children?: Snippet;
		[key: string]: any;
	}

	let { ...props }: Props = $props();
</script>

<a class="text-primary-700" href="/" {...props}>{@render props.children?.()}</a>
