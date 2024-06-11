<script setup lang="ts">
import { ref } from 'vue'
import { isDark } from '~/composables/dark'
import { useEditor } from '~/composables/useEditor'
import { FILE_CODE, FILE_TESTS, useFiles } from '~/composables/useFiles'

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

const files = useFiles()

const bus = useEventBus(`editor_${props.name}`)

let monacoHelper: any = null

let editorInstance: any = null

const decorations = ref([])

async function onLoad(instance) {
  editorInstance = instance

  const { useMonacoHelper } = await import('~/composables/useMonacoHelper')

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

function formatCode() {
  return editorInstance?.getAction('editor.action.formatDocument')?.run()
}

async function obfuscate() {
  let codeToObfuscate: string
  switch (props.name) {
    case 'code':
      codeToObfuscate = files.getFileContent(FILE_CODE)
      break
    case 'tests':
      codeToObfuscate = files.getFileContent(FILE_TESTS)
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
    const allFiles = toRaw(files.files.value)

    allFiles.forEach((file) => {
      if (!file.compiled) {
        return
      }

      files.updateFile(file.name, {
        content: language === 'esjs' ? file.compiled.esjs : file.compiled.js,
      })
    })
  },
)

watch(
  isDark,
  () => {
    updateTheme()
  },
  { immediate: true },
)

watch(
  () => props.readonly,
  (readonly) => {
    if (!editorInstance) {
      return
    }

    editorInstance.updateOptions({
      readOnly: readonly,
    })
  },
  { immediate: true },
)
</script>

<template>
  <MonacoEditor
    :model-value="props.modelValue"
    :options="{
      ...editor.EDITOR_DEFAULT_OPTIONS,
      ...props.options,
      theme: isDark ? 'dark' : 'light',
    }"
    lang="javascript"
    class="w-full h-full"
    @update:model-value="emit('update:modelValue', $event)"
    @load="onLoad"
  />
</template>
