import { Registry } from 'monaco-textmate'
import esjsSyntax from '@es-js/language-tools/esjs.tmLanguage.json'
import * as monaco from 'monaco-editor'
import { editor, languages } from 'monaco-editor'
import { wireTmGrammars } from 'monaco-editor-textmate'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import snippets from '@es-js/language-tools/esjs.code-snippets.json'
import {
  constantLanguage,
  keywordControl,
  metaVariable,
  storageType,
  supportFunction,
  transpile,
  variableLanguage,
} from '@es-js/core'
import { watch } from 'vue'
import darktheme from 'theme-vitesse/themes/vitesse-dark.json'
import lightTheme from 'theme-vitesse/themes/vitesse-light.json'
import { formatCode } from '@/composables/utils'
import { isDark } from '@/composables/dark'
import IStandaloneCodeEditor = editor.IStandaloneCodeEditor
import ProviderResult = languages.ProviderResult
import CompletionList = languages.CompletionList
import CompletionItem = languages.CompletionItem
import IStandaloneEditorConstructionOptions = editor.IStandaloneEditorConstructionOptions

interface Snippet {
  prefix: string
  body: string[]
  description: string
}

export const useMonaco = () => {
  function defineThemes() {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    monaco.editor.defineTheme('dark', darktheme)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    monaco.editor.defineTheme('light', lightTheme)
  }

  function createMonacoInstance(monacoEditorElement: HTMLElement, code: string, options?: IStandaloneEditorConstructionOptions): IStandaloneCodeEditor {
    defineThemes()

    const monacoInstance = monaco.editor.create(monacoEditorElement, {
      value: code,
      automaticLayout: false,
      theme: 'dark',
      fontFamily: 'Fira Code',
      fontSize: 16,
      language: 'esjs',
      renderWhitespace: 'all',
      roundedSelection: true,
      glyphMargin: true,
      ...options,
    })

    watch(isDark, () => {
      if (isDark.value)
        monaco.editor.setTheme('dark')
      else
        monaco.editor.setTheme('light')
    }, { immediate: true })

    return monacoInstance
  }

  async function setupMonacoGrammar(monacoInstance: IStandaloneCodeEditor) {
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

    await wireTmGrammars(monaco, registry, grammars, monacoInstance)
  }

  async function setupMonacoCompletion() {
    monaco.languages.registerCompletionItemProvider('esjs',
      {
        triggerCharacters: ['>'],
        provideCompletionItems: (model, position): ProviderResult<CompletionList> => {
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

    monaco.languages.registerCompletionItemProvider('esjs', {
      provideCompletionItems: (model: monaco.editor.ITextModel, position: monaco.Position): monaco.languages.CompletionList => {
        const suggestions: CompletionItem[] = []

        const word = model.getWordUntilPosition(position)
        const range = {
          startLineNumber: position.lineNumber,
          endLineNumber: position.lineNumber,
          startColumn: word.startColumn,
          endColumn: word.endColumn,
        }

        // Agrega sugerencias para los tokens de control de flujo del lenguaje EsJS
        for (const [esjsKeyword] of [
          ...keywordControl,
          ...constantLanguage,
          ...variableLanguage,
          ...storageType,
          ...metaVariable,
          ...supportFunction,
        ]) {
          suggestions.push({
            label: esjsKeyword,
            kind: monaco.languages.CompletionItemKind.Keyword,
            insertText: esjsKeyword,
            range,
          })
        }

        (Object.entries(snippets) as [string, Snippet][]).forEach(([key, { body, description }]) => {
          suggestions.push({
            label: key,
            kind: monaco.languages.CompletionItemKind.Snippet,
            insertText: body.join('\n'),
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: description,
            range,
          })
        })

        return {
          suggestions,
        }
      },
    })
  }

  async function setupMonacoSynchronization(monacoInstance: IStandaloneCodeEditor, callback: (value: string) => void) {
    monacoInstance.onDidChangeModelContent(() => {
      callback(monacoInstance.getValue())
    })
  }

  async function setupMonacoCommands(monacoInstance: IStandaloneCodeEditor, callback: () => void) {
    monacoInstance.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
      callback()
    })
  }

  async function setupMonacoFormat() {
    monaco.languages.registerDocumentFormattingEditProvider('esjs', {
      provideDocumentFormattingEdits: (model): ProviderResult<monaco.languages.TextEdit[]> => {
        const esjsCode = model.getValue()
        const jsCode = transpile(esjsCode)
        const formattedJsCode = formatCode(jsCode)
        const formattedEsJsCode = transpile(formattedJsCode, true)
        return [
          {
            text: formattedEsJsCode,
            range: model.getFullModelRange(),
          },
        ]
      },
    })
  }

  return {
    createMonacoInstance,
    setupMonacoGrammar,
    setupMonacoCompletion,
    setupMonacoSynchronization,
    setupMonacoCommands,
    setupMonacoFormat,
  }
}
