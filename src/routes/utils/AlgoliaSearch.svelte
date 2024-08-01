<script lang="ts">
  import { browser } from '$app/environment';
  import { onMount } from 'svelte';
  import docsearch from '@docsearch/js';
  import '@docsearch/css';

	export let appId: string;
	export let apiKey: string;

  let searchContainer: HTMLElement;

  onMount(() => {
    if (browser) {
      // Algolia docsearch
      docsearch({
        container: searchContainer,
        appId,
        indexName: 'sveaflet',
        apiKey,
        placeholder: 'Search documentation'
      });
    }
  });
</script>

<div bind:this={searchContainer} id="docsearch" class="ms-3 xl:ps-4" />
