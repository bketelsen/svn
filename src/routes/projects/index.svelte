<script context="module">
  export const prerender = "true";
  import data from "$components/content.json";
  export async function preload({ params }) {
    const allpages = data.data;
    const pages = allpages.filter((item) => item.section === "Projects");

    return { pages };
  }
</script>

<script>
  export let pages;
</script>

<h1>Featured Projects</h1>

<div class="row">
  {#each pages as page}
    <div class="col-4">
      <div class="card">
        <header>
          <h4>{page.title}</h4>
        </header>
        <p>{page.description}</p>
        <footer class="is-right">
          <a class="button primary" href="/projects/{page.slug}">Read More</a>
        </footer>
      </div>
    </div>
  {/each}
</div>
