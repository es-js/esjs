import { computed, ref } from 'vue'
import { useShare } from '@/composables/useShare'

const settings = ref({
  layout: 'horizontal',
  hideOptions: false,
  hideEditor: false,
  hidePreview: false,
  hideConsole: false,
  hideTests: true,
  autoCompile: true,
  customHtml: false,
  showAdvanced: false,
  preview: {
    terminal: true,
    flowchart: false,
    html: false,
  },
})

const activePreview = computed((): 'terminal' | 'flowchart' | 'html' => {
  return Object.keys(settings.value.preview).find(key => settings.value.preview[key as keyof typeof settings.value.preview]) as 'terminal' | 'flowchart' | 'html'
})

export const useSettings = () => {
  function setLayout(layout: 'horizontal' | 'vertical') {
    settings.value.layout = layout
  }

  function setHideOptions(hideOptions: boolean) {
    settings.value.hideOptions = hideOptions
  }

  function setHideEditor(hideEditor: boolean) {
    settings.value.hideEditor = hideEditor
  }

  function setHidePreview(hidePreview: boolean) {
    settings.value.hidePreview = hidePreview
  }

  function setHideConsole(hideConsole: boolean) {
    settings.value.hideConsole = hideConsole
  }

  function setHideTests(hideTests: boolean) {
    settings.value.hideTests = hideTests
  }

  function setAutoCompile(autoCompile: boolean) {
    settings.value.autoCompile = autoCompile
  }

  function setCustomHtml(customHtml: boolean) {
    settings.value.customHtml = customHtml
  }

  function setShowAdvanced(showAdvanced: boolean) {
    settings.value.showAdvanced = showAdvanced
  }

  function setPreview(preview: { terminal: boolean; flowchart: boolean; html: boolean }) {
    settings.value.preview = {
      terminal: preview.terminal || false,
      flowchart: preview.flowchart || false,
      html: preview.html || false,
    }

    if (!preview.terminal && !preview.flowchart && !preview.html)
      settings.value.preview.terminal = true
  }

  function setActivePreview(preview: 'terminal' | 'flowchart' | 'html') {
    settings.value.preview = {
      terminal: preview === 'terminal',
      flowchart: preview === 'flowchart',
      html: preview === 'html',
    }
  }

  return {
    settings,
    setLayout,
    setHideOptions,
    setHideEditor,
    setHidePreview,
    setHideConsole,
    setHideTests,
    setAutoCompile,
    setCustomHtml,
    setShowAdvanced,
    setPreview,
    setActivePreview,
    activePreview,
  }
}
