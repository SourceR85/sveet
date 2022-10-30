<script lang="ts">
	import MenuBar from './MenuBar/index.svelte';
	import ActionBar from './ActionBar/index.svelte';
	import FormulaBar from './FormulaBar/index.svelte';
</script>

<header>
	<MenuBar />
	<ActionBar/>
	<FormulaBar/>
</header>

<style>
  header {
    grid-area: top-bar;
		position: relative;
		z-index: 2;
  }
</style>
