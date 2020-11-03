<script>
	import Counter from '$components/Counter.svelte';
</script>

<main>
    <div><a href="/yourmom">Your Mom</a> | <a href="/mymom">My Mom</a></div>
    <slot></slot>
    <div><a href="/">Home</a></div>
</main>

<style>
	:root {
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
	}

	main {
		text-align: center;
		padding: 1em;
		margin: 0 auto;
	}



	@media (min-width: 480px) {
		h1 {
			max-width: none;
		}

		p {
			max-width: none;
		}
	}
</style>