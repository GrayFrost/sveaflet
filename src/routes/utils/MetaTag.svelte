<script lang="ts">
  import { MetaTags } from 'svelte-meta-tags';
  export let breadcrumb_title: string = '';
  export let description: string = '';
  export let title: string = '';
 
  export let dir: string = '';
  let dirstring = dir.toLowerCase();
  let breadcrumb = breadcrumb_title.toLowerCase().replaceAll(' ', '-');
</script>

<MetaTags
  title={breadcrumb_title}
  titleTemplate="%s - Sveaflet"
  {description}

  openGraph={{
    type: 'website',
    url: `https://sveaflet.vercel.app/${dirstring}/${breadcrumb}`,
    title: `${title}`,
    description: `${description}`,
    siteName: 'Sveaflet'
  }}
/>
