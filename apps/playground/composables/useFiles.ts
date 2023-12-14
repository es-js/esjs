import { Ref, ref } from 'vue'

interface File {
  name: string;
  content: string;
  active: boolean;
  tab: number;
  icon?: string;
  readonly?: boolean;
  main?: boolean;
}

type Files = File[];

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
    "Aprende más sobre EsJS en " + "<a href='https://es.js.org' target='_blank'>" + tiza.indigo800.fondoIndigo50(" https://es.js.org ") + "</a>"
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
    tab: 0,
    icon: 'i-mdi-code-tags',
    main: true,
  },
  {
    name: FILE_TESTS,
    content: '',
    active: false,
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
    tab: 0,
    icon: 'i-mdi-json',
    readonly: true,
  },
])

const loading = ref(true)

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
    setActiveFile,
    setLoading,
    loading,
  }
}
