<script lang="ts">
  import { onMount } from 'svelte';
  import { Sun, Moon } from 'lucide-svelte';
  import { Button } from '$lib/components/ui/button';

  let theme = 'light';

  function toggleTheme() {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  }

  function setTheme(t: string) {
    theme = t;
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', theme);
      if (theme === 'dark') {
		    document.documentElement.classList.add('dark');
	    } else {
		    document.documentElement.classList.remove('dark');
	    }
      localStorage.setItem('theme', theme);
    }
  }

  onMount(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  });
</script>

<Button variant="ghost" size="icon" onclick={toggleTheme} aria-label="Toggle theme">
  {#if theme === 'light'}
    <Sun class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
  {:else}
    <Moon class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
  {/if}
</Button>
