import { useEventBus } from '@vueuse/core/index'
import { ref, watch } from 'vue'

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

  return {
    loading,
    toggleLanguage,
    setLanguage,
    getLanguageExtension,
    language,
    availableLanguages,
  }
}
