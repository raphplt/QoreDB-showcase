<script lang="ts">
  import { locale, locales } from 'svelte-i18n';
  import { Button } from '$lib/components/ui/button';

  function toggleLang() {
    const current = $locale;
    const next = current === 'en' ? 'fr' : 'en';
    locale.set(next);
    localStorage.setItem('locale', next);
  }
</script>

<Button variant="ghost" size="sm" onclick={toggleLang} class="font-mono text-xs uppercase">
  {$locale}
</Button>
