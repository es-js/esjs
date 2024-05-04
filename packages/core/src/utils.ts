const IMPORTS_REGEX =
	/import(?:["'\s]*([\w*{}\n\r\t, ]+)from\s*)?["'\s].*([@\w/_-]+)["'\s].*/g

export interface SplitCodeImports {
	codeWithoutImports: string
	imports: string
	hasImports: boolean
}

export function splitCodeImports(code: string): SplitCodeImports {
	const codeWithoutImports: string = replaceImportsWith(code, '')
	const imports: string = extractImportsFrom(code) ?? ''
	const hasImports: boolean = Boolean(imports)

	return {
		codeWithoutImports,
		imports,
		hasImports,
	}
}

function replaceImportsWith(code: string, replacement: string): string {
	return code.replace(IMPORTS_REGEX, replacement).trim()
}

function extractImportsFrom(code: string): string | null {
	return code.match(IMPORTS_REGEX)?.join('\n') ?? null
}

const FRONT_MATTER_DIVISOR = '---'

export interface SplitScriptTemplate {
	script: string | null
	template: string | null
}

export function splitScriptTemplate(code: string): SplitScriptTemplate {
	const trimmedCode: string = code.trim()
	let script: string | null = trimmedCode
	let template: string | null = null

	if (trimmedCode.startsWith(FRONT_MATTER_DIVISOR)) {
		script = trimmedCode.substring(
			trimmedCode.indexOf(FRONT_MATTER_DIVISOR) + 3,
		)
		script = script
			.substring(0, script.lastIndexOf(FRONT_MATTER_DIVISOR))
			.trim()

		template = trimmedCode
			.substring(trimmedCode.lastIndexOf(FRONT_MATTER_DIVISOR) + 3)
			.trim()
	}

	return { script, template }
}

export function invertMap(map: Map<string, string>): Map<string, string> {
	const invertedMap = new Map<string, string>()
	for (const [key, value] of map.entries()) {
		invertedMap.set(value, key)
	}

	return invertedMap
}
