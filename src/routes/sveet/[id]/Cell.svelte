<!-- svelte-ignore a11y-autofocus -->

<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { SveetCell } from './sveet';
	const dispatch = createEventDispatcher();

	export let row: number;
	export let column: number;
	export let active: boolean;
	export let cell: SveetCell;

	enum Mode {
		Editing,
		DisplayValue,
		DisplayFormula
	}

	let mode = Mode.DisplayValue;
	let editValue = cell.formula;
	let displayValue = cell.displayValue;

	function finishEditing(save: boolean, move?: "Up"|"Down"|"Left"|"Right") {
		mode = Mode.DisplayValue;
		editValue.stopEditing(save);
		if(move) {
			document.body.dispatchEvent(new KeyboardEvent("keydown", {
				key: `Arrow${move}`
			}))
		}
	}
	const autofocus = (node: HTMLInputElement) => { node.focus() }
</script>

<div
	style:--row={row}
	style:--column={column}
	class:active
	on:click={() => dispatch('select')}
	on:dblclick={() => {
		if (mode === Mode.DisplayValue) {
			mode = Mode.Editing;
			editValue.startEditing();
		} else {
			mode = Mode.DisplayValue;
		}
	}}
>
	{#if mode === Mode.DisplayValue}
		{$displayValue}
	{:else if mode === Mode.Editing}<input
			use:autofocus
			bind:value={$editValue}
			on:blur={() => finishEditing(true)}
			on:keydown|stopPropagation={(event) => {
				switch(event.key) {
					case 'Enter':
						finishEditing(true, event.shiftKey ? "Up" : "Down");
						break;
					case 'Tab':
						finishEditing(true, event.shiftKey ? "Left" : "Right")
						break
					case 'Escape':
						finishEditing(false);
						break;
				}
			}}
		/>
	{/if}
</div>

<style>
	div {
		outline: 1px solid lightgray;
		grid-row: calc(var(--row) + 2);
		grid-column: calc(var(--column) + 2);
	}
	.active {
		outline-color: blueviolet;
		outline-width: 2px;
	}
	input {
		all: unset;
		display: block;
		width: 100%;
	}
</style>
