<script lang="ts">
  import { MetaTags } from 'svelte-meta-tags';
 
  interface Props {
    breadcrumb_title?: string;
    description?: string;
    title?: string;
    dir?: string;
  }

  let {
    breadcrumb_title = '',
    description = '',
    title = '',
    dir = ''
  }: Props = $props();
  let dirstring = dir.toLowerCase();
  let breadcrumb = breadcrumb_title.toLowerCase().replaceAll(' ', '-');
</script>

<MetaTags
  title={title}
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
