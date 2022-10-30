import undoIcon from '@fluentui/svg-icons/icons/arrow_undo_16_regular.svg'
import redoIcon from '@fluentui/svg-icons/icons/arrow_redo_16_regular.svg'
import { noop } from "../utils"

export const actions = [
	{ label: "Undo", action: noop, icon: undoIcon },
	{ label: "Redo", action: noop, icon: redoIcon },
]
