import { ref } from 'vue'
import { splitCodeImports, transpile } from '@es-js/core'
import { useShare } from '@/composables/useShare'
import { escapeQuotes } from '@/composables/utils'

const INITIAL_CODE = `/**
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

const { code: sharedCode } = useShare().decompressSharedUrl()

const code = ref(sharedCode || INITIAL_CODE)

const output = ref()

export const useEditor = () => {
  function setCode(value: string) {
    if (!value.endsWith('\n'))
      value += '\n'

    code.value = value
  }

  function cleanPreviousExecution() {
    output.value = null
  }

  async function execute() {
    cleanPreviousExecution()

    setTimeout(() => {
      try {
        output.value = transpile(code.value)
      }
      catch (error) {
        const escapedErrorMessage = escapeQuotes(error?.toString())
        output.value = `_previewException("${escapedErrorMessage}");`
      }
    })
  }

  function transpileCode(code: string) {
    return splitCodeImports(code)
  }

  return {
    code,
    output,
    execute,
    transpileCode,
    setCode,
  }
}
