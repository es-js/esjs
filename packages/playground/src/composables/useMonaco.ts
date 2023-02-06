import { Registry } from 'monaco-textmate'
import esjsSyntax from '@es-js/language-tools/esjs.tmLanguage.json'
import * as monaco from 'monaco-editor'
import { editor } from 'monaco-editor'
import { wireTmGrammars } from 'monaco-editor-textmate'
import vsCodeDarkConverted from '@/assets/vscode-dark-converted.json'
import IStandaloneCodeEditor = editor.IStandaloneCodeEditor

export const useMonaco = () => {
  function createMonacoInstance(monacoEditorElement: HTMLElement, code: string): IStandaloneCodeEditor {
    monaco.editor.defineTheme('vs-code-dark-converted', vsCodeDarkConverted)
    return monaco.editor.create(monacoEditorElement, {
      value: code,
      automaticLayout: true,
      theme: 'vs-code-dark-converted',
      fontFamily: 'Fira Code',
      fontSize: 16,
      language: 'esjs',
      renderWhitespace: 'all',
      roundedSelection: true,
      glyphMargin: true,
    })
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

  return {
    createMonacoInstance,
    setupMonacoGrammar,
    setupMonacoCompletion,
    setupMonacoSynchronization,
    setupMonacoCommands,
  }
}
