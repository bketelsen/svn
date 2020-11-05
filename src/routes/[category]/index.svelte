<script context="module">
  const valid_lists = new Set(["blog", "projects", "lpt"]);

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
  import PostCard from "$components/PostCard";
  export let list;
  export let pages;
</script>

<h3 class="text-uppercase">{list}</h3>
<div class="row">
  {#each pages as page}
    <PostCard {page} {list} />
  {/each}
</div>
