<script lang="ts">
	import { getContext, tick } from 'svelte';
	import type { CurrentSveetContext, ActiveCell } from "./types";
	import Cell from './Cell.svelte';
	import ColHeader from './ColHeader.svelte';
	import RowHeader from './RowHeader.svelte';
	import { getColumnName, getRowIndex, type SveetCell } from './sveet';

	const rowHeaders: HTMLElement[] = [];
	const columnHeaders: HTMLElement[] = [];
	
	const {
		activeCell,
		current_sveet: {
			sveet,
			numberOfRows,
			numberOfColumns,
		}
	} = getContext<CurrentSveetContext>("sveet")

	const keyDownToDelta = {
		ArrowUp: { rowDirection: -1 },
		ArrowDown: { rowDirection: 1 },
		ArrowLeft: { columnDirection: -1 },
		ArrowRight: { columnDirection: 1 }
	} as const;

	function onKeydown(event: KeyboardEvent) {
		switch (event.key) {
			case 'ArrowUp':
			case 'ArrowDown':
			case 'ArrowLeft':
			case 'ArrowRight':
				const controlPressed = event.metaKey || event.ctrlKey;
				moveActiveCell(keyDownToDelta[event.key], { allTheWay: controlPressed });
				event.preventDefault();
				break;
			case 'Delete':
				const columnName = getColumnName($activeCell.column);
				const rowIndex = getRowIndex($activeCell.row);
				const cell = sveet.get(columnName + rowIndex);
				if(cell) {
					cell.formula.set("")
					cell.displayValue.set("")
				};
			break;
			default:
				if(event.key !== 'Enter' && event.key.length > 1) return;
				const activeCellElement = document.querySelector("main div.active")
				if(activeCellElement) {
					activeCellElement.dispatchEvent(new MouseEvent("dblclick"));
				}
		}
	}

	function moveActiveCell(
		{ rowDirection = 0, columnDirection = 0 },
		{ allTheWay }: { allTheWay: boolean }
	) {
		if (allTheWay) {
			if (rowDirection === -1) {
				$activeCell.row = 0;
			} else if (rowDirection === 1) {
				$activeCell.row = numberOfRows - 1;
			}
			if (columnDirection === -1) {
				$activeCell.column = 0;
			} else if (columnDirection === 1) {
				$activeCell.column = numberOfColumns - 1;
			}
		} else {
			$activeCell.row = Math.max(Math.min($activeCell.row + rowDirection, numberOfRows - 1), 0);
			$activeCell.column = Math.max(
				Math.min($activeCell.column + columnDirection, numberOfColumns - 1),
				0
			);
		}
	}

	function scrollIntoView(container: HTMLElement, activeCell: ActiveCell) {
		function _scrollIntoView(activeCell: ActiveCell) {
			let activeCellLeft = rowHeaders[0].getBoundingClientRect().width,
				activeCellTop = columnHeaders[0].getBoundingClientRect().height;
			let activeCellWidth = columnHeaders[activeCell.column].getBoundingClientRect().width;
			let activeCellHeight = rowHeaders[activeCell.row].getBoundingClientRect().height;
			for (let i = 0; i < activeCell.column; i++) {
				activeCellLeft += columnHeaders[i].getBoundingClientRect().width;
			}
			for (let i = 0; i < activeCell.row; i++) {
				activeCellTop += rowHeaders[i].getBoundingClientRect().height;
			}

			const margin = {
				left: rowHeaders[0].getBoundingClientRect().width + 15,
				right: 15,
				top: columnHeaders[0].getBoundingClientRect().height + 15,
				bottom: 15
			};

			let newScrollX = container.scrollLeft;
			let newScrollY = container.scrollTop;

			// left side
			if (activeCellLeft < container.scrollLeft + margin.left) {
				newScrollX = activeCellLeft - margin.left;
			}
			// right side
			if (activeCellLeft + activeCellWidth > container.scrollLeft + container.clientWidth) {
				newScrollX = activeCellLeft + activeCellWidth + margin.right - container.clientWidth;
			}
			// top side
			if (activeCellTop < container.scrollTop + margin.top) {
				newScrollY = activeCellTop - margin.top;
			}
			// bottom side
			if (activeCellTop + activeCellHeight > container.scrollTop + container.clientHeight) {
				newScrollY = activeCellTop + activeCellHeight + margin.right - container.clientHeight;
			}

			container.scrollTo({ left: newScrollX, top: newScrollY, behavior: 'smooth' });
		}

		waitForBindingForColumnRowHeadersToFinish().then(() => _scrollIntoView(activeCell));
		return {
			update: _scrollIntoView
		};
	}
	function waitForBindingForColumnRowHeadersToFinish() {
		return tick();
	}
	function getCell(cellName: string): SveetCell {
		const cell = sveet.get(cellName)
		if(!cell) throw `Cell ${cellName} not found`
		return cell
	}
</script>

<svelte:body on:keydown={onKeydown} />

<main use:scrollIntoView={$activeCell} style:--rows={numberOfRows} style:--columns={numberOfColumns}>
	<div>
		<span class="select-table"></span>

		{#each { length: numberOfColumns } as _, column}
			{@const colName = getColumnName(column)}
			{#each { length: numberOfRows } as _, row}
				{@const rowIndex = getRowIndex(row)}
				{@const cellName = colName + rowIndex}
				{@const cell = getCell(cellName)}
				<Cell
					{cell}
					{row}
					{column}
					active={$activeCell?.column === column && $activeCell?.row === row}
					on:select={() => {
						$activeCell.column =column;
						$activeCell.row =row;
					}}
				/>
			{/each}
		{/each}

		{#each { length: numberOfColumns } as _, column}
			{@const colName = String.fromCharCode('A'.charCodeAt(0) + column)}
			<ColHeader
				bind:element={columnHeaders[column]}
				active={$activeCell?.column === column}
				{column}
				value={colName}
			/>
		{/each}

		{#each { length: numberOfRows } as _, row}
			{@const rowIndex = String(row + 1)}
			<RowHeader
				bind:element={rowHeaders[row]}
				active={$activeCell?.row === row}
				{row}
				value={rowIndex}
			/>
		{/each}
	</div>
</main>

<style>
	main {
		grid-area: sheet;
		overflow: scroll;
	}
	div {
		display: grid;
		grid-template-rows: repeat(calc(var(--rows) + 1), 23px);
		grid-template-columns: repeat(calc(var(--columns) + 1), minmax(50px, 1fr));
	}
	.select-table {
		box-sizing: border-box;
		display: block;
		background-color: lightgray;
		border-width: 0 4px 4px 0;
		border-style: solid;
		border-color: DimGray;
		grid-row: 1;
		grid-column: 1;
		position: sticky;
		top: 0;
		left: 0;
		z-index: 1;
	}
</style>
