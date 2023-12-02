import { computed, ref } from 'vue'

const settings = ref({
  layout: 'horizontal',
  hideOptions: false,
  hideEditor: false,
  hideOutput: false,
  hidePreview: false,
  hideConsole: false,
  hideTests: true,
  readonlyCode: false,
  readonlyTests: false,
  autoCompile: true,
  customHtml: false,
  showAdvanced: false,
  preview: {
    terminal: true,
  },
  previewTab: {
    console: true,
    flowchart: false,
    hidden: false,
  },
  embed: false,
})

const activePreview = computed((): 'terminal' | 'flowchart' | 'html' => {
  return Object.keys(settings.value.preview).find(key => settings.value.preview[key as keyof typeof settings.value.preview]) as 'terminal' | 'flowchart' | 'html'
})

const activePreviewTab = computed((): 'console' | 'flowchart' | 'hidden' => {
  return Object.keys(settings.value.previewTab).find(key => settings.value.previewTab[key as keyof typeof settings.value.previewTab]) as 'console' | 'flowchart' | 'hidden'
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

  function setHideOutput(hideOutput: boolean) {
    settings.value.hideOutput = hideOutput
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

  function setReadonlyCode(readonlyCode: boolean) {
    settings.value.readonlyCode = readonlyCode
  }

  function setReadonlyTests(readonlyTests: boolean) {
    settings.value.readonlyTests = readonlyTests
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
    }

    if (!preview.terminal && !preview.flowchart && !preview.html) {
      settings.value.preview.terminal = true
    }
  }

  function setPreviewTab(previewTab: { console: boolean; flowchart: boolean; hidden: boolean }) {
    settings.value.previewTab = {
      console: previewTab.console || false,
      flowchart: previewTab.flowchart || false,
      hidden: !previewTab.console && !previewTab.flowchart,
    }

    if (!previewTab.console && !previewTab.flowchart && !previewTab.hidden) {
      settings.value.previewTab.console = true
    }
  }

  function setActivePreview(preview: 'terminal' | 'flowchart' | 'html') {
    settings.value.preview = {
      terminal: preview === 'terminal',
    }
  }

  function setActivePreviewTab(previewTab: 'console' | 'flowchart' | 'hidden') {
    settings.value.previewTab = {
      console: previewTab === 'console',
      flowchart: previewTab === 'flowchart',
      hidden: previewTab === 'hidden',
    }
  }

  function setEmbed(embed: boolean) {
    settings.value.embed = embed
  }

  return {
    settings,
    setLayout,
    setHideOptions,
    setHideEditor,
    setHideOutput,
    setHidePreview,
    setHideConsole,
    setHideTests,
    setReadonlyCode,
    setReadonlyTests,
    setAutoCompile,
    setCustomHtml,
    setShowAdvanced,
    setPreview,
    setPreviewTab,
    setActivePreview,
    setActivePreviewTab,
    setEmbed,
    activePreview,
    activePreviewTab,
  }
}
