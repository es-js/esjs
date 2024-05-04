import { compressToURL } from '@amoutonbrady/lz-string'
import { EDITOR_BASE_URL } from '../constants/Constants'

export function useCode() {
	function getCodeFromCodeBlock(slot: HTMLElement | null): string | null {
		if (!slot) return null

		const codeElement = slot.getElementsByTagName('code')

		if (!codeElement || !codeElement.length) return null

		const code = codeElement[0].innerText

		return code
	}

	function getEditorUrl(code: string, testsCode: string, options: any): string {
		const url = new URL(EDITOR_BASE_URL)

		url.searchParams.set('code', compressToURL(code))
		url.searchParams.set('tests', compressToURL(testsCode))
		url.searchParams.set('options', compressToURL(JSON.stringify(options)))

		return url.toString()
	}

	return {
		getCodeFromCodeBlock,
		getEditorUrl,
	}
}
