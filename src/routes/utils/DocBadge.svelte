<script lang="ts">
	import { Badge } from 'flowbite-svelte';
	interface Props {
		children?: import('svelte').Snippet;
		[key: string]: any
	}

	let { ...props }: Props = $props();
</script>

<Badge
	color="none"
	{...props}
	class="bg-primary-100 text-primary-700 dark:bg-gray-700 dark:text-primary-700 border-primary-700 dark:border-primary-700 {props.class}"
>
	{@render props.children?.()}
</Badge>
