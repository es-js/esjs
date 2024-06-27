import type { EjecutarOptions } from '../runtime/ejecutar'
import { createIframe } from './iframe'
import packageJson from '../../package.json'

export const version = packageJson.version

const DEFAULT_IMPORTS_MAP = {
	imports: {
		'@es-js/sandbox/runtime': `https://cdn.jsdelivr.net/npm/@es-js/sandbox@${version}/runtime/+esm`,
		'@es-js/': 'https://esm.run/@es-js/',
		'npm/': 'https://cdn.jsdelivr.net/npm/',
	},
}

const DEFAULT_STYLESHEETS = [
	'https://cdn.jsdelivr.net/npm/@es-js/sandbox@latest/dist/style.css',
]

export function createSandbox(
	elementOrId: HTMLElement | string,
	customOptions: Partial<EjecutarOptions>,
): HTMLIFrameElement {
	if (typeof elementOrId === 'string')
		elementOrId = document.getElementById(elementOrId) as HTMLElement

	const options: EjecutarOptions = Object.assign(
		{
			usarTerminal: null,
			theme: 'dark',
			hidePreview: false,
			hideConsole: false,
			previewTab: 'console',
			importMap: JSON.stringify(DEFAULT_IMPORTS_MAP),
			stylesheets: DEFAULT_STYLESHEETS,
			clearConsoleOnRun: true,
			infiniteLoopProtection: false,
		},
		customOptions,
	)

	return createIframe(elementOrId, options)
}
