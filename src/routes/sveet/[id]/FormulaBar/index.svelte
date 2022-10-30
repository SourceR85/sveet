<script lang="ts">
	import caret_down from '@fluentui/svg-icons/icons/caret_down_20_filled.svg';
	import math_formula from '@fluentui/svg-icons/icons/math_formula_20_filled.svg';
	import { getContext } from 'svelte';
	import { fromColumnName, fromRowIndex, getColumnName, getRowIndex, type SveetCell } from '../sveet';
	import type { CurrentSveetContext } from '../types';
	import { noop } from '../utils';

	const { activeCell, current_sveet: { sveet } } = getContext<CurrentSveetContext>('sveet');
	let rangeInput: HTMLInputElement

	function onAddressChange() {
		const newAddress = rangeInput.value;
		const match = newAddress.match(/^(?<column>[A-Z]+)(?<row>[0-9]+)$/i);
		if (match && match.groups) {
			$activeCell = {
				column: fromColumnName(match.groups.column.toUpperCase()),
				row: fromRowIndex(match.groups.row)
			};
			rangeInput.blur();
		} else {
			alert('The name given to this range is invalid');
			const value = getColumnName($activeCell.column) + getRowIndex($activeCell.row);
			rangeInput.value = value;
			rangeInput.setSelectionRange(0, value.length);
		}
	}

	let cellName: string;
	let formula: SveetCell["formula"];
	$: cellName = getColumnName($activeCell.column) + getRowIndex($activeCell.row);
	$: formula = sveet.get(cellName)?.formula as typeof formula
</script>

<div on:keydown|stopPropagation={noop}>
	<input
		spellcheck="false"
		value={cellName}
		bind:this={rangeInput}
		on:change={onAddressChange}
		/>
	<i><img src={caret_down} alt={null} /></i>
	<span class="separator" />
	<i><img src={math_formula} alt={null} /></i>
	<span class="separator" />
	<input
	class="formula"
	spellcheck="false"
	bind:value={$formula}
	on:keydown={(event) => {
		switch(event.key) {
			case 'Enter':
				formula.stopEditing(true);
				$activeCell = {
					column: $activeCell.column,
					row: $activeCell.row + 1
				}
				break;
			case 'Escape':
				formula.stopEditing(false);
				break;
		}
	}}
	on:focus={() => formula.startEditing()}
	on:blur={() => {formula.stopEditing(true)} } />
</div>

<style>
	div {
		border-bottom: 1px solid var(--border-color);
		display: grid;
		gap: 2px;
		grid-template-columns: 6rem repeat(4, auto) 1fr;
		justify-content: start;
	}
	i {
		display: contents;
	}
	img {
		cursor: pointer;
		display: block;
		margin: 2px;
	}
	.separator {
		background-color: var(--border-color);
		background-clip: content-box;
		width: 1px;
		border-block: 2px solid transparent;
	}
	input {
		all: unset;
		padding-inline: 4px;
	}
	input:focus {
		box-shadow: 0 0 3px inset var(--active-input-outline);
	}
	input:focus:hover {
		box-shadow: 0 0 3px 1px inset var(--active-input-outline);
	}
</style>
