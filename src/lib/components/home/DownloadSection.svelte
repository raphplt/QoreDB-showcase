<script lang="ts">
  import { t } from 'svelte-i18n';
  import { Button } from '$lib/components/ui/button';
  import { Input } from '$lib/components/ui/input';
  import { Mail } from 'lucide-svelte';

  let email = '';
  let status: 'idle' | 'loading' | 'success' = 'idle';

  function handleSubmit() {
    status = 'loading';
    // Simulate API call
    setTimeout(() => {
      status = 'success';
      email = '';
    }, 1500);
  }
</script>

<section id="download" class="w-full max-w-none py-24 text-center px-6 sm:px-12">
  <div class="mx-auto">
    <h2 class="text-3xl font-bold tracking-tight mb-4">Join the waitlist</h2>
    <p class="text-muted-foreground mb-8 text-lg">
      QoreDB is currently in private beta. Sign up to get early access and updates.
    </p>

    {#if status === 'success'}
      <div class="rounded-lg bg-green-500/10 p-4 text-green-600 dark:text-green-400 border border-green-500/20">
        <p class="font-medium">Thanks for joining! We'll be in touch soon.</p>
      </div>
    {:else}
      <form class="flex w-full mx-auto items-center space-x-2" onsubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
        <div class="relative flex-1">
             <Mail class="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
             <input
                type="email" 
                placeholder="developer@example.com" 
                bind:value={email}
                required
                class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pl-9"
             />
        </div>
        <Button type="submit" disabled={status === 'loading'}>
            {status === 'loading' ? 'Joining...' : 'Join Waitlist'}
        </Button>
      </form>
    {/if}
     <p class="mt-4 text-xs text-muted-foreground">
        No spam. Unsubscribe at any time.
    </p>
  </div>
</section>
