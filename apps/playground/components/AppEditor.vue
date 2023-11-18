<script setup lang="ts">
import { transpile } from '@es-js/core'
import { ref } from 'vue'
import { isDark } from '~/composables/app/dark'
import { useEditor } from '~/composables/app/useEditor'

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

const editor = useEditor()

const bus = useEventBus(`editor_${props.name}`)

let monacoHelper: any = null

let editorInstance: any = null

const decorations = ref([])

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
  if (!editorInstance || !editorInstance.deltaDecorations || !monacoHelper) {
    return
  }

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
  if (!editorInstance || !editorInstance.deltaDecorations) {
    return
  }

  decorations.value = editorInstance.deltaDecorations(decorations.value, [])
}

function focusEditor() {
  if (!editorInstance) {
    return
  }

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
  let codeToObfuscate: string
  switch (props.name) {
    case 'code':
      codeToObfuscate = useEditor().code.value
      break
    case 'tests':
      codeToObfuscate = useEditor().testsCode.value
      break
    default:
      return null
  }

  const response = await useFetch('/api/code/obfuscate', {
    method: 'POST',
    body: JSON.stringify({
      code: codeToObfuscate,
    }),
  })

  return editorInstance?.setValue(response?.data?.value?.obfuscatedCode)
}

function updateTheme() {
  if (!editorInstance) {
    return
  }

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
      lineNumbersMinChars: 2,
      ...props.options,
    }"
    lang="javascript"
    class="w-full h-full"
    @update:modelValue="emit('update:modelValue', $event)"
    @load="onLoad"
  />
</template>
