export class OrchestratorFile {
	filename: string
	template: string
	script: string
	style: string

	compiled = {
		js: '',
		css: '',
		ssr: '',
	}

	constructor(
		filename: string,
		template: string | undefined,
		script: string | undefined,
		style?: string,
	) {
		this.filename = filename
		this.template = template || ''
		this.script = script || ''
		this.style = style || ''
	}

	get code() {
		return this.script
	}
}

export interface OrchestratorFiles {
	[key: string]: OrchestratorFile
}

export interface Orchestrator {
	files: OrchestratorFiles
	errors: (string | Error)[]
	runtimeErrors: (string | Error)[]
}

export const MAIN_FILE = 'codigo.esjs'
export const MAIN_TESTS_FILE = 'pruebas.esjs'

export const orchestrator: Orchestrator = {
	files: {},
	errors: [],
	runtimeErrors: [],
}
