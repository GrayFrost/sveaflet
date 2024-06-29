<script lang="ts">
	import { MetaTags } from 'svelte-meta-tags';
	import { Button } from 'flowbite-svelte';
	import type { Marker as MarkerType } from 'leaflet';
	import Map from '$lib/SMap.svelte';
	import TileLayer from '$lib/STileLayer.svelte';
	import Marker from '$lib/SMarker.svelte';
	import Popup from '$lib/SPopup.svelte';
	import Footer from './utils/Footer.svelte';

	let logo = '/images/sveaflet.png';
	let marker: MarkerType;

	$: if (marker) {
		marker.openPopup();
	}

	let title = 'Sveaflet - Leaflet Component Library';
	let description =
		'Sveaflet is an open-source Map component library built with Svelte components and Leaflet that can help you build your map page faster.';
</script>

<MetaTags
	{title}
	{description}
	openGraph={{
		type: 'website',
		url: `https://sveaflet.vercel.app/`,
		title: `${title}`,
		description: `${description}`,
		siteName: 'Sveaflet'
	}}
/>

<main class="flex-auto min-w-0 lg:static lg:max-h-full lg:overflow-visible">
	<div class="flex justify-center items-center mx-auto my-8 relative w-[240px] h-[200px]">
		<img src={logo} alt="logo" class="w-full h-full" />
	</div>
	<p class="flex justify-center my-8">Harness the power of Leaflet in Svelte</p>

	<div class="flex justify-center my-8">
		<Button href="/docs/pages/introduction">Get Started</Button>
	</div>

	<div
		class="h-[320px] px-4 lg:h-[500px] lg:px-20 md:h-[320px] md:px-10 my-8 mx-auto max-w-[90rem] py-8"
	>
		<Map
			options={{
				center: [51.505, -0.09],
				zoom: 13
			}}
		>
			<TileLayer url={'https://tile.openstreetmap.org/{z}/{x}/{y}.png'} />
			<Marker latlng={[51.505, -0.09]} bind:instance={marker}>
				<Popup
					options={{
						content: 'Hello Sveaflet.'
					}}
				></Popup>
			</Marker>
		</Map>
	</div>
	<Footer />
</main>
