import { useEventBus } from '@vueuse/core/index'
import type { Options } from 'prettier'
import parserBabel from 'prettier/parser-babel'
import prettier from 'prettier/standalone'
import { ref, watch } from 'vue'
import { useCompiler } from '~/composables/useCompiler'

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
  fontFamily: 'Fira Mono',
  fontSize: 16,
  renderWhitespace: 'all',
  roundedSelection: true,
  glyphMargin: true,
  lineNumbersMinChars: 2,
}

const compiler = useCompiler()

export const useEditor = () => {
  function setLanguage(value: 'esjs' | 'js') {
    language.value = value
  }

  function getLanguageExtension() {
    return language.value === 'esjs' ? '.esjs' : '.js'
  }

  async function formatCode(code: string, fromLanguage: string = 'esjs', toLanguage: string = 'esjs') {
    const compiledCode = fromLanguage === 'esjs'
      ? await compiler.compile(code, {
        from: 'esjs',
        to: 'js',
        compiler: version.value === '0.x.0' ? 'essucrase' : 'esbabel',
      })
      : code

    const formattedCode = formatWithPrettier(compiledCode)

    return toLanguage === 'esjs'
      ? await compiler.compile(formattedCode, {
        from: 'js',
        to: 'esjs',
        compiler: version.value === '0.x.0' ? 'essucrase' : 'esbabel',
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
