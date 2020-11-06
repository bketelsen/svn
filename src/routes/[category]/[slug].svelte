<script context="module">
  const valid_lists = new Set(["blog", "projects", "lpt", "pages"]);

  export async function preload({ params }) {
    const list = params.category;
    const slug = params.slug;
    if (!valid_lists.has(list)) {
      console.log("invalid");
      this.error(404, "Not found");
      return;
    }

    const res = await this.fetch(`/content.json`);
    const items = await res.json();
    const allpages = items.data;
    const pages = allpages.filter(
      (item) => item.section === list && item.slug === slug
    );
    if (pages.length < 1) {
      this.error(404, "Not found");
      return;
    }
    return {
      pages,
    };
  }
</script>

<script>
  export let pages;
  const page = pages[0];
</script>

<svelte:head>
  <meta name="description" content={page.description} />
  <meta property="og:locale" content="en_US" />
  <meta property="og:type" content="article" />
  <meta property="og:title" content={page.title} />
  <meta property="og:description" content={page.description} />
  <meta property="og:url" content="http://www.yoursite.com/yourcontent.html" />
  <meta property="og:site_name" content="Brian Ketelsen" />
  <meta property="og:image" content="http://www.yoursite.com/yourimage.jpg" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={page.title} />
  <meta name="twitter:description" content={page.title} />
  <meta name="twitter:site" content="@bketelsen" />
  <meta name="twitter:image" content="http://www.yoursite.com/yourimage.jpg" />
  <meta name="twitter:creator" content="@bketelsen" />
</svelte:head>
<h2>{page.title}</h2>
<div class="container">
  {@html page.contents}
</div>
