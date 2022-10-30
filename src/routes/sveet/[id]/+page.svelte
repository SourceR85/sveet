<script lang="ts">
	import { setContext } from "svelte";
	import { writable } from "svelte/store";
  import type {CurrentSveetContext, ActiveCell} from "./types"
  import Sveet from './Sveet.svelte';
  import TopBar from './TopBar.svelte';
  import BottomBar from './BottomBar.svelte';
	import { createSveet } from "./sveet";

  let numberOfColumns = 26;
  let numberOfRows = 50;

  setContext<CurrentSveetContext>("sveet", {
    activeCell: writable<ActiveCell>({
      column: 0,
      row: 0,
    }),
    current_sveet: createSveet({ numberOfColumns, numberOfRows })
  })
</script>

<section class="container">
  <Sveet />
  <TopBar />
  <BottomBar />
</section>

<style>
  .container {
    display: grid;
    width: 100vw;
    height: 100vh;
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr 50px;
    grid-template-areas: "top-bar" "sheet" "bottom-bar";
  }
</style>