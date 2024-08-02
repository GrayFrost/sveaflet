<script>
  export let name

  let showGreeting = false

  const handleClick = () => (showGreeting = true)
</script>

<button on:click="{handleClick}">Greet</button>

{#if showGreeting}
<p>Hello {name}</p>
{/if}
