import { useEventBus } from '@vueuse/core/index'
import { Options } from 'prettier'
import parserBabel from 'prettier/parser-babel'
import prettier from 'prettier/standalone'
import { ref, watch } from 'vue'
import { transpile } from '@es-js/core'

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

export const useEditor = () => {
  function toggleLanguage() {
    setLanguage(language.value === 'esjs' ? 'js' : 'esjs')
  }

  function setLanguage(value: 'esjs' | 'js') {
    language.value = value
  }

  function getLanguageExtension() {
    return language.value === 'esjs' ? '.esjs' : '.js'
  }

  function formatCode(code: string, fromLanguage: string = 'esjs', toLanguage: string = 'esjs') {
    const transpiledCode = fromLanguage === 'esjs' ? transpile(code) : code

    const formattedCode = formatWithPrettier(transpiledCode)

    return toLanguage === 'esjs' ? transpile(formattedCode, true) : formattedCode
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
    toggleLanguage,
    setLanguage,
    getLanguageExtension,
    language,
    availableLanguages,
    formatCode,
  }
}
