<script>
  import Nav from "$components/Nav.svelte";
  import Footer from "$components/Footer.svelte";

  export let segment;
</script>

<div class="container">
  <Nav {segment} />
  <main>
    <slot />
  </main>
  <Footer />
</div>
