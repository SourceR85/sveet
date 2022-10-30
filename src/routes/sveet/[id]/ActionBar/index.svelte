<script lang="ts">
import {actions} from "./actions"
</script>

<menu>
{#each actions as {label, icon, action}}
	<li on:click={action} on:keydown={null}><img src={icon} alt={label}/></li>
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
	li {
		cursor: pointer;
		padding: 2px;
	}
	li:hover {
		background-color: var(--hover-color);
	}
	img {
		display: block;
	}
</style>
