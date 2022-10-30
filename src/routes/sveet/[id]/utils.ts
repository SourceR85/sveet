const inputElements = new Set([
	'input',
	'textarea',
	'select',
	'button'
])

export const isCurrentActiveElementInput = () => inputElements.has(document.activeElement?.tagName.toLowerCase() as string)

// eslint-disable-next-line @typescript-eslint/no-empty-function
export function noop(): void { }
