<script context="module">
  const valid_lists = new Set(["blog", "projects", "lpt"]);

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
    console.log(slug);
    const allpages = items.data;
    const pages = allpages.filter(
      (item) => item.section === list && item.slug === slug
    );
    if (pages.length < 1) {
      this.error(404, "Not found");
      return;
    }
    return {
      list,
      pages,
    };
  }
</script>

<script>
  export let pages;
  const page = pages[0];
</script>

<h2>{page.title}</h2>
<div class="container">
  {@html page.contents}
</div>
