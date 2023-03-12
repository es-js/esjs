import type { Ref } from 'vue'
import { ref } from 'vue'
import { splitCodeImports, transpile } from '@es-js/core'
import { escapeQuotes, sanitizeCode } from '@/composables/utils'

export const INITIAL_CODE = `/**
  EsJS: JavaScript en Español.

  Este código será transpilado a JavaScript, y ejecutado junto a una Terminal.
*/

importar { Terminal } desde '@es-js/terminal'

asincrono funcion inicio() {
  consola.escribir('Inicio de ejecución')

  Terminal.limpiar()

  Terminal.escribir('Ingresa un valor:')

  const resultado = esperar Terminal.leer()

  Terminal.escribir({
    Resultado: resultado,
    Tipo: tipoDe resultado,
  })

  Terminal.escribir('Presiona ENTER para volver a iniciar')

  esperar Terminal.leerEnter()

  esperar inicio()
}

inicio()
`

const DEFAULT_IMPORTS = `import { pruebas, pruebasAsincronas, afirmar, assert, afirmarIguales } from '@es-js/prueba'
import { Terminal } from '@es-js/terminal'
import { html } from '@arrow-js/core'`

const code: Ref<string> = ref(INITIAL_CODE)

const testsCode: Ref<string> = ref('')

const output = ref()

export const useEditor = () => {
  function setCode(value: string) {
    code.value = sanitizeCode(value)
  }

  function setTestsCode(value: string) {
    testsCode.value = sanitizeCode(value)
  }

  function cleanPreviousExecution() {
    output.value = null
  }

  async function execute() {
    cleanPreviousExecution()

    setTimeout(() => {
      output.value = getTranspiledCode()
    })
  }

  function getTranspiledCode() {
    try {
      const transpiledCode = transpile(code.value)
      const splittedCode = splitCodeImports(transpiledCode)
      const transpiledTestsCode = transpile(testsCode.value)
      const splittedTestsCode = splitCodeImports(transpiledTestsCode)

      return {
        defaultImports: DEFAULT_IMPORTS,
        codeImports: splittedCode.imports,
        codeWithoutImports: splittedCode.codeWithoutImports,
        testsCodeImports: splittedTestsCode.imports,
        testsCodeWithoutImports: splittedTestsCode.codeWithoutImports,
      }
    }
    catch (error) {
      const escapedErrorMessage = escapeQuotes(error?.toString())
      output.value = `window._previewException("${escapedErrorMessage}");`
    }
  }

  return {
    code,
    testsCode,
    output,
    execute,
    setCode,
    setTestsCode,
  }
}
