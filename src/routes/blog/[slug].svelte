<script context="module">
  export const prerender = "true";
  import data from "$components/content.json";
  export async function preload({ params }) {
    const pages = data.data;
    let result = pages.filter((page) => page.slug == params.slug);
    if (result.length < 1) {
      return {};
    }
    return { page: result[0] };
  }
</script>

<script>
  export let page;
</script>

<h1>{page.title}</h1>
{@html page.contents}
