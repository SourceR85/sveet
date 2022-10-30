<script lang="ts">
	import more from '@fluentui/svg-icons/icons/caret_right_16_regular.svg';
	import type { Divider, Menu } from "./menu";
	export let menuChild: Exclude<Menu["children"], undefined>;

	const isDivider = (child: typeof menuChild[0]): child is Divider => "type" in child && child.type === "divider"
</script>

<menu>
	{#each menuChild as child}
		{#if isDivider(child)}
			<hr/>
		{:else}
			{@const { label, children, icon, action } = child}
			<li
				on:keydown={null}
				on:click={action ? () => action() : null}
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
		{/if}
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
		z-index: 2;
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
		min-width: 8.5em;
		padding: 0.25em;
		position: relative;
		white-space: nowrap;
	}
	li:hover {
		background-color: var(--hover-color);
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
	hr {
		border: 1px solid var(--border-color);
		margin-block: 2px;
	}
</style>
