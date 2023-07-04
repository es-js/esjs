import * as lzs from 'lz-string'
import { useClipboard } from '@vueuse/core'
import { useSettings } from '@/composables/useSettings'
import { INITIAL_CODE, useEditor } from '@/composables/useEditor'
import { useNotification } from '@/composables/useNotification'

const settings = useSettings()

const ESJS_CDN = import.meta.env.MODE === 'development' ? 'http://localhost:1337' : 'https://cdn.esjs.dev'

export const useShare = () => {
  function shareCode() {
    const url = getSharedUrl(useEditor().code.value, useEditor().testsCode.value)

    window.history.replaceState('', '', url)

    const clipboard = useClipboard({
      source: window.location.href,
    })

    clipboard.copy()

    useNotification().success('Se copió la URL al portapapeles')
  }

  function shareModule() {
    const url = getSharedModuleUrl(useEditor().code.value)

    const clipboard = useClipboard({
      source: url.toString(),
    })

    clipboard.copy()

    useNotification().success('Se copió la URL al portapapeles')
  }

  function getSharedUrl(code: string, testsCode: string | null = null): URL {
    const url = new URL('/', window.location.origin)

    if (code !== INITIAL_CODE)
      url.searchParams.set('code', lzs.compressToEncodedURIComponent(code))

    if (testsCode)
      url.searchParams.set('tests', lzs.compressToEncodedURIComponent(testsCode))

    url.searchParams.set('layout', settings.settings.value.layout)
    url.searchParams.set('hidePreview', String(settings.settings.value.hidePreview))
    url.searchParams.set('hideEditor', String(settings.settings.value.hideEditor))
    url.searchParams.set('hideConsole', String(settings.settings.value.hideConsole))
    url.searchParams.set('hideTests', String(settings.settings.value.hideTests))
    url.searchParams.set('readonlyCode', String(settings.settings.value.readonlyCode))
    url.searchParams.set('readonlyTests', String(settings.settings.value.readonlyTests))
    url.searchParams.set('hideOptions', String(settings.settings.value.hideOptions))
    url.searchParams.set('preview', JSON.stringify(settings.settings.value.preview))
    url.searchParams.set('previewTab', JSON.stringify(settings.settings.value.previewTab))

    return url
  }

  function getSharedModuleUrl(code: string): URL {
    return new URL(`/${lzs.compressToEncodedURIComponent(code)}`, ESJS_CDN)
  }

  function decodeSharedUrl() {
    const url = new URL(window.location.href)

    return {
      pathname: url.pathname,
      tests: getTestsCodeFromUrl(),
      layout: url.searchParams.get('layout'),
      hideOptions: url.searchParams.get('hideOptions'),
      hideEditor: url.searchParams.get('hideEditor'),
      hidePreview: url.searchParams.get('hidePreview'),
      hideConsole: url.searchParams.get('hideConsole'),
      hideTests: url.searchParams.get('hideTests'),
      readonlyCode: url.searchParams.get('readonlyCode'),
      readonlyTests: url.searchParams.get('readonlyTests'),
      showAdvanced: url.searchParams.get('showAdvanced'),
      preview: JSON.parse(url.searchParams.get('preview') ?? '{}'),
      previewTab: decodePreviewTab(url),
    }
  }

  function decodePreviewTab(url: URL) {
    try {
      return JSON.parse(url.searchParams.get('previewTab') || '')
    }
    catch (error) {
      if (url.searchParams.get('hideConsole') === 'true')
        return { console: false, flowchart: false, hidden: true }

      return {}
    }
  }

  async function getCodeFromUrl(): Promise<string> {
    const url = new URL(window.location.href)

    const { pathname } = url

    if (url.searchParams.get('code') !== null && url.searchParams.get('code') !== '') {
      const code = url.searchParams.get('code')
      return lzs.decompressFromEncodedURIComponent(code)
    }

    try {
      if (pathname.includes('/github/')) {
        const githubUrl = pathname.replace('/github/', '')
        return await getCodeFromGithub(githubUrl)
      }

      if (pathname.includes('/gist/')) {
        const gistUrl = pathname.replace('/gist/', '')
        return await getCodeFromGist(gistUrl)
      }

      if (pathname.length > 6)
        return lzs.decompressFromEncodedURIComponent(pathname.substring(1))

      return INITIAL_CODE
    }
    catch (error: any) {
      useNotification().error(error.toString())
      return INITIAL_CODE
    }
  }

  function getTestsCodeFromUrl(): string | null {
    const url = new URL(window.location.href)

    return lzs.decompressFromEncodedURIComponent(url.searchParams.get('tests') ?? '')
  }

  async function getCodeFromGithub(githubUrl: string) {
    const githubUrlParts = githubUrl.split('/')
    const githubUser = githubUrlParts[0]
    const githubRepo = githubUrlParts[1]
    const githubBranch = githubUrlParts[2]
    const githubFilePath = githubUrlParts.slice(3).join('/')
    const githubRawUrl = `https://raw.githubusercontent.com/${githubUser}/${githubRepo}/${githubBranch}/${githubFilePath}`

    const response = await fetch(githubRawUrl)

    if (response.status !== 200)
      throw new Error('No se pudo obtener el código desde GitHub')

    return response.text()
  }

  async function getCodeFromGist(gistUrl: string) {
    const gistId = gistUrl.split('/')[0]
    const gistRawUrl = `https://gist.githubusercontent.com/${gistId}/raw`

    const response = await fetch(gistRawUrl)

    if (response.status !== 200)
      throw new Error('No se pudo obtener el código desde Gist')

    return response.text()
  }

  function setSettingsFromUrl() {
    // if (window.location.pathname === '/')
    //   return

    const { layout, hideOptions, hideEditor, hidePreview, hideConsole, hideTests, readonlyCode, readonlyTests, tests, showAdvanced, preview, previewTab } = useShare().decodeSharedUrl()

    settings.setLayout(layout === 'vertical' ? 'vertical' : 'horizontal')
    settings.setHideOptions(hideOptions === 'true')
    settings.setHideEditor(hideEditor === 'true')
    settings.setHidePreview(hidePreview === 'true')
    settings.setHideConsole(hideConsole === 'true')
    settings.setHideTests(hideTests === 'true' || tests === null)
    settings.setReadonlyCode(readonlyCode === 'true')
    settings.setReadonlyTests(readonlyTests === 'true')
    settings.setShowAdvanced(showAdvanced === 'true')
    settings.setPreview(preview)
    settings.setPreviewTab(previewTab)
  }

  async function setCodeFromUrl() {
    const code = await getCodeFromUrl()

    const testsCode = getTestsCodeFromUrl()

    useEditor().setCode(code)

    if (testsCode)
      useEditor().setTestsCode(testsCode)
  }

  return {
    shareCode,
    shareModule,
    decodeSharedUrl,
    getCodeFromUrl,
    getTestsCodeFromUrl,
    setSettingsFromUrl,
    setCodeFromUrl,
  }
}
