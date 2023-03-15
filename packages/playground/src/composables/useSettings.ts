import { ref } from 'vue'

const settings = ref({
  layout: 'horizontal',
  hideOptions: false,
  hideEditor: false,
  hidePreview: false,
  hideConsole: false,
  hideTests: true,
  autoCompile: true,
  customHtml: false,
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
  }
}
