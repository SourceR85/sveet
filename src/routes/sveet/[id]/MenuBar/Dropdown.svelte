<script lang="ts">
	import more from '@fluentui/svg-icons/icons/caret_right_16_regular.svg';
	import { children } from 'svelte/internal';
	export let menuChild;
	let menuCurrentlyShowing: string = null;
</script>

<menu>
	{#each menuChild as { label, children, icon, action }}
		<li
			on:mouseenter={() => {
				menuCurrentlyShowing = label;
			}}
			on:click={() => {
				if(typeof action == "function") {
					action()
				}
			}}
		>
			{#if icon}
				<div style:-webkit-mask-image="url({icon})" />
			{:else}
				<div />
			{/if}
			{label}
			{#if children}
				<div style:-webkit-mask-image="url({more})" />
				<svelte:self menuChild={children} />
			{/if}
		</li>
	{/each}
</menu>

<style>
	menu {
		all: unset;
		position: absolute;
		border-radius: 0.25em;
		box-shadow: 1px 2px 4px #0009;
		left: var(--left-position, 0);
		top: var(--top-position, 100%);
	}
	li :global(menu) {
		display: none;
	}
	li {
		--top-position: 0;
		--left-position: 100%;
		all: unset;
		align-items: center;
		display: grid;
		gap: 0.25rem;
		grid-template-areas: 'icon . .';
		grid-template-columns: 1rem auto 1rem;
		grid-auto-flow: column;
		min-width: 8em;
		padding: 0.25em;
		position: relative;
	}
	li:hover {
		background-color: #0003;
	}
	li:hover > :global(menu) {
		display: block;
	}
	div:global([style]) {
		aspect-ratio: 1;
		background-color: CanvasText;
		-webkit-mask-size: cover;
		mask-size: cover;
	}
</style>
