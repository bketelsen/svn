<script>
  export let segment;
</script>

<nav class="nav">
  <div class="nav-left">
    <a class="brand" href="/">Brian Ketelsen</a>
    <a class={segment === 'yourmom' ? 'active' : ''} href="/yourmom">blog</a>
    <a class={segment === 'mymom' ? 'active' : ''} href="/mymom">projects</a>
  </div>
  <div class="nav-right"><a href="https://github.com/bketelsen">GitHub</a></div>
</nav>
