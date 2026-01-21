<script lang="ts">
  import { t } from 'svelte-i18n';
  import { CheckCircle2, Circle, CircleDashed } from 'lucide-svelte';
</script>

<section class="w-full max-w-none py-24 px-6 sm:px-12 mx-auto">
  <div class="mb-16">
    <h1 class="text-4xl font-extrabold tracking-tight sm:text-5xl mb-6">Product Roadmap</h1>
    <p class="text-xl text-muted-foreground">
      Our journey to build the ultimate database client.
    </p>
  </div>

  <div class="relative pl-8 border-l border-border space-y-12">
    <!-- V1 -->
    <div class="relative">
      <div class="absolute -left-[41px] flex h-5 w-5 items-center justify-center rounded-full bg-primary ring-4 ring-background">
        <CheckCircle2 class="h-3.5 w-3.5 text-primary-foreground" />
      </div>
      <div class="mb-2 flex items-center gap-2">
        <span class="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">V1: The Daily Driver</span>
        <span class="text-sm text-muted-foreground">Released</span>
      </div>
      <h3 class="text-2xl font-bold mb-4">Core Stability & Essentials</h3>
      <ul class="space-y-3 text-muted-foreground">
        <li class="flex gap-2">
            <CheckCircle2 class="h-5 w-5 text-green-500 shrink-0" /> Unified Engine (Postgres, MySQL, Mongo)
        </li>
        <li class="flex gap-2">
             <CheckCircle2 class="h-5 w-5 text-green-500 shrink-0" /> Local-first Vault security
        </li>
        <li class="flex gap-2">
             <CheckCircle2 class="h-5 w-5 text-green-500 shrink-0" /> Advanced Table Editor
        </li>
      </ul>
    </div>

    <!-- V2 -->
    <div class="relative">
        <div class="absolute -left-[41px] flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 ring-4 ring-background">
          <CircleDashed class="h-3.5 w-3.5 text-white animate-spin-slow" />
        </div>
        <div class="mb-2 flex items-center gap-2">
          <span class="rounded-full bg-blue-500/10 px-2.5 py-0.5 text-xs font-semibold text-blue-600 dark:text-blue-400">V2: Power User</span>
          <span class="text-sm text-muted-foreground">In Progress</span>
        </div>
        <h3 class="text-2xl font-bold mb-4">Intelligence & Visualization</h3>
        <ul class="space-y-3 text-muted-foreground">
          <li class="flex gap-2">
              <Circle class="h-5 w-5 opacity-50 shrink-0" /> AI Query Assistant (Context-aware)
          </li>
          <li class="flex gap-2">
               <Circle class="h-5 w-5 opacity-50 shrink-0" /> Visual Schema Builder
          </li>
          <li class="flex gap-2">
               <Circle class="h-5 w-5 opacity-50 shrink-0" /> Database Compare & Diff
          </li>
        </ul>
      </div>

       <!-- V3 -->
    <div class="relative">
        <div class="absolute -left-[41px] flex h-5 w-5 items-center justify-center rounded-full bg-muted ring-4 ring-background">
          <Circle class="h-3.5 w-3.5 text-muted-foreground" />
        </div>
        <div class="mb-2 flex items-center gap-2">
          <span class="rounded-full bg-muted px-2.5 py-0.5 text-xs font-semibold text-muted-foreground">V3: Collaboration</span>
          <span class="text-sm text-muted-foreground">Planned</span>
        </div>
        <h3 class="text-2xl font-bold mb-4">Team & Cloud</h3>
        <ul class="space-y-3 text-muted-foreground">
          <li class="flex gap-2">
              <Circle class="h-5 w-5 opacity-50 shrink-0" /> Shared Queries & Snippets
          </li>
          <li class="flex gap-2">
               <Circle class="h-5 w-5 opacity-50 shrink-0" /> Team Permissions
          </li>
        </ul>
      </div>

  </div>
</section>
