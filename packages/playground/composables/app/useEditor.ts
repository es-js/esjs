import { Ref, ref } from 'vue'

export const loading = ref(true)

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

const importMap: Ref<string> = ref(JSON.stringify({
  imports: {
    '@es-js/terminal': 'https://cdn.jsdelivr.net/npm/@es-js/terminal@1.1.4-beta.1/dist/terminal.es.js',
    '@es-js/prueba': 'https://cdn.jsdelivr.net/npm/@es-js/prueba@0.0.8/+esm',
    '@es-js/tiza': 'https://cdn.jsdelivr.net/npm/@es-js/tiza@1.0.0',
    '@es-js/sandbox': 'https://cdn.jsdelivr.net/npm/@es-js/sandbox@0.0.1/sandbox/+esm',
  },
}))

export const useEditor = () => {
  function setCode(value: string) {
    code.value = value
  }

  function setTestsCode(value: string) {
    testsCode.value = value
  }

  function toggleLanguage() {
    setLanguage(language.value === 'esjs' ? 'js' : 'esjs')
  }

  function setLanguage(value: 'esjs' | 'js') {
    language.value = value
  }

  return {
    loading,
    code,
    testsCode,
    setCode,
    setTestsCode,
    toggleLanguage,
    setLanguage,
    language,
    importMap,
  }
}
