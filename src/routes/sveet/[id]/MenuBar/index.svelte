<script lang="ts">
	import Dropdown from './Dropdown.svelte';
	import { menu as menuData } from './menu';
	import { noop } from "../utils";

	let showDropdownMode = false;
	let menuCurrentlyShowing: string|null = null;

	const hideMenu = () => {
		if (menuCurrentlyShowing) {
			showDropdownMode = false;
			menuCurrentlyShowing = null;
		}
	};
</script>

<svelte:body on:click={hideMenu} />

<menu on:click|stopPropagation={noop} on:keydown={null}>
	{#each menuData as { label, children }}
		<li
			on:keydown={null}
			on:click={() => {
				showDropdownMode = true;
				menuCurrentlyShowing = label;
			}}
			on:mouseenter={() => {
				if (showDropdownMode) menuCurrentlyShowing = label;
			}}
		>
			{label}
			{#if children && menuCurrentlyShowing === label}
				<Dropdown menuChild={children} />
			{/if}
		</li>
	{/each}
</menu>

<style>
	menu {
		all: unset;
		display: grid;
		gap: 0.25rem;
		grid-auto-flow: column;
		height: 1.5rem;
		justify-content: start;
		padding-inline: 0.25rem;
		border-bottom: 1px solid var(--border-color);
	}
	menu,
	menu :global(menu) {
		background-color: Canvas;
		color: CanvasText;
	}

	menu :global(li) {
		cursor: pointer;
	}
	li {
		all: unset;
		padding: 2px 4px;
		position: relative;
	}
	li:hover {
		background-color: var(--hover-color);
	}
</style>
