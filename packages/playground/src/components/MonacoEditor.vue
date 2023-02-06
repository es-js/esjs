<script setup lang="ts">
import type { editor } from 'monaco-editor'
import * as monaco from 'monaco-editor'
import { onMounted, ref } from 'vue'
import { useEventBus } from '@vueuse/core'
import { useMonaco } from '@/composables/useMonaco'

const props = defineProps({
  value: {
    type: String,
    required: true,
  },
  elementId: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['update:value', 'execute'])

const bus = useEventBus('editor')

const monacoHelper = useMonaco()

let monacoInstance: editor.IStandaloneCodeEditor | null = null

const decorations = ref([])

onMounted(async () => {
  await setupMonaco()

  setupBusCommands()
})

async function setupMonaco() {
  const monacoEditorElement = document.getElementById(props.elementId)

  if (!monacoEditorElement)
    return

  monacoInstance = monacoHelper.createMonacoInstance(monacoEditorElement, props.value)
  await monacoHelper.setupMonacoGrammar(monacoInstance)
  await monacoHelper.setupMonacoCompletion()
  await monacoHelper.setupMonacoSynchronization(monacoInstance, value => emit('update:value', value))
  await monacoHelper.setupMonacoCommands(monacoInstance, () => emit('execute'))
}

async function decorateError(line: number, column: number) {
  if (!monacoInstance || !monacoInstance.deltaDecorations)
    return

  decorations.value = monacoInstance.deltaDecorations(
    decorations.value,
    [
      {
        range: new monaco.Range(line, column, line, column + 1),
        options: {
          className: 'bg-red-900',
          glyphMarginClassName: 'bg-red-500',
        },
      },
    ],
  )
}

function clearDecorations() {
  if (!monacoInstance || !monacoInstance.deltaDecorations)
    return

  decorations.value = monacoInstance.deltaDecorations(decorations.value, [])
}

function focusEditor() {
  monacoInstance.focus()
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
      default:
        return null
    }
  })
}
</script>

<template>
  <div :id="props.elementId" />
</template>
