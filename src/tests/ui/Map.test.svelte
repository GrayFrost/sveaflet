<script>
	import { Map } from 'sveaflet';

	export let instanceStore;
	export let options = {};
</script>

<div style="width:500px;height:500px;">
	<Map bind:instance={$instanceStore} {options}></Map>
</div>
