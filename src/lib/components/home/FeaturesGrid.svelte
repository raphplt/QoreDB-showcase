<script lang="ts">
  import { t } from 'svelte-i18n';
  import { Lock, Cpu, Command, Table, Terminal, Globe } from 'lucide-svelte';

  const features = [
    {
      icon: Lock,
      title: 'Vault Security',
      desc: 'System-level keyring storage encrypted with Argon2. Credentials never touch disk in plain text.'
    },
    {
      icon: Terminal,
      title: 'SSH Tunneling',
      desc: 'Native support for SSH tunnels. Connect to your production databases securely without external tools.'
    },
    {
      icon: Command,
      title: 'Command Palette',
      desc: 'Navigate everything with Cmd+K. Search connections, history, and execute commands instantly.'
    },
    {
      icon: Table,
      title: 'Smart Data Grid',
      desc: 'High-performance virtualized grid for massive datasets. Filter, sort, and edit inline with zero lag.'
    },
    {
        icon: Globe,
        title: 'Environment Safety',
        desc: 'Visual safety guards for Production vs Development environments. Never drop a prod table by accident.'
    },
    {
        icon: Cpu,
        title: 'Native Performance',
        desc: 'Written in Rust (Tauri). Starts instanty, uses minimal RAM, and feels native on your OS.'
    }
  ];
</script>

<section id="features" class="w-full max-w-none py-24 px-6 sm:px-12 bg-muted/30 rounded-3xl my-18">
  <div class="mb-16 text-center">
    <h2 class="text-3xl font-bold tracking-tight sm:text-4xl mb-4">{$t('nav.features')}</h2>
    <p class="text-muted-foreground mx-auto text-lg">
      Built for developers who care about their tools.
    </p>
  </div>

  <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
    {#each features as feature}
      <div class="group relative overflow-hidden rounded-xl border bg-background p-6 transition-all hover:shadow-lg">
        <div class="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-muted text-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
          <feature.icon class="h-5 w-5" />
        </div>
        <h3 class="mb-2 text-lg font-bold">{feature.title}</h3>
        <p class="text-sm text-muted-foreground leading-relaxed">
          {feature.desc}
        </p>
      </div>
    {/each}
  </div>
</section>
