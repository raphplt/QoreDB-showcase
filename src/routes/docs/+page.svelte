<script lang="ts">
  import { t } from 'svelte-i18n';
  import { Book, Code, TerminalSquare } from 'lucide-svelte';
</script>

<div class="w-full max-w-none py-24 px-6 sm:px-12">
  <div class="text-center mx-auto mb-16">
    <h1 class="text-4xl font-extrabold tracking-tight mb-6">Documentation</h1>
    <p class="text-xl text-muted-foreground">
      Everything you need to master QoreDB.
    </p>
  </div>

  <div class="grid gap-6 md:grid-cols-3 mx-auto">
    <a href="/docs/getting-started" class="group block p-8 rounded-2xl border bg-card hover:border-primary/50 transition-all hover:shadow-lg">
      <Book class="h-8 w-8 mb-4 text-primary" />
      <h3 class="text-xl font-bold mb-2 group-hover:text-primary transition-colors">Getting Started</h3>
      <p class="text-muted-foreground">Installation, initial setup, and your first connection.</p>
    </a>

    <a href="/docs/guides" class="group block p-8 rounded-2xl border bg-card hover:border-primary/50 transition-all hover:shadow-lg">
        <Code class="h-8 w-8 mb-4 text-primary" />
        <h3 class="text-xl font-bold mb-2 group-hover:text-primary transition-colors">User Guides</h3>
        <p class="text-muted-foreground">Deep dives into Query Editor, Visualizer, and Vault.</p>
      </a>

      <a href="/docs/api" class="group block p-8 rounded-2xl border bg-card hover:border-primary/50 transition-all hover:shadow-lg">
        <TerminalSquare class="h-8 w-8 mb-4 text-primary" />
        <h3 class="text-xl font-bold mb-2 group-hover:text-primary transition-colors">Power User API</h3>
        <p class="text-muted-foreground">Shortcuts, command palette reference, and config files.</p>
      </a>
  </div>
</div>
