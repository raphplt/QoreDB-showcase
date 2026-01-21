<script lang="ts">
	import { type VariantProps } from 'tailwind-variants';
	import { buttonVariants } from './index.js';
	import { cn } from '$lib/utils.js';
    import type { HTMLButtonAttributes } from "svelte/elements";


    type Props = HTMLButtonAttributes & VariantProps<typeof buttonVariants>;

	let {
		class: className,
		variant = 'default',
		size = 'default',
		ref = $bindable(null),
        children,
		...restProps
	}: Props = $props();
</script>

<button
	bind:this={ref}
	class={cn(buttonVariants({ variant, size, className }))}
	{...restProps}
>
	{@render children?.()}
</button>
