<script lang="ts">
import {actions} from "./actions"
</script>

<menu>
{#each actions as {icon, action}}
	<li on:click={action} on:keydown={null}><div style:-webkit-mask-image="url({icon})"/></li>
{/each}
</menu>

<style>
	menu, li {
		all: unset;
	}
	menu {
		border-bottom: 1px solid var(--border-color);
		display: grid;
		gap: .2px;
		grid-auto-flow: column;
		justify-content: start;
		padding: .25rem .5rem;
	}
	div {
		aspect-ratio: 1;
		cursor: pointer;
		background-color: CanvasText;
		-webkit-mask-position: center;
		mask-position: center;
		-webkit-mask-repeat: no-repeat;
		mask-repeat: no-repeat;
		-webkit-mask-size: 1em;
		mask-size: 1em;
		padding: 2px;
		width: 1em;
	}
	li:hover {
		background-color: var(--hover-color);
	}
	img {
		display: block;
	}
</style>
