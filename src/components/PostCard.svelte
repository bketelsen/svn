<script>
  import { DateTime } from "luxon";
  export let page;
  export let list;
  const adate = DateTime.fromISO(page.date).toLocaleString();
</script>

<div class="col-6">
  <div class="card">
    <header>
      <h3>{page.title}</h3>
      <small>{adate}</small>
    </header>
    <p>{page.description}</p>

    <p>
      {#each page.tags as tag}<span class="tag is-small">{tag}</span>{/each}
    </p>
    <footer class="is-right">
      <a class="button primary" href="/{list}/{page.slug}">Read More</a>
    </footer>
  </div>
</div>
