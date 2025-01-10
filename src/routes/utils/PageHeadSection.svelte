<script lang="ts">
  import { Heading } from 'flowbite-svelte';
  import CompoDescription from './CompoDescription.svelte';

  interface Props {
    dir: string;
    title: string;
    description: string;
  }

  let { dir, title, description }: Props = $props();

  dir;
</script>

<div class="pb-8">
  <Heading class="inline-block mb-2 font-extrabold tracking-tight text-gray-900 dark:text-white" tag="h1" customSize="text-3xl">
    {title}
  </Heading>

  <CompoDescription>{description}</CompoDescription>
</div>
