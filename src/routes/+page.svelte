<script lang="ts">
	import { Button } from 'flowbite-svelte';
	import Map from '$lib/Map.svelte';
	import Marker from '$lib/Marker.svelte';
	import Popup from '$lib/Popup.svelte';
</script>

<main class="flex-auto min-w-0 lg:static lg:max-h-full lg:overflow-visible">
	<p class="flex justify-center my-16">Sveaflet</p>
	<p class="flex justify-center my-8">Svelte components for Leaflet maps</p>

	<div class="flex justify-center my-8">
		<Button href="/docs/pages/introduction">Get Started</Button>
	</div>

	<div class="h-[500px] m-8">
		<Map
			options={{
				center: [51.505, -0.09],
				zoom: 13
			}}
		>
			<Marker latlng={[51.505, -0.09]}>
				<Popup
					options={{
						content: 'A pretty CSS popup.<br> Easily customizable.'
					}}
				></Popup>
			</Marker>
		</Map>
	</div>
</main>
