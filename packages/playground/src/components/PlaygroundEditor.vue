<script setup lang="ts">
import * as monaco from 'monaco-editor'
import { onMounted, ref } from 'vue'
import { Registry } from 'monaco-textmate'
import { wireTmGrammars } from 'monaco-editor-textmate'
import esjsSyntax from '@es-js/language-tools/esjs.tmLanguage.json'
import { useEventBus } from '@vueuse/core'
import { useEditor } from '@/composables/useEditor'
import vsCodeDarkConverted from '@/assets/vscode-dark-converted.json'

const editor = useEditor()

const bus = useEventBus('editor')

let monacoEditor = null

const decorations = ref([])

onMounted(async () => {
  await setupMonaco()

  setupBusCommands()
})

async function setupMonaco() {
  const monacoEditorElement = document.getElementById('monacoEditorElement')

  if (!monacoEditorElement)
    return

  monaco.editor.defineTheme('vs-code-dark-converted', vsCodeDarkConverted)

  monacoEditor = monaco.editor.create(monacoEditorElement, {
    value: editor.code.value,
    automaticLayout: true,
    theme: 'vs-code-dark-converted',
    fontFamily: 'Fira Code',
    fontSize: 16,
    language: 'esjs',
    renderWhitespace: 'all',
    roundedSelection: true,
    glyphMargin: true,
  })

  await setupMonacoGrammar()
  await setupMonacoCompletion()
  await setupMonacoSynchronization()
  await setupMonacoCommands()
}

async function setupMonacoGrammar() {
  const registry = new Registry({
    getGrammarDefinition: async () => {
      return {
        format: 'json',
        content: esjsSyntax,
      }
    },
  })

  const grammars = new Map()
  grammars.set('esjs', 'source.esjs')

  monaco.languages.register({ id: 'esjs' })

  await wireTmGrammars(monaco, registry, grammars, monacoEditor)
}

async function setupMonacoCompletion() {
  monaco.languages.registerCompletionItemProvider('esjs',
    {
      triggerCharacters: ['>'],
      provideCompletionItems: (model, position) => {
        // TODO: Implementar https://github.com/microsoft/monaco-editor/issues/221#issuecomment-1085787520.
        const codePre: string = model.getValueInRange({
          startLineNumber: position.lineNumber,
          startColumn: 1,
          endLineNumber: position.lineNumber,
          endColumn: position.column,
        })

        const tag = codePre.match(/.*<(\w+)>$/)?.[1]

        if (!tag)
          return

        const word = model.getWordUntilPosition(position)

        return {
          suggestions: [
            {
              label: `</${tag}>`,
              kind: monaco.languages.CompletionItemKind.EnumMember,
              insertText: `$1</${tag}>`,
              insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              range: {
                startLineNumber: position.lineNumber,
                endLineNumber: position.lineNumber,
                startColumn: word.startColumn,
                endColumn: word.endColumn,
              },
            },
          ],
        }
      },
    })
}

async function setupMonacoSynchronization() {
  editor.setCode(monacoEditor.getValue())
  monacoEditor.onDidChangeModelContent(() => {
    editor.setCode(monacoEditor.getValue())
  })
}

async function setupMonacoCommands() {
  monacoEditor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
    editor.execute()
  })
}

async function decorateError(line: number, column: number) {
  decorations.value = monacoEditor.deltaDecorations(
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
  decorations.value = monacoEditor.deltaDecorations(decorations.value, [])
}

function focusEditor() {
  monacoEditor.focus()
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
  <div id="monacoEditorElement" ref="monacoEditor" />
</template>
