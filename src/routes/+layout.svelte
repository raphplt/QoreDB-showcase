<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
    import Navbar from '$lib/components/layout/Navbar.svelte';
    import Footer from '$lib/components/layout/Footer.svelte';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<div class="flex min-h-screen flex-col">
    <Navbar />
    <main class="flex-1">
        {@render children()}
    </main>
    <Footer />
</div>
