import * as monaco from 'monaco-editor'
import { editor, languages } from 'monaco-editor'
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
import { formatCode } from '@es-js/compiler'
import { isDark } from '@/composables/dark'
import { esjsTokenizer } from '@/language-tools/esjsTokenizer'
import { useEditor } from '@/composables/useEditor'
import IStandaloneCodeEditor = editor.IStandaloneCodeEditor
import ProviderResult = languages.ProviderResult
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

  async function createMonacoInstance(monacoEditorElement: HTMLElement, code: string, options?: IStandaloneEditorConstructionOptions): IStandaloneCodeEditor {
    defineThemes()

    const monacoInstance = monaco.editor.create(monacoEditorElement, {
      value: code,
      automaticLayout: true,
      theme: 'dark',
      fontFamily: 'Fira Code',
      fontSize: 16,
      language: 'javascript',
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

  /**
   * @author Pranomvignesh (https://github.com/Pranomvignesh)
   * @see https://github.com/Pranomvignesh/extend-monaco-language-tokenizer
   */
  async function extendJavaScriptLanguage() {
    const allLangs = monaco.languages.getLanguages()
    const { conf, language: jsLang } = await allLangs.find(({ id }) => id === 'javascript').loader()

    for (const key in esjsTokenizer) {
      const value = esjsTokenizer[key]
      if (key === 'tokenizer') {
        for (const category in value) {
          const tokenDefs = value[category]
          if (!jsLang.tokenizer.hasOwnProperty(category))
            jsLang.tokenizer[category] = []

          if (Array.isArray(tokenDefs))
            jsLang.tokenizer[category].unshift.apply(jsLang.tokenizer[category], tokenDefs)
        }
      }
      else if (Array.isArray(value)) {
        if (!jsLang.hasOwnProperty(key))
          jsLang[key] = []

        jsLang[key].unshift.apply(jsLang[key], value)
      }
    }
  }

  function configureJavaScriptLanguage() {
    monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
      lib: ['ESNext', 'ES2015'],
      target: monaco.languages.typescript.ScriptTarget.ESNext,
      allowNonTsExtensions: true,
    })

    monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
      noSyntaxValidation: true,
      noSemanticValidation: true,
      noSuggestionDiagnostics: true,
    })
  }

  function setupMonacoCompletion() {
    // monaco.languages.registerCompletionItemProvider('esjs',
    //   {
    //     triggerCharacters: ['>'],
    //     provideCompletionItems: (model, position): ProviderResult<CompletionList> => {
    //       // TODO: Implementar https://github.com/microsoft/monaco-editor/issues/221#issuecomment-1085787520.
    //       const codePre: string = model.getValueInRange({
    //         startLineNumber: position.lineNumber,
    //         startColumn: 1,
    //         endLineNumber: position.lineNumber,
    //         endColumn: position.column,
    //       })
    //
    //       const tag = codePre.match(/.*<(\w+)>$/)?.[1]
    //
    //       if (!tag)
    //         return
    //
    //       const word = model.getWordUntilPosition(position)
    //
    //       return {
    //         suggestions: [
    //           {
    //             label: `</${tag}>`,
    //             kind: monaco.languages.CompletionItemKind.EnumMember,
    //             insertText: `$1</${tag}>`,
    //             insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    //             range: {
    //               startLineNumber: position.lineNumber,
    //               endLineNumber: position.lineNumber,
    //               startColumn: word.startColumn,
    //               endColumn: word.endColumn,
    //             },
    //           },
    //         ],
    //       }
    //     },
    //   })

    monaco.languages.registerCompletionItemProvider('javascript', {
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
            detail: esjsKeyword,
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

  function setupMonacoSynchronization(monacoInstance: IStandaloneCodeEditor, callback: (value: string) => void) {
    monacoInstance.onDidChangeModelContent(() => {
      callback(monacoInstance.getValue())
    })
  }

  function setupMonacoCommands(monacoInstance: IStandaloneCodeEditor, callback: () => void) {
    monacoInstance.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
      callback()
    })
  }

  function setupMonacoFormat() {
    monaco.languages.registerDocumentFormattingEditProvider('javascript', {
      provideDocumentFormattingEdits: (model): ProviderResult<monaco.languages.TextEdit[]> => {
        let code = model.getValue()

        if (useEditor().language.value === 'esjs')
          code = transpile(code)

        let formattedCode = formatCode(code)

        if (useEditor().language.value === 'esjs')
          formattedCode = transpile(formattedCode, true)

        return [
          {
            text: formattedCode,
            range: model.getFullModelRange(),
          },
        ]
      },
    })
  }

  return {
    extendJavaScriptLanguage,
    configureJavaScriptLanguage,
    createMonacoInstance,
    setupMonacoCompletion,
    setupMonacoSynchronization,
    setupMonacoCommands,
    setupMonacoFormat,
  }
}
