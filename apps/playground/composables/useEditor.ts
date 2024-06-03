import { useEventBus } from '@vueuse/core/index'
import type { Options } from 'prettier'
import parserBabel from 'prettier/parser-babel'
import prettier from 'prettier/standalone'
import { ref, watch } from 'vue'
import { compile } from '@es-js/sandbox/compiler'

export const loading = ref(true)

const language = ref('esjs')

const version = ref('0.x.0')

const availableLanguages = [
  [
    {
      label: 'EsJS',
      click: () => {
        language.value = 'esjs'
      },
    },
    {
      label: 'JavaScript',
      click: () => {
        language.value = 'js'
      },
    },
  ],
]

watch(
  language,
  () => {
    useEventBus('editor_code').emit('change-language', language.value)
    useEventBus('editor_tests').emit('change-language', language.value)
  },
  { immediate: true },
)

const isLearnApp = computed(() => {
  const subdomain = useCookie('subdomain')
  return subdomain.value === 'aprender'
})

const EDITOR_DEFAULT_OPTIONS = {
  automaticLayout: true,
  fontFamily: 'Fira Code',
  fontSize: 16,
  renderWhitespace: 'all',
  roundedSelection: true,
  glyphMargin: true,
  lineNumbersMinChars: 2,
}

export const useEditor = () => {
  function setLanguage(value: 'esjs' | 'js') {
    language.value = value
  }

  function getLanguageExtension() {
    return language.value === 'esjs' ? '.esjs' : '.js'
  }

  async function formatCode(code: string, fromLanguage: string = 'esjs', toLanguage: string = 'esjs') {
    const putout = version.value === '0.x.0' ? await import('https://esm.sh/@putout/bundle@2') : undefined

    const compiledCode = fromLanguage === 'esjs'
      ? compile(code, {
        from: 'esjs',
        to: 'js',
        compiler: version.value === '0.x.0' ? 'essucrase' : 'esbabel',
        putout,
      })
      : code

    const formattedCode = formatWithPrettier(compiledCode)

    return toLanguage === 'esjs'
      ? compile(formattedCode, {
        from: 'js',
        to: 'esjs',
        compiler: version.value === '0.x.0' ? 'essucrase' : 'esbabel',
        putout,
      })
      : formattedCode
  }

  function formatWithPrettier(code: string, options?: Partial<Options>) {
    return prettier.format(code, {
      parser: 'babel',
      plugins: [parserBabel],
      semi: false,
      ...options,
    })
  }

  return {
    loading,
    setLanguage,
    getLanguageExtension,
    language,
    availableLanguages,
    version,
    formatCode,
    isLearnApp,
    EDITOR_DEFAULT_OPTIONS,
  }
}
