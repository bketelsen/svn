<script>
  import { DateTime } from "luxon";
  export let page;
  const adate = DateTime.fromISO(page.date).toLocaleString();
</script>

<style>
</style>

<h2><a href="/{page.section}/{page.slug}">{page.title}</a></h2>
<h5>Title description, {adate}</h5>
<div class="fakeimg" style="height:200px;">Image</div>

<p>{page.description}</p>
<br />
