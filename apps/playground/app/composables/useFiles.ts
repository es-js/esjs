import { type CompileOptions } from '@es-js/core'
import { type SandboxFileError } from '@es-js/sandbox/utils/processSandboxedFiles'
import { type Ref, ref } from 'vue'
import { useCompiler } from '~/composables/useCompiler'
import { useEditor } from '~/composables/useEditor'
import { useSettings } from '~/composables/useSettings'
import { useEscssCompiler } from '~/composables/useEscssCompiler'
import { useEshtmlCompiler } from '~/composables/useEshtmlCompiler'
import { getSandboxUrls } from '~/utils/sandboxDev'
import packageJson from '../../package.json'

const cdnVersion = packageJson.devDependencies['@es-js/sandbox']

function buildImportMapContent(sandboxRuntimeUrl: string) {
  return `{
  "imports": {
    "@es-js/sandbox/runtime" : "${sandboxRuntimeUrl}",
    "@es-js/" : "https://esm.run/@es-js/",
    "npm/" : "https://cdn.jsdelivr.net/npm/"
  }
}
`
}

export type PlaygroundMode = 'esterminal' | 'eshtml'

export interface SandboxFile {
  name: string;
  content: string;
  active: boolean;
  activeDiff: boolean;
  tab: number;
  icon?: string;
  readonly?: boolean;
  main?: boolean;
  modes?: PlaygroundMode[];
  compiled?: {
    esjs?: string;
    js?: string;
  };
  compiledCss?: string;
  compiledHtml?: string;
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

export const FILE_ESCSS = 'estilos.escss'

export const FILE_ESHTML = 'indice.eshtml'

export const INITIAL_ESCSS = `/* EsCSS: CSS en Español */

cuerpo {
  fuente-familia: sistema-ui, sans-serif;
  margen: 0;
  relleno: 1rem;
  fondo-color: gris-claro;
  color: negro;
}

#aplicacion {
  mostrar: flex;
  flex-direccion: columna;
  brecha: 1rem;
}

.tarjeta {
  mostrar: flex;
  flex-direccion: columna;
  brecha: 1rem;
  fondo-color: blanco;
  borde-radio: 0.5rem;
  relleno: 1.5rem;
  caja-sombra: 0 4px 6px rgba(0, 0, 0, 0.1);
}

#btn-principal {
  relleno: 0.5rem 1rem;
  fondo-color: azul-real;
  color: blanco;
  borde: ninguno;
  borde-radio: 0.25rem;
  cursor: puntero;
}

#btn-principal:encima {
  fondo-color: azul-medianoche;
}
`

export const INITIAL_ESHTML = `<!-- EsHTML: HTML en Español -->

<!TIPODOC eshtml>
<eshtml idioma="es">
  <cabecera>
    <meta conjunto-caracteres="UTF-8">
    <meta nombre="viewport" contenido="width=device-width, initial-scale=1.0">
    <titulo>Mi Página EsHTML</titulo>
  </cabecera>

  <cuerpo>
    <division id="aplicacion">
      <t1>¡Hola desde EsJS + EsHTML + EsCSS!</t1>
      <division class="tarjeta">
        <boton id="btn-principal">Hacer clic</boton>
        <parrafo id="contador">Clics: 0</parrafo>
      </division>
    </division>
  </cuerpo>
</eshtml>
`

export const INITIAL_ESHTML_ESJS = `mut clics = 0

const boton = documento.obtenerElementoPorId('btn-principal')
const contador = documento.obtenerElementoPorId('contador')

boton.addEventListener('click', () => {
  clics++
  contador.textContent = \`Clics: \${clics}\`
})
`

export const INITIAL_CODE = `/**
  EsJS: Lenguaje de programación con sintaxis en español basado en JavaScript.
*/

importar { Terminal } desde "@es-js/terminal"
importar { tiza } desde "@es-js/tiza"
importar papeles desde "npm/canvas-confetti/+esm"

asincrono funcion principal() {
  Terminal.limpiar()

  Terminal.escribir(
    \`¡Hola mundo desde \$\{tiza.indigo800.fondoIndigo50("EsJS")\}!\`
  )

  const enlace = Terminal.enlace("https://es.js.org", tiza.indigo800.fondoIndigo50("https://es.js.org"))
  Terminal.escribir(\`Aprende más sobre EsJS en \$\{enlace\}\`)

  Terminal.escribir("*".repetir(50)) // Separador

  Terminal.escribir(
    "Este es un ejemplo de como usar la Terminal. Ingresa una opción:"
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
  papeles()
}

funcion tirarFuegosArtificiales() {
  const duracion = 5000 // 5 segundos
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

    consola.escribir(\`Tiempo restante: \$\{tiempoRestante / 1000\} segundos\`)

    si (tiempoRestante <= 0) {
      consola.escribir("Fin de la animación")
      retornar clearInterval(intervalo)
    }

    const cantidadParticulas = 50 * (tiempoRestante / duracion)

    papeles({
      ...opcionesPorDefecto,
      particleCount: cantidadParticulas,
      origin: { x: aleatorioEnRango(0.1, 0.3), y: Mate.aleatorio() - 0.2 },
    })
    papeles({
      ...opcionesPorDefecto,
      particleCount: cantidadParticulas,
      origin: { x: aleatorioEnRango(0.7, 0.9), y: Mate.aleatorio() - 0.2 },
    })
  }, 250)
}

principal()
`

const files: Ref<Files> = ref([])
const loading = ref(true)
const compiler = useCompiler()

function getInitialFiles(sandboxDevUrl: string | undefined): Files {
  const { sandboxRuntimeUrl } = getSandboxUrls({ devUrl: sandboxDevUrl, cdnVersion })
  return [
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
      name: FILE_ESHTML,
      content: INITIAL_ESHTML,
      active: false,
      activeDiff: false,
      tab: 0,
      icon: 'i-mdi-language-html5',
      modes: ['eshtml'],
    },
    {
      name: FILE_ESCSS,
      content: INITIAL_ESCSS,
      active: false,
      activeDiff: false,
      tab: 0,
      icon: 'i-mdi-language-css3',
      modes: ['eshtml'],
    },
    {
      name: FILE_TESTS,
      content: '',
      active: false,
      activeDiff: false,
      tab: 1,
      modes: ['esterminal'],
    },
    {
      name: FILE_IMPORT_MAP,
      content: buildImportMapContent(sandboxRuntimeUrl),
      active: false,
      activeDiff: false,
      tab: 0,
      icon: 'i-mdi-json',
      readonly: true,
      modes: ['esterminal'],
    },
  ]
}

