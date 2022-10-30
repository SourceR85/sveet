import type { Writable } from "svelte/store";
import type { Sveet } from "./sveet";

export interface ActiveCell {
	column: number;
	row: number;
};

export interface CurrentSveetContext {
	activeCell: Writable<ActiveCell>
	current_sveet: Sveet
}
