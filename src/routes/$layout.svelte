<script context="module">
  export async function preload({ params }) {
    const res = await this.fetch(`/content.json`);
    const items = await res.json();

    const pages = items.data;
    return {
      pages,
    };
  }
</script>

<script>
  import Nav from "$components/Nav.svelte";
  import Footer from "$components/Footer.svelte";
  export let segment;
  export let pages;
</script>

<style>
  .container {
    max-width: 720px;
  }
</style>

<div class="container">
  <Nav {segment} {pages} />
  <main>
    <slot />
  </main>
  <Footer />
</div>
