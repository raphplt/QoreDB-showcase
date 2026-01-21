import type { LayoutLoad } from './$types';
import { waitLocale } from 'svelte-i18n';
import '$lib/i18n'; // Import to register locales

export const load: LayoutLoad = async () => {
	await waitLocale();
	return {};
};
