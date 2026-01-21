<script lang="ts">
  import Hero from '$lib/components/home/Hero.svelte';
  import ProductPillars from '$lib/components/home/ProductPillars.svelte';
  import FeaturesGrid from '$lib/components/home/FeaturesGrid.svelte';
  import DownloadSection from '$lib/components/home/DownloadSection.svelte';
</script>

<svelte:head>
  <title>QoreDB - The Linear for databases</title>
  <meta name="description" content="A unified, local-first database client designed for speed and security." />
</svelte:head>

<div class="flex flex-col gap-10">
    <Hero />
    <ProductPillars />
    <FeaturesGrid />
    <DownloadSection />
</div>
