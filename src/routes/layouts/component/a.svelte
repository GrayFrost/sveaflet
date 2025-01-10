<script lang="ts">
	interface Props {
		children?: import('svelte').Snippet;
		[key: string]: any
	}

	let { ...props }: Props = $props();
</script>

<a class="text-primary-700" href="/" {...props}>{@render props.children?.()}</a>