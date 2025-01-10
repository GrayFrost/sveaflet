<script lang="ts">
	import type { Snippet } from "svelte";

	interface Props {
		children?: Snippet;
	}

	let { children }: Props = $props();
</script>

<td class="border border-slate-300 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">
	{@render children?.()}
</td>
