<script lang="ts">
  import { browser } from '$app/environment';
  import { onMount } from 'svelte';
  import docsearch from '@docsearch/js';
  import '@docsearch/css';

  interface Props {
    appId: string;
    apiKey: string;
  }

  let { appId, apiKey }: Props = $props();

  let searchContainer: HTMLElement | string = $state('');

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

<div bind:this={searchContainer} id="docsearch" class="ms-3 xl:ps-4"></div>
