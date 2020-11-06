<script>
  import Sidebar from "$components/Sidebar.svelte";
  import Header from "$components/Header.svelte";
  import Nav from "$components/Nav.svelte";
  import Footer from "$components/Footer.svelte";

  import "$components/css/resp.scss";
  export let segment;
</script>

<style>
</style>

<!-- Header -->
<Header />
<!-- Navigation Bar -->
<Nav />
<!-- The flexible grid (content) -->
<div class="row">
  <Sidebar />
  <div class="main">
    <slot />
  </div>
</div>

<!-- Footer -->
<Footer />
