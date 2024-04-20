import { Ref, ref } from 'vue'

export interface SandboxFile {
  name: string;
  content: string;
  active: boolean;
  activeDiff: boolean;
  tab: number;
  icon?: string;
  readonly?: boolean;
  main?: boolean;
  code?: {
    esjs?: string;
    js?: string;
  };
  error?: {
    message: string;
    line: number;
    column: number;
    stack: string;
  };
  sandboxed?: {
    imports: string;
    codeWithoutImports: string;
  };
}

type Files = SandboxFile[];

export const FILE_CODE = 'codigo.esjs'

export const FILE_TESTS = 'pruebas.esjs'

export const FILE_IMPORT_MAP = 'importaciones.json'

export const INITIAL_CODE = `/**
  EsJS: Lenguaje de programación con sintaxis en español basado en JavaScript.
*/

importar { Terminal } desde "@es-js/terminal"
importar { tiza } desde "@es-js/tiza"
importar confetti desde "npm/canvas-confetti/+esm"

asincrono funcion principal() {
  Terminal.limpiar()

  Terminal.escribir(
    "¡Hola mundo desde " + tiza.indigo800.fondoIndigo50(" EsJS ") + "!"
  )

  Terminal.escribir(
    "Aprende más sobre EsJS en " +
      Terminal.enlace(
        "https://es.js.org",
        tiza.indigo800.fondoIndigo50(" https://es.js.org ")
      )
  )

  Terminal.escribir("*".repetir(50)) // Separador

  Terminal.escribir(
    "Este es un ejemplo de como usar la Terminal. Selecciona una opcion:"
  )

  Terminal.escribir("1. Tirar papeles")
  Terminal.escribir("2. Tirar fuegos artificiales")

  const opcion = esperar Terminal.leerNumero()

  si (opcion === 1) {
    tirarPapeles()
  } sino si (opcion === 2) {
    tirarFuegosArtificiales()
  }

  principal()
}

funcion tirarPapeles() {
  consola.escribir("Tirando papeles...")
  confetti()
}

funcion tirarFuegosArtificiales() {
  const duracion = 15 * 1000 // 15 segundos
  const animacionFin = Fecha.ahora() + duracion
  const opcionesPorDefecto = {
    startVelocity: 30,
    spread: 360,
    ticks: 60,
    zIndex: 0,
  }

  funcion aleatorioEnRango(minimo, maximo) {
    retornar Mate.aleatorio() * (maximo - minimo) + minimo
  }

  const intervalo = establecerIntervalo(funcion () {
    const tiempoRestante = animacionFin - Fecha.ahora()

    consola.escribir("Tiempo restante: " + tiempoRestante / 1000 + " segundos")

    si (tiempoRestante <= 0) {
      consola.escribir("Fin de la animación")
      retornar clearInterval(intervalo)
    }

    const cantidadParticulas = 50 * (tiempoRestante / duracion)

    confetti({
      ...opcionesPorDefecto,
      particleCount: cantidadParticulas,
      origin: { x: aleatorioEnRango(0.1, 0.3), y: Mate.aleatorio() - 0.2 },
    })
    confetti({
      ...opcionesPorDefecto,
      particleCount: cantidadParticulas,
      origin: { x: aleatorioEnRango(0.7, 0.9), y: Mate.aleatorio() - 0.2 },
    })
  }, 250)
}

principal()
`

const files: Ref<Files> = ref([
  {
    name: FILE_CODE,
    content: INITIAL_CODE,
    active: true,
    activeDiff: true,
    tab: 0,
    icon: 'i-mdi-code-tags',
    main: true,
  },
  {
    name: FILE_TESTS,
    content: '',
    active: false,
    activeDiff: false,
    tab: 1,
  },
  // {
  //   name: 'lib.esjs',
  //   content: '',
  //   active: false,
  //   tab: 0,
  //   icon: 'i-mdi-code-tags',
  // },
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
    activeDiff: false,
    tab: 0,
    icon: 'i-mdi-json',
    readonly: true,
  },
])

const loading = ref(true)

export const useFiles = () => {
  function updateFile(name: string, value: Partial<SandboxFile>) {
    const file = files.value.find((f: SandboxFile) => f.name === name)

    if (!file) { return }

    file.content = value.content ?? file.content
    file.code = value.code ?? file.code
    file.sandboxed = value.sandboxed ?? file.sandboxed
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

  function getActiveDiffFile() {
    return files.value.find(file => file.activeDiff)
  }

  function setActiveFile(name: string) {
    files.value.forEach((file: SandboxFile) => {
      file.active = file.name === name
    })
  }

  function setActiveDiffFile(name: string) {
    files.value.forEach((file: SandboxFile) => {
      file.activeDiff = file.name === name
    })
  }

  function setLoading(value: boolean) {
    loading.value = value
  }

  return {
    files,
    updateFile,
    getFileContent,
    getFileNameWithExtension,
    getActiveFileContent,
    getActiveFile,
    getActiveDiffFile,
    setActiveFile,
    setActiveDiffFile,
    setLoading,
    loading,
  }
}
