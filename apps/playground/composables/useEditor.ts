import { useEventBus } from '@vueuse/core/index'
import { Options } from 'prettier'
import parserBabel from 'prettier/parser-babel'
import prettier from 'prettier/standalone'
import { ref, watch } from 'vue'
import { compile } from '@es-js/core'

export const loading = ref(true)

const language = ref('esjs')

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

export const useEditor = () => {
  function setLanguage(value: 'esjs' | 'js') {
    language.value = value
  }

  function getLanguageExtension() {
    return language.value === 'esjs' ? '.esjs' : '.js'
  }

  function formatCode(code: string, fromLanguage: string = 'esjs', toLanguage: string = 'esjs') {
    const compiledCode = fromLanguage === 'esjs' ? compile(code) : code

    const formattedCode = formatWithPrettier(compiledCode)

    return toLanguage === 'esjs' ? compile(formattedCode, true) : formattedCode
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
    formatCode,
    isLearnApp,
  }
}
