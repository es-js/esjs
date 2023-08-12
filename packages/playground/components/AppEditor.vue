<script setup lang="ts">
import {transpile} from "@es-js/core"
import { Ref } from "vue"

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  modelValue: {
    type: String,
    required: true,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  options: {
    type: Object,
    default: () => ({}),
  },
})

const emit = defineEmits(['update:modelValue'])

const isDark: Ref<boolean> = useDark()

const editor = useEditor()

const bus = useEventBus(`editor_${props.name}`)

let monacoHelper: any = null

let editorInstance: any = null

const decorations: Ref<any> = ref([])

async function onLoad(instance) {
  editorInstance = instance

  const { useMonacoHelper } = await import('@/composables/monaco/useMonacoHelper')

  monacoHelper = useMonacoHelper()

  if (props.name === 'code') {
    await monacoHelper.setup()
  } else if (props.name === 'tests') {
    // ...
  }

  updateTheme()
}

onMounted(() => {
  setupBusCommands()
})

function decorateError(line: number, column: number) {
  if (!editorInstance || !editorInstance.deltaDecorations || !monacoHelper)
    return

  decorations.value = editorInstance.deltaDecorations(
    decorations.value,
    [
      {
        range: monacoHelper.createRange(line, column, line, column + 1),
        options: {
          className: 'bg-red-900',
          glyphMarginClassName: 'bg-red-500',
        },
      },
    ],
  )
}

function clearDecorations() {
  if (!editorInstance || !editorInstance.deltaDecorations)
    return

  decorations.value = editorInstance.deltaDecorations(decorations.value, [])
}

function focusEditor() {
  if (!editorInstance)
    return

  editorInstance.focus()
}

function setupBusCommands() {
  bus.on((event: string, payload?: any) => {
    switch (event) {
      case 'focus':
        return focusEditor()
      case 'decorate-error':
        return decorateError(payload.line, payload.column)
      case 'clear-decorations':
        return clearDecorations()
      case 'format':
        return formatCode()
      case 'obfuscate':
        return obfuscate()
      // case 'change-language':
      //   return changeLanguage(payload)
      default:
        return null
    }
  })
}

async function formatCode() {
  return editorInstance?.getAction('editor.action.formatDocument')?.run()
}

async function obfuscate() {
  let obfuscatedCode: string
  switch (props.name) {
    case 'code':
      obfuscatedCode = useEditor().getObfuscatedCode(useEditor().code.value) ?? ''
      break
    case 'tests':
      obfuscatedCode = useEditor().getObfuscatedCode(useEditor().testsCode.value) ?? ''
      break
    default:
      return null
  }

  return editorInstance?.setValue(obfuscatedCode)
}

function updateTheme() {
  if (!editorInstance)
    return

  editorInstance.updateOptions({
    theme: isDark.value ? 'dark' : 'light',
  })
}

watch(
  editor.language,
  (language) => {
    const formattedCode = transpile(props.modelValue, language === 'esjs')

    if (formattedCode !== props.modelValue) {
      emit('update:modelValue', formattedCode)
    }
  },
)

watch(
    isDark,
    () => {
      updateTheme()
    },
    { immediate: true },
)
</script>

<template>
  <MonacoEditor
    :model-value="props.modelValue"
    :options="{
      automaticLayout: true,
      theme: isDark ? 'dark' : 'light',
      fontFamily: 'Fira Code',
      fontSize: 16,
      renderWhitespace: 'all',
      roundedSelection: true,
      glyphMargin: true,
      ...props.options,
    }"
    lang="javascript"
    class="w-full h-full"
    @update:modelValue="emit('update:modelValue', $event)"
    @load="onLoad"
  />
</template>
