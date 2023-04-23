<script setup lang="ts">
import type { editor } from 'monaco-editor'
import * as monaco from 'monaco-editor'
import { onMounted, ref } from 'vue'
import { useEventBus } from '@vueuse/core'
import { ResizeObserver } from 'vue-resize'
import { useMonaco } from '@/composables/useMonaco'
import 'vue-resize/dist/vue-resize.css'
import debounce from 'lodash.debounce'
import { obfuscateCode } from '@/composables/utils'
import { useEditor } from '@/composables/useEditor'

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
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

const bus = useEventBus(`editor_${props.name}`)

const monacoHelper = useMonaco()

let monacoInstance: editor.IStandaloneCodeEditor | null = null

const decorations = ref([])

const onResizeDebounced = debounce(() => {
  monacoInstance?.layout()
}, 10)

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
  await monacoHelper.setupMonacoFormat()
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
      case 'fit':
        return onResizeDebounced()
      case 'format':
        return formatCode()
      case 'obfuscate':
        return obfuscate()
      default:
        return null
    }
  })
}

async function formatCode() {
  return monacoInstance?.getAction('editor.action.formatDocument')?.run()
}

async function obfuscate() {
  let obfuscatedCode: string
  switch (props.name) {
    case 'code':
      obfuscatedCode = useEditor().getObfuscatedCode() ?? ''
      break
    case 'tests':
      obfuscatedCode = useEditor().getObfuscatedTestsCode() ?? ''
      break
    default:
      return null
  }

  return monacoInstance?.setValue(obfuscatedCode)
}
</script>

<template>
  <div :id="props.elementId">
    <ResizeObserver @notify="onResizeDebounced" />
  </div>
</template>
