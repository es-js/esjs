import lzs from 'lz-string'
import { EDITOR_BASE_URL } from '../constants/Constants'

export function useCode() {
  function getCodeFromCodeBlock(slot: HTMLElement | null): string | null {
    if (!slot)
      return null

    const codeElement = slot.getElementsByTagName('code')

    if (!codeElement || !codeElement.length)
      return null

    const code = codeElement[0].innerText

    return code
  }

  function getCompressedCodeFromCodeBlock(slot: HTMLElement | null): string | null {
    const code = getCodeFromCodeBlock(slot)

    if (!code)
      return null

    return compressCode(code)
  }

  function compressCode(code: string): string {
    return lzs.compressToEncodedURIComponent(code)
  }

  function getEditorUrl(code: string, testsCode: string, options: any): string {
    const url = new URL(EDITOR_BASE_URL)

    url.searchParams.set('code', compressCode(code))
    url.searchParams.set('tests', compressCode(testsCode))
    url.searchParams.set('options', compressCode(JSON.stringify(options)))

    return url.toString()
  }

  return {
    getCodeFromCodeBlock,
    getCompressedCodeFromCodeBlock,
    getEditorUrl,
  }
}
