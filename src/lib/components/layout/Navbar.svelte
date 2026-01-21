<script lang="ts">
  import { t } from 'svelte-i18n';
  import ThemeToggle from './ThemeToggle.svelte';
  import LangSwitch from './LangSwitch.svelte';
  import { Button } from '$lib/components/ui/button';
  import { Menu, X } from 'lucide-svelte';

  let isMenuOpen = false;

  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
  }
</script>

<header class="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
  <div class="w-full max-w-none flex h-14 items-center gap-4 px-6 sm:px-12">
    <a href="/" class="flex items-center space-x-2 font-bold text-xl tracking-tight">
      <span>QoreDB</span>
    </a>
    
    <!-- Desktop Nav -->
    <nav class="flex-1 items-center space-x-6 text-sm font-medium hidden md:flex">
      <a href="#features" class="transition-colors hover:text-foreground/80 text-foreground/60">{$t('nav.features')}</a>
      <a href="/roadmap" class="transition-colors hover:text-foreground/80 text-foreground/60">{$t('nav.roadmap')}</a>
      <a href="/docs" class="transition-colors hover:text-foreground/80 text-foreground/60">{$t('nav.docs')}</a>
    </nav>
    
    <div class="flex items-center space-x-2 ml-auto">
        <a href="#download" class="hidden sm:inline-flex">
            <Button size="sm">{$t('nav.download')}</Button>
        </a>
      <ThemeToggle />
      <LangSwitch />
      
      <!-- Mobile Menu Toggle -->
      <Button variant="ghost" size="icon" class="md:hidden" onclick={toggleMenu}>
        {#if isMenuOpen}
            <X class="h-5 w-5" />
        {:else}
            <Menu class="h-5 w-5" />
        {/if}
      </Button>
    </div>
  </div>

  <!-- Mobile Menu Overlay -->
  {#if isMenuOpen}
    <div class="md:hidden border-t bg-background p-4 absolute w-full left-0 top-14 flex flex-col gap-4 shadow-xl animate-in slide-in-from-top-2">
      <nav class="flex flex-col space-y-4">
        <a href="#features" class="text-sm font-medium transition-colors hover:text-primary" onclick={() => isMenuOpen = false}>{$t('nav.features')}</a>
        <a href="/roadmap" class="text-sm font-medium transition-colors hover:text-primary" onclick={() => isMenuOpen = false}>{$t('nav.roadmap')}</a>
        <a href="/docs" class="text-sm font-medium transition-colors hover:text-primary" onclick={() => isMenuOpen = false}>{$t('nav.docs')}</a>
        <a href="#download" onclick={() => isMenuOpen = false}>
            <Button size="sm" class="w-full">{$t('nav.download')}</Button>
        </a>
      </nav>
    </div>
  {/if}
</header>
