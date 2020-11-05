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

<svelte:head>
  <meta property="og:locale" content="en_US" />
  <meta property="og:type" content="article" />
  <meta property="og:title" content={page.title} />
  <meta property="og:description" content={page.description} />
  <meta property="og:url" content="http://www.yoursite.com/yourcontent.html" />
  <meta property="og:site_name" content="Brian Ketelsen" />
  <meta property="og:image" content="http://www.yoursite.com/yourimage.jpg" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={page.title} />
  <meta name="twitter:description" content={page.description} />
  <meta name="twitter:site" content="@bketelsen" />
  <meta name="twitter:image" content="http://www.yoursite.com/yourimage.jpg" />
  <meta name="twitter:creator" content="@bketelsen" />
  <title>{page.title}</title>
  <meta name="description" content={page.description} />
</svelte:head>

<h1>{page.title}</h1>
{@html page.contents}
