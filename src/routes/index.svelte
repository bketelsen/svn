<script context="module">
  export async function preload({ params }) {
    const res = await this.fetch(`/content.json`);
    const items = await res.json();

    const allpages = items.data;
    const pages = allpages.filter((item) => item.featured === true);

    pages.sort(function (a, b) {
      let adate = Date.parse(a.date);
      let bdate = Date.parse(b.date);
      if (adate > bdate) return -1;
      if (adate < bdate) return 1;
      return 0;
    });
    return {
      pages,
    };
  }
</script>

<script>
  import FeaturedArticle from "$components/FeaturedArticle.svelte";
  export let pages;
</script>

<svelte:head>
  <meta
    name="description"
    content="Brian Ketelsen's blog, with articles about cloud computing, web assembly, open source and more." />
</svelte:head>

<h2>Featured Articles</h2>
{#each pages as page}
  <FeaturedArticle {page} />
{/each}
