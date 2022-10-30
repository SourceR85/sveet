<script lang="ts">
	import MenuBar from './MenuBar/index.svelte';
</script>

<header>
	<MenuBar />
</header>

<style>
  header {
    background-color: lightgoldenrodyellow;
    grid-area: top-bar;
		position: relative;
		z-index: 2;
  }
</style>
