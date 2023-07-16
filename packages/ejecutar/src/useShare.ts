import lzs from 'lz-string'

interface ShareOptions {
  theme: 'dark' | 'light'
  hidePreview: boolean
  hideConsole: boolean
  previewTab: 'console' | 'flowchart' | 'hidden'
  backgroundTransparent: boolean
}

export function useShare() {
  function getCodeFromUrl(): string {
    const url = new URL(window.location.href)

    return lzs.decompressFromEncodedURIComponent(url.searchParams.get('code') ?? '') ?? ''
  }

  function getTestsCodeFromUrl(): string {
    const url = new URL(window.location.href)

    return lzs.decompressFromEncodedURIComponent(url.searchParams.get('tests') ?? '') ?? ''
  }

  function getOptionsFromUrl(): ShareOptions {
    const url = new URL(window.location.href)

    const decodedOptions = lzs.decompressFromEncodedURIComponent(url.searchParams.get('options'))

    const parsedOptions = decodedOptions === '' ? {} : JSON.parse(decodedOptions ?? '{}')

    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches

    const hideConsole = parsedOptions.hideConsole === 'true'

    return {
      theme: parsedOptions.theme ?? (prefersDark ? 'dark' : 'light'),
      hidePreview: parsedOptions.hidePreview === 'true',
      hideConsole,
      previewTab: parsedOptions.previewTab ?? (hideConsole ? 'hidden' : 'console'),
      backgroundTransparent: parsedOptions.backgroundTransparent ?? false,
    }
  }

  return {
    getCodeFromUrl,
    getTestsCodeFromUrl,
    getOptionsFromUrl,
  }
}
