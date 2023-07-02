<script setup lang="ts">
import type { editor } from 'monaco-editor'
import * as monaco from 'monaco-editor'
import type { Ref } from 'vue'
import { onMounted, ref, watch } from 'vue'
import { useEventBus } from '@vueuse/core'
import { transpile } from '@es-js/core'
import debounce from 'lodash.debounce'
import { useMonaco } from '@/composables/useMonaco'
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
  readonly: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:value', 'execute'])

const bus = useEventBus(`editor_${props.name}`)

const monacoHelper = useMonaco()

let monacoInstance: editor.IStandaloneCodeEditor | null = null

const decorations: Ref<any> = ref([])

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

  await monacoHelper.extendJavaScriptLanguage()

  if (props.name === 'code') {
    monacoHelper.configureJavaScriptLanguage()
    monacoHelper.setupMonacoCompletion()
    monacoHelper.setupMonacoFormat()
  }

  monacoInstance = await monacoHelper.createMonacoInstance(monacoEditorElement, props.value, {
    readOnly: props.readonly,
  })

  monacoHelper.setupMonacoSynchronization(monacoInstance, value => emit('update:value', value))
  monacoHelper.setupMonacoCommands(monacoInstance, () => emit('execute'))
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
  if (!monacoInstance)
    return

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
      case 'change-language':
        return changeLanguage(payload)
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
      obfuscatedCode = useEditor().getObfuscatedCode(useEditor().code.value) ?? ''
      break
    case 'tests':
      obfuscatedCode = useEditor().getObfuscatedCode(useEditor().testsCode.value) ?? ''
      break
    default:
      return null
  }

  return monacoInstance?.setValue(obfuscatedCode)
}

async function changeLanguage(language: 'javascript' | 'esjs') {
  if (!monacoInstance)
    return

  const code = monacoInstance.getValue()

  const formattedCode = transpile(code, language === 'esjs')

  monacoInstance.setValue(formattedCode)
}

watch(
  () => props.readonly,
  async () => {
    if (!monacoInstance)
      return

    monacoInstance.updateOptions({
      readOnly: props.readonly,
    })
  },
)
</script>

<template>
  <div :id="props.elementId" />
</template>