export const useFiles = () => {
  if (files.value.length === 0) {
    const config = useRuntimeConfig().public
    const devUrl = (config.sandboxDevUrl as string) || undefined
    files.value = getInitialFiles(devUrl)
  }
  function setFileContent(name: string, content: string) {
    updateFile(name, { content })
  }

  function updateFile(name: string, value: Partial<SandboxFile>) {
    const file = files.value.find((f: SandboxFile) => f.name === name)

    if (!file) { return }

    file.content = value.content ?? file.content
    file.compiled = value.compiled ?? file.compiled
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

  async function compileFiles(options: CompileOptions) {
    const filesToCompile = files
      .value
      .filter((file: SandboxFile) => ['esjs', 'js'].includes(file.name.split('.').slice(-1)[0]))

    for (const file of filesToCompile) {
      if (!file.compiled) {
        file.compiled = {
          esjs: '',
          js: '',
        }
      }

      const { compiled: compiledEsJS, error: errorEsJS } = tryToCompile(file.content, {
        ...options,
        to: 'esjs',
      })

      const { compiled: compiledJS, error: errorJS } = tryToCompile(file.content, {
        ...options,
        to: 'js',
      })

      file.compiled.esjs = compiledEsJS
      file.compiled.js = compiledJS
      file.error = errorEsJS || errorJS || undefined

      if (file.error) {
        file.sandboxed = undefined
      }
    }

    if (useSettings().settings.value.mode === 'eshtml') {
      const escssCompiler = useEscssCompiler()
      const escssFiles = files.value.filter((file: SandboxFile) => file.name.endsWith('.escss'))

      for (const file of escssFiles) {
        const { css } = escssCompiler.compileEscss(file.content)
        file.compiledCss = css
      }

      const eshtmlCompiler = useEshtmlCompiler()
      const eshtmlFiles = files.value.filter((file: SandboxFile) => file.name.endsWith('.eshtml'))

      for (const file of eshtmlFiles) {
        const { html } = eshtmlCompiler.compileEshtml(file.content)
        file.compiledHtml = html
      }
    }
  }

  function tryToCompile(code: string, options: CompileOptions) {
    let compiled = ''
    let error: SandboxFileError | undefined
    try {
      compiled = compiler.compile(code, options)
    } catch (exception: any) {
      compiled = code
      const line = exception.loc?.line ?? exception.line ?? 1
      const column = exception.loc?.column ?? exception.column ?? 1

      error = {
        message: exception.message,
        line,
        column,
        stack: exception.stack,
      }
    }
    return {
      compiled,
      error,
    }
  }

  return {
    files,
    setFileContent,
    updateFile,
    getFileContent,
    getFileNameWithExtension,
    getActiveFileContent,
    getActiveFile,
    getActiveDiffFile,
    setActiveFile,
    setActiveDiffFile,
    setLoading,
    compileFiles,
    loading,
  }
}
