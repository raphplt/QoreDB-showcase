<script lang="ts">
  import { t } from 'svelte-i18n';
  import { Button } from '$lib/components/ui/button';
  import { ArrowRight } from 'lucide-svelte';
</script>

<section class="w-full max-w-none flex flex-col items-center gap-8 py-24 text-center md:py-32 px-6 sm:px-12">
    <div class="inline-flex items-center rounded-full border bg-muted/50 px-3 py-1 text-sm text-foreground/80 backdrop-blur-xl">
        <span class="mr-2 h-2 w-2 rounded-full bg-primary/60"></span>
        {$t('hero.badge')}
    </div>
    <div>
        <h1 class="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-br from-foreground to-foreground/70 pb-4">
            {$t('hero.title')}
        </h1>
        <p class="mx-auto mt-4 text-lg text-muted-foreground sm:text-xl">
            {$t('hero.subtitle')}
        </p>
    </div>
    <div class="flex flex-col gap-4 sm:flex-row mt-4">
        <Button size="lg" class="h-12 px-8 text-base shadow-lg shadow-primary/20">
            {$t('hero.cta_primary')}
            <ArrowRight class="ml-2 h-4 w-4" />
        </Button>
        <Button size="lg" variant="outline" class="h-12 px-8 text-base">
            {$t('hero.cta_secondary')}
        </Button>
    </div>
    
    <!-- Optional: Add a visual element here like a dashboard preview image -->
    <div class="mt-16 relative rounded-xl border bg-background/50 shadow-2xl overflow-hidden aspect-[16/9] w-full group">
        <div class="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div class="flex h-full items-center justify-center text-muted-foreground/30 bg-muted/20">
             <!-- Placeholder for App Screenshot -->
             <span class="font-mono text-sm">App Screenshot Placeholder</span>
        </div>
    </div>
</section>
