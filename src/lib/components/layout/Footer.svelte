<script lang="ts">
  import { t } from 'svelte-i18n';
</script>

<footer class="border-t py-6 md:py-0">
  <div class="w-full max-w-none flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row px-6 sm:px-12">
    <div class="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
      <p class="text-center text-sm leading-loose text-muted-foreground md:text-left">
        {$t('footer.copyright')}
      </p>
    </div>
    <div class="flex gap-4">
        <a href="/legal/privacy" class="text-sm text-muted-foreground hover:underline underline-offset-4">{$t('footer.privacy')}</a>
        <a href="/legal/terms" class="text-sm text-muted-foreground hover:underline underline-offset-4">{$t('footer.terms')}</a>
    </div>
  </div>
</footer>
