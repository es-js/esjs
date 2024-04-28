import {
  constantLanguage,
  keywordControl,
  metaVariable,
  storageType,
  supportFunction,
  variableLanguage,
} from '@es-js/esbabel/keywords'
import snippets from '@es-js/language-tools/esjs.code-snippets.json'
import * as monaco from 'monaco-editor'
import darktheme from 'theme-vitesse/themes/vitesse-dark.json'
import lightTheme from 'theme-vitesse/themes/vitesse-light.json'
import { useEditor } from '~/composables/useEditor'

const esjsTokenizer: Record<string, any> = {
  keywords: [
    'romper', 'caso', 'capturar', 'clase', 'continuar', 'const',
    'constructor', 'depurador', 'porDefecto', 'eliminar', 'hacer', 'sino',
    'exportar', 'extiende', 'falso', 'finalmente', 'para', 'de', 'funcion',
    'obtener', 'si', 'importar', 'en', 'instanciaDe', 'var', 'crear', 'nulo',
    'retorno', 'establecer', 'super', 'elegir', 'simbolo', 'ambiente', 'lanzar', 'verdadero',
    'intentar', 'tipoDe', 'indefinido', 'global', 'vacio', 'mientras', 'con', 'rendimiento',
    'asincrono', 'esperar', 'de',
  ],
}

export const useMonacoHelper = () => {
  function defineThemes() {
    // @ts-expect-error
    monaco.editor.defineTheme('dark', darktheme)

    // @ts-expect-error
    monaco.editor.defineTheme('light', lightTheme)
  }

  /**
   * @author Pranomvignesh (https://github.com/Pranomvignesh)
   * @see https://github.com/Pranomvignesh/extend-monaco-language-tokenizer
   */
  async function extendJavaScriptLanguage() {
    const allLangs = monaco.languages.getLanguages()

    const javascript: any = allLangs.find(({ id }) => id === 'javascript')

    if (!javascript) { throw new Error('No se pudo encontrar el lenguaje de JavaScript') }

    const { conf, language: jsLang } = await javascript.loader()

    for (const key in esjsTokenizer) {
      const value = esjsTokenizer[key]
      if (key === 'tokenizer') {
        for (const category in value) {
          const tokenDefs = value[category]
          if (!jsLang.tokenizer.hasOwnProperty(category)) { jsLang.tokenizer[category] = [] }

          if (Array.isArray(tokenDefs)) { jsLang.tokenizer[category].unshift.apply(jsLang.tokenizer[category], tokenDefs) }
        }
      } else if (Array.isArray(value)) {
        if (!jsLang.hasOwnProperty(key)) { jsLang[key] = [] }

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
    monaco.languages.registerCompletionItemProvider('javascript', {
      provideCompletionItems: (model: monaco.editor.ITextModel, position: monaco.Position): monaco.languages.CompletionList => {
        const suggestions: monaco.languages.CompletionItem[] = []

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

        (Object.entries(snippets) as [string, any][]).forEach(([key, { body, description }]) => {
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

  function setupMonacoFormat() {
    monaco.languages.registerDocumentFormattingEditProvider('javascript', {
      provideDocumentFormattingEdits: async(model: monaco.editor.ITextModel): monaco.languages.TextEdit[] => {
        const code = model.getValue()

        const currentLanguage = useEditor().language.value === 'esjs' ? 'esjs' : 'js'

        const formattedCode = await useEditor().formatCode(code, currentLanguage, currentLanguage)

        return [
          {
            text: formattedCode,
            range: model.getFullModelRange(),
          },
        ]
      },
    })
  }

  async function setup() {
    defineThemes()

    await extendJavaScriptLanguage()
    configureJavaScriptLanguage()
    setupMonacoCompletion()
    setupMonacoFormat()
  }

  function createRange(startLineNumber: number, startColumn: number, endLineNumber: number, endColumn: number) {
    return new monaco.Range(startLineNumber, startColumn, endLineNumber, endColumn)
  }

  return {
    setup,
    createRange,
  }
}
