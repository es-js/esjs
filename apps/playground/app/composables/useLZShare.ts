import { compressToURL, decompressFromURL } from '@amoutonbrady/lz-string'
import { useClipboard, useDark } from '@vueuse/core'
import { useEditor } from './useEditor'
import { useSettings } from './useSettings'
import { learnDomain } from '~/constants/app'
import { FILE_CODE, FILE_ESCSS, FILE_ESHTML, FILE_TESTS, INITIAL_CODE, INITIAL_ESCSS, INITIAL_ESHTML, INITIAL_ESHTML_ESJS, useFiles } from '~/composables/useFiles'
import { toast } from 'vue-sonner'

const settings = useSettings()

const ESJS_CDN = import.meta.env.MODE === 'development' ? 'http://localhost:1337' : 'https://cdn.esjs.dev'

export const useLZShare = () => {
  function shareCode() {
    const url = getSharedUrl()

    window.history.replaceState('', '', url)

    const clipboard = useClipboard({
      source: window.location.href,
    })

    clipboard.copy()

    toast.success('Se copió la URL al portapapeles')
  }

  function shareModule() {
    const url = getSharedModuleUrl(useFiles().getFileContent(FILE_CODE))

    const clipboard = useClipboard({
      source: url.toString(),
    })

    clipboard.copy()

    toast.success('Se copió la URL al portapapeles')
  }

  function getSharedUrl(): URL {
    const files = useFiles()
    const code = files.getFileContent(FILE_CODE)
    const testsCode = files.getFileContent(FILE_TESTS)
    const esHtmlMode = settings.settings.value.mode === 'eshtml'

    const url = new URL('/', window.location.origin)

    if (code !== INITIAL_CODE) {
      url.searchParams.set('code', compressToURL(code))
    }

    if (testsCode) {
      url.searchParams.set('tests', compressToURL(testsCode))
    }

    if (esHtmlMode) {
      url.searchParams.set('mode', 'eshtml')

      const eshtmlContent = files.getFileContent(FILE_ESHTML)
      if (eshtmlContent !== INITIAL_ESHTML) {
        url.searchParams.set('eshtml', compressToURL(eshtmlContent))
      }

      const escssContent = files.getFileContent(FILE_ESCSS)
      if (escssContent !== INITIAL_ESCSS) {
        url.searchParams.set('escss', compressToURL(escssContent))
      }

      const codeForEshtml = files.getFileContent(FILE_CODE)
      if (codeForEshtml !== INITIAL_ESHTML_ESJS) {
        url.searchParams.set('code', compressToURL(codeForEshtml))
      }
      else {
        url.searchParams.delete('code')
      }
    }

    url.searchParams.set('layout', settings.settings.value.layout)
    url.searchParams.set('hidePreview', String(settings.settings.value.hidePreview))
    url.searchParams.set('hideEditor', String(settings.settings.value.hideEditor))
    url.searchParams.set('hideConsole', String(settings.settings.value.hideConsole))
    url.searchParams.set('hideTests', String(settings.settings.value.hideTests))
    url.searchParams.set('showCompiledEditor', String(settings.settings.value.showCompiledEditor))
    url.searchParams.set('showCompiledDiff', String(settings.settings.value.showCompiledDiff))
    url.searchParams.set('showSandboxedDiff', String(settings.settings.value.showSandboxedDiff))
    url.searchParams.set('readonlyCode', String(settings.settings.value.readonlyCode))
    url.searchParams.set('readonlyTests', String(settings.settings.value.readonlyTests))
    url.searchParams.set('preview', JSON.stringify(settings.settings.value.preview))
    url.searchParams.set('previewTab', JSON.stringify(settings.settings.value.previewTab))
    url.searchParams.set('language', useEditor().language.value)
    url.searchParams.set('embed', String(settings.settings.value.embed))
    url.searchParams.set('infiniteLoopProtection', String(settings.settings.value.infiniteLoopProtection))
    url.searchParams.set('version', useEditor().version.value)
    url.searchParams.set('hideOptions', String(settings.settings.value.hideOptions))

    return url
  }

  function getEjecutarUrl(): URL {
    const url = new URL('/', 'https://ejecutar.esjs.dev')

    const options = {
      theme: useDark().value ? 'dark' : 'light',
      hidePreview: settings.settings.value.hidePreview,
      previewTab: settings.settings.value.previewTab,
    }

    url.searchParams.set('code', compressToURL(useFiles().getFileContent(FILE_CODE) ?? ''))
    url.searchParams.set('tests', compressToURL(useFiles().getFileContent(FILE_TESTS) ?? ''))
    url.searchParams.set('options', compressToURL(JSON.stringify(options)))

    return url
  }

  function getSharedModuleUrl(code: string): URL {
    return new URL(`/${compressToURL(code)}`, ESJS_CDN)
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
      showCompiledEditor: url.searchParams.get('showCompiledEditor'),
      showCompiledDiff: url.searchParams.get('showCompiledDiff'),
      showSandboxedDiff: url.searchParams.get('showSandboxedDiff'),
      readonlyCode: url.searchParams.get('readonlyCode'),
      readonlyTests: url.searchParams.get('readonlyTests'),
      showAdvanced: url.searchParams.get('showAdvanced'),
      preview: JSON.parse(url.searchParams.get('preview') ?? '{}'),
      previewTab: decodePreviewTab(url),
      language: url.searchParams.get('language'),
      embed: url.searchParams.get('embed'),
      infiniteLoopProtection: url.searchParams.get('infiniteLoopProtection'),
      version: determineVersion(url.searchParams.get('version') ?? '0.x.0'),
      mode: url.searchParams.get('mode'),
      eshtml: decompressFromURL(url.searchParams.get('eshtml') ?? ''),
      escss: decompressFromURL(url.searchParams.get('escss') ?? ''),
    }
  }

  function determineVersion(version: string) {
    if (version === '0.1.0') {
      return '0.x.0'
    }

    if (version === '0.0.1') {
      return '0.0.x'
    }

    return version
  }

  function decodePreviewTab(url: URL) {
    try {
      return JSON.parse(url.searchParams.get('previewTab') || '')
    } catch (error) {
      if (url.searchParams.get('hideConsole') === 'true') {
        return { console: false, flowchart: false, hidden: true }
      }

      return {}
    }
  }

  async function getCodeFromUrl(): Promise<string> {
    const url = new URL(window.location.href)

    const { pathname } = url

    try {
      if (url.searchParams.get('code') !== null && url.searchParams.get('code') !== '') {
        const code = url.searchParams.get('code') ?? ''
        return decompressFromURL(code) ?? INITIAL_CODE
      }

      if (pathname.includes('/github/')) {
        const githubUrl = pathname.replace('/github/', '')
        return await getCodeFromGithub(githubUrl)
      }

      if (pathname.includes('/gist/')) {
        const gistUrl = pathname.replace('/gist/', '')
        return await getCodeFromGist(gistUrl)
      }

      if (pathname.length > 6) {
        return decompressFromURL(pathname.substring(1)) ?? INITIAL_CODE
      }

      if (learnDomain.includes(url.host)) {
        return ''
      }

      return INITIAL_CODE
    } catch (error: any) {
      toast(error.toString())
      return INITIAL_CODE
    }
  }

  function getTestsCodeFromUrl(): string | null {
    const url = new URL(window.location.href)

    return decompressFromURL(url.searchParams.get('tests') ?? '')
  }

  async function getCodeFromGithub(githubUrl: string) {
    const githubUrlParts = githubUrl.split('/')
    const githubUser = githubUrlParts[0]
    const githubRepo = githubUrlParts[1]
    const githubBranch = githubUrlParts[2]
    const githubFilePath = githubUrlParts.slice(3).join('/')
    const githubRawUrl = `https://raw.githubusercontent.com/${githubUser}/${githubRepo}/${githubBranch}/${githubFilePath}`

    const response = await fetch(githubRawUrl)

    if (response.status !== 200) {
      throw new Error('No se pudo obtener el código desde GitHub')
    }

    return response.text()
  }

  async function getCodeFromGist(gistUrl: string) {
    const gistId = gistUrl.split('/')[0]
    const gistRawUrl = `https://gist.githubusercontent.com/${gistId}/raw`

    const response = await fetch(gistRawUrl)

    if (response.status !== 200) {
      throw new Error('No se pudo obtener el código desde Gist')
    }

    return response.text()
  }

  function setSettingsFromUrl() {
    const {
      layout,
      hideOptions,
      hideEditor,
      hidePreview,
      hideConsole,
      hideTests,
      showCompiledEditor,
      showCompiledDiff,
      showSandboxedDiff,
      readonlyCode,
      readonlyTests,
      tests,
      showAdvanced,
      preview,
      previewTab,
      embed,
      infiniteLoopProtection,
      language,
      mode,
    } = useLZShare().decodeSharedUrl()

    settings.setLayout(layout === 'vertical' ? 'vertical' : 'horizontal')
    settings.setHideOptions(hideOptions === 'true')
    settings.setHideEditor(hideEditor === 'true')
    settings.setHidePreview(hidePreview === 'true')
    settings.setHideConsole(hideConsole === 'true')
    settings.setHideTests(hideTests === 'true' || tests === null)
    settings.setShowCompiledEditor(showCompiledEditor === 'true')
    settings.setShowCompiledDiff(showCompiledDiff === 'true')
    settings.setShowSandboxedDiff(showSandboxedDiff === 'true')
    settings.setReadonlyCode(readonlyCode === 'true')
    settings.setReadonlyTests(readonlyTests === 'true')
    settings.setShowAdvanced(showAdvanced === 'true')
    settings.setPreview(preview)
    settings.setPreviewTab(previewTab)
    settings.setEmbed(embed === 'true')
    settings.setInfiniteLoopProtection(infiniteLoopProtection === 'true')
    settings.setMode(mode === 'eshtml' ? 'eshtml' : 'esterminal')

    useEditor().setLanguage(language === 'js' ? 'js' : 'esjs')
  }

  async function loadCodeFromUrl() {
    const files = useFiles()
    files.setLoading(true)

    const { eshtml, escss, mode } = decodeSharedUrl()
    const testsCode = getTestsCodeFromUrl()

    const url = new URL(window.location.href)
    const hasCodeParam = url.searchParams.has('code') && url.searchParams.get('code') !== ''
    const hasGithubPath = url.pathname.includes('/github/')
    const hasGistPath = url.pathname.includes('/gist/')
    const hasCompressedPath = url.pathname.length > 6
    const shouldFetchFromUrl = hasCodeParam || hasGithubPath || hasGistPath || hasCompressedPath

    // Ejemplos (github/gist): actualmente esterminal; en el futuro quizás eshtml.
    // Logo/inicial (/): modo esterminal.
    const isExample = hasGithubPath || hasGistPath
    const isInitial = !shouldFetchFromUrl
    if (isExample || isInitial) {
      settings.setMode('esterminal')
    }

    const effectiveMode = isExample || isInitial ? 'esterminal' : mode
    const code = shouldFetchFromUrl
      ? await getCodeFromUrl()
      : effectiveMode === 'eshtml' ? INITIAL_ESHTML_ESJS : INITIAL_CODE

    if (useEditor().isLearnApp.value) {
      files.updateFile(FILE_CODE, { content: '' })
      files.updateFile(FILE_TESTS, { content: '' })
    }
    else {
      files.updateFile(FILE_CODE, { content: code })
      files.updateFile(FILE_TESTS, { content: testsCode ?? '' })

      if (effectiveMode === 'eshtml') {
        if (eshtml) {
          files.updateFile(FILE_ESHTML, { content: eshtml })
        }
        if (escss) {
          files.updateFile(FILE_ESCSS, { content: escss })
        }
        const firstEsHtmlFile = files.files.value.find(
          f => f.tab === 0 && f.modes?.includes('eshtml'),
        )
        if (firstEsHtmlFile) {
          files.setActiveFile(firstEsHtmlFile.name)
        }
      }
      else if (effectiveMode === 'esterminal') {
        files.setActiveFile(FILE_CODE)
      }
    }

    setTimeout(() => {
      files.setLoading(false)
    })
  }

  return {
    shareCode,
    shareModule,
    decodeSharedUrl,
    getCodeFromUrl,
    getTestsCodeFromUrl,
    setSettingsFromUrl,
    loadCodeFromUrl,
    getEjecutarUrl,
    getSharedUrl,
  }
}
