import newDoc from '@fluentui/svg-icons/icons/document_add_16_regular.svg'
import openDoc from '@fluentui/svg-icons/icons/open_16_regular.svg'
import copyDoc from '@fluentui/svg-icons/icons/copy_16_regular.svg'
import undoIcon from '@fluentui/svg-icons/icons/arrow_undo_16_regular.svg'
import redoIcon from '@fluentui/svg-icons/icons/arrow_redo_16_regular.svg'
import cutIcon from '@fluentui/svg-icons/icons/cut_20_regular.svg'
import copyIcon from '@fluentui/svg-icons/icons/copy_20_regular.svg'

interface BaseMenu {
	label: string
	icon?: string
	keyboardShortcut?: string
}

export interface MenuItem extends BaseMenu {
	action?: CallableFunction
}

export interface Menu extends BaseMenu {
	label: string
	icon?: string
	keyboardShortcut?: string
	children?: (Menu | MenuItem)[]
}

function noop() {
	console.warn("not implemented")
}

function colorScheme(mode: "dark" | "light") {
	return () => {
		if (mode == "dark") document.documentElement.style.colorScheme = "dark"
		else document.documentElement.style.colorScheme = "light"
	}
}

export const menu: Menu[] = [
	{
		label: "File",
		children: [
			{ label: "New", icon: newDoc },
			{ label: "Open", icon: openDoc },
			{ label: "Import" },
			{ label: "Make a copy", icon: copyDoc },
		]
	},
	{
		label: "Edit",
		children: [
			{ label: "Undo", action: noop, icon: undoIcon },
			{ label: "Redo", action: noop, icon: redoIcon },
			{ label: "Cut", action: noop, icon: cutIcon },
			{ label: "Copy", action: noop, icon: copyIcon },
		]
	},
	{
		label: "View",
		children: [
			{
				label: "Show", children: [
					{ label: "Formula bar", action: noop },
					{ label: "Gridlines", action: noop },
					{ label: "Formular", action: noop },
				],
			},
			{ label: "Dark Mode", action: colorScheme("dark") },
			{ label: "Light Mode", action: colorScheme("light") },
		]
	},
	{
		label: "Insert",
		children: [

		]
	},
	{
		label: "Format",
		children: [

		]
	},
	{
		label: "Data",
		children: [

		]
	},
	{
		label: "Tools",
		children: [

		]
	},
	{
		label: "Extensions",
		children: [

		]
	},
	{
		label: "Help",
		children: [

		]
	},
]
