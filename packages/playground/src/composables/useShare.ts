import * as lzs from 'lz-string'
import { useSettings } from '@/composables/useSettings'

const settings = useSettings()

export const useShare = () => {
  function getSharedUrl(code: string) {
    const url = new URL(lzs.compressToEncodedURIComponent(code), window.location.origin)
    url.searchParams.set('layout', settings.settings.value.layout)
    url.searchParams.set('hidePreview', String(settings.settings.value.hidePreview))
    url.searchParams.set('hideEditor', String(settings.settings.value.hideEditor))
    url.searchParams.set('hideConsole', String(settings.settings.value.hideConsole))
    url.searchParams.set('hideOptions', String(settings.settings.value.hideOptions))
    return url
  }

  function decompressSharedUrl() {
    const url = new URL(window.location.href)
    const code = lzs.decompressFromEncodedURIComponent(url.pathname.substring(1))
    const params = url.searchParams
    const layout = params.get('layout')
    const hideOptions = params.get('hideOptions')
    const hideEditor = params.get('hideEditor')
    const hidePreview = params.get('hidePreview')
    const hideConsole = params.get('hideConsole')

    return {
      code,
      layout,
      hideOptions,
      hideEditor,
      hidePreview,
      hideConsole,
    }
  }

  return {
    getSharedUrl,
    decompressSharedUrl,
  }
}
