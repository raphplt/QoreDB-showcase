<script lang="ts">
  import { t } from 'svelte-i18n';
  import { Shield, Database, Brain } from 'lucide-svelte';
</script>

<section class="w-full max-w-none py-16 md:py-24 px-6 sm:px-12">
  <div class="grid gap-8 md:grid-cols-3">
    <!-- Local First -->
    <div class="group rounded-2xl border bg-card p-8 shadow-sm transition-all hover:shadow-md hover:border-primary/20">
      <div class="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
        <Shield class="h-6 w-6" />
      </div>
      <h3 class="mb-2 text-xl font-bold tracking-tight">{$t('pillars.local.title')}</h3>
      <p class="text-muted-foreground">{$t('pillars.local.desc')}</p>
    </div>

    <!-- Unified Engine -->
    <div class="group rounded-2xl border bg-card p-8 shadow-sm transition-all hover:shadow-md hover:border-primary/20">
      <div class="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
        <Database class="h-6 w-6" />
      </div>
      <h3 class="mb-2 text-xl font-bold tracking-tight">{$t('pillars.unified.title')}</h3>
      <p class="text-muted-foreground">{$t('pillars.unified.desc')}</p>
    </div>

    <!-- AI Powered -->
    <div class="group rounded-2xl border bg-card p-8 shadow-sm transition-all hover:shadow-md hover:border-primary/20">
      <div class="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
        <Brain class="h-6 w-6" />
      </div>
      <h3 class="mb-2 text-xl font-bold tracking-tight">{$t('pillars.ai.title')}</h3>
      <p class="text-muted-foreground">{$t('pillars.ai.desc')}</p>
    </div>
  </div>
</section>
