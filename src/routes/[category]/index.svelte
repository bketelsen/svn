<script context="module">
  const valid_lists = new Set(["blog", "projects", "lpt", "pages"]);

  export async function preload({ params }) {
    const list = params.category;

    if (!valid_lists.has(list)) {
      console.log("invalid");
      this.error(404, "Not found");
      return;
    }

    const res = await this.fetch(`/content.json`);
    const items = await res.json();

    const allpages = items.data;
    const pages = allpages.filter((item) => item.section === list);

    pages.sort(function (a, b) {
      let adate = Date.parse(a.date);
      let bdate = Date.parse(b.date);
      if (adate > bdate) return -1;
      if (adate < bdate) return 1;
      return 0;
    });
    return {
      list,
      pages,
    };
  }
</script>

<script>
  import FeaturedArticle from "$components/FeaturedArticle.svelte";
  export let list;
  export let pages;
</script>

<svelte:head>
  <meta
    name="description"
    content="Brian Ketelsen's blog, with articles about cloud computing, web assembly, open source and more." />
</svelte:head>
{#each pages as page}
  <FeaturedArticle {page} />
{/each}
