<script>
  import Nav from "$components/Nav.svelte";
  import Footer from "$components/Footer.svelte";
  import data from "$components/content.json";
  export let segment;
</script>

<style>
  .container {
    max-width: 720px;
  }
</style>

<div class="container">
  <Nav {segment} {data} />
  <main>
    <slot />
  </main>
  <Footer />
</div>
