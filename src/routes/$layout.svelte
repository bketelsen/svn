<script>
  import Sidebar from "$components/Sidebar.svelte";
  import Header from "$components/Header.svelte";
  import Nav from "$components/Nav.svelte";
  import Footer from "$components/Footer.svelte";
  export let segment;
</script>

<style>
</style>

<Header />
<Nav {segment} />
<div class="row">
  <Sidebar />
  <div class="main">
    <slot />
  </div>
</div>
<!-- Footer -->

<Footer />
