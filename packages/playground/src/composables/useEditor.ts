import { prepareCode } from '@es-js/compiler'
import { splitCodeImports, transpile } from '@es-js/core'
import { obfuscate } from 'javascript-obfuscator'
import type { Ref } from 'vue'
import { ref } from 'vue'

export const INITIAL_CODE = `/**
  EsJS: Lenguaje de programación con sintaxis en español basado en JavaScript.
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

const code: Ref<string> = ref(INITIAL_CODE)

const testsCode: Ref<string> = ref('')

const language: Ref<'esjs' | 'js'> = ref('esjs')

export const useEditor = () => {
  function setCode(value: string) {
    code.value = value
  }

  function setTestsCode(value: string) {
    testsCode.value = value
  }

  function getObfuscatedCode(code: string) {
    const transpiledCode = prepareCode(code)

    const splittedCode = splitCodeImports(transpiledCode)

    const obfuscatedCode = obfuscateCode(splittedCode.codeWithoutImports)

    if (!obfuscatedCode)
      return

    return `${splittedCode.imports}

${obfuscatedCode.getObfuscatedCode()}`
  }

  function toggleLanguage() {
    setLanguage(language.value === 'esjs' ? 'js' : 'esjs')
  }

  function setLanguage(value: 'esjs' | 'js') {
    language.value = value
  }

  function obfuscateCode(code: string) {
    return obfuscate(code, {
      compact: true,
      simplify: false,
      controlFlowFlattening: false,
      ignoreImports: true,
    })
  }

  return {
    code,
    testsCode,
    setCode,
    setTestsCode,
    getObfuscatedCode,
    toggleLanguage,
    setLanguage,
    language,
  }
}
