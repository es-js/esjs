import { ref } from 'vue'

interface File {
  name: string;
  content: string;
  active: boolean;
  tab: number;
  icon?: string;
  readonly?: boolean;
}

type Files = File[];

export const FILE_CODE = 'codigo.esjs'

export const FILE_TESTS = 'pruebas.esjs'

export const FILE_IMPORT_MAP = 'importaciones.json'

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

const files: Ref<Files> = ref([
  {
    name: FILE_CODE,
    content: INITIAL_CODE,
    active: true,
    tab: 0,
    icon: 'i-mdi-code-tags',
  },
  {
    name: FILE_TESTS,
    content: '',
    active: false,
    tab: 1,
  },
  {
    name: FILE_IMPORT_MAP,
    content: `{
  "imports": {
    "@es-js/" : "https://esm.run/@es-js/",
    "npm/" : "https://cdn.jsdelivr.net/npm/"
  }
}
`,
    active: false,
    tab: 0,
    icon: 'i-mdi-json',
    readonly: true,
  },
])

export const useFiles = () => {
  function updateFile(name: string, content: string) {
    const file = files.value.find(file => file.name === name)

    if (!file) { return }

    file.content = content
  }

  function getFileContent(name: string) {
    return files.value.find(file => file.name === name)?.content ?? ''
  }

  function getFileNameWithExtension(name: string) {
    const nameWithoutExtension = name.split('.').slice(0, -1).join('.')

    const extension = name.split('.').slice(-1)[0]

    if (!['esjs', 'js'].includes(extension)) {
      return name
    }

    return nameWithoutExtension + useEditor().getLanguageExtension()
  }

  function getActiveFileContent() {
    return files.value.find(file => file.active)?.content
  }

  function getActiveFile() {
    return files.value.find(file => file.active)
  }

  function setActiveFile(name: string) {
    files.value.forEach((file) => {
      file.active = file.name === name
    })
  }

  return {
    files,
    updateFile,
    getFileContent,
    getFileNameWithExtension,
    getActiveFileContent,
    getActiveFile,
    setActiveFile,
  }
}
