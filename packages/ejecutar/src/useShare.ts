import lzs from 'lz-string'

interface ShareOptions {
  theme: 'dark' | 'light'
  hidePreview: boolean
  previewTab: 'console' | 'flowchart' | 'hidden'
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

    return {
      theme: parsedOptions.theme ?? (prefersDark ? 'dark' : 'light'),
      hidePreview: parsedOptions.hidePreview ?? false,
      previewTab: parsedOptions.previewTab ?? 'console',
    }
  }

  return {
    getCodeFromUrl,
    getTestsCodeFromUrl,
    getOptionsFromUrl,
  }
}
