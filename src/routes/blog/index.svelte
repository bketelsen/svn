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

{#each pages as page}
  <h3><a href="/blog/{page.slug}">{page.title}</a></h3>
{/each}
