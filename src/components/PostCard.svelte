<script>
  import { DateTime } from "luxon";
  export let page;
  export let list;
  const adate = DateTime.fromISO(page.date).toLocaleString();
</script>

<style>
  .grid-container {
    display: grid;
    grid-template-columns: auto auto auto;
    grid-gap: 5px;
    padding: 10px;
    width: 350px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }

  .grid-container > div {
    text-align: center;
    padding: 5px 5;
  }

  .title {
    grid-column: 1 / 3;
    grid-row: 1;
  }
  .title h3 {
    border: none;
  }
  .description {
    grid-row: 2;
    grid-column: 1/3;
  }

  .date {
    grid-column: 1;
    grid-row: 3;
  }
  .more {
    grid-column: 2;
    grid-row: 3;
  }
</style>

<div class="grid-container">
  <div class="title">
    <h3>{page.title}</h3>
  </div>
  <div class="description">{page.description}</div>
  <div class="date">{adate}</div>
  <div class="more"><a href="/{list}/{page.slug}">Read More</a></div>
</div>
