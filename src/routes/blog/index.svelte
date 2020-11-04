<script context="module">
  export const prerender = "true";
  import data from "$components/content.json";
  export async function preload({ params }) {
    const pages = data.data;
    return { pages };
  }
</script>

<script>
  export let pages;
</script>

<div class="row">
  {#each pages as page}
    <div class="col-4">
      <div class="card">
        <header>
          <h4>{page.title}</h4>
        </header>
        <p>{page.description}</p>
        <footer class="is-right">
          <a class="button primary" href="/blog/{page.slug}">Read More</a>
        </footer>
      </div>
    </div>
  {/each}
</div>
