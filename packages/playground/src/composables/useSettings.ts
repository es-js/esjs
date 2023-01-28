import { ref } from 'vue'

const settings = ref({
  layout: 'horizontal',
  hideOptions: false,
  hideEditor: false,
  hidePreview: false,
  hideConsole: false,
  autoCompile: true,
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

  function setAutoCompile(autoCompile: boolean) {
    settings.value.autoCompile = autoCompile
  }

  return {
    settings,
    setLayout,
    setHideOptions,
    setHideEditor,
    setHidePreview,
    setHideConsole,
    setAutoCompile,
  }
}