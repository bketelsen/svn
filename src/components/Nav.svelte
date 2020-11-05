<script>
  export let segment;
  export let pages;
</script>

<nav class="nav">
  <div class="nav-left">
    <a class="brnd" href="/">Brian Ketelsen</a>
    <a class={segment === 'blog' ? 'active' : ''} href="/blog">blog</a>
    <a class={segment === 'mymom' ? 'active' : ''} href="/projects">projects</a>
  </div>
  <div class="nav-right"><a href="https://github.com/bketelsen">GitHub</a></div>
</nav>
