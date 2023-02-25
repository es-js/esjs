import { Terminal } from 'xterm'
import { FitAddon } from 'xterm-addon-fit'
import { WebLinksAddon } from 'xterm-addon-web-links'
import type { Ref } from 'vue'
import { ref, watch } from 'vue'
import isNumber from 'is-number'
import stripAnsi from 'strip-ansi'
import { clearLine, handleBackspace, isPrintableKeyCode, prompt } from '../utils/xtermUtils'

const xterm = new Terminal({
  cursorBlink: true,
  disableStdin: true,
  convertEol: true,
})
const fitAddon = new FitAddon()
xterm.loadAddon(fitAddon)
xterm.loadAddon(new WebLinksAddon())

const buffer: Ref<string | null> = ref(null)

const readingSecret: Ref<boolean> = ref(false)
const readingEnter: Ref<boolean> = ref(false)

export enum ExpectedResult {
  porDefecto,
  cadena,
  numero,
}

export const usarTerminal = () => {
  function setupTerminal(terminalElement: HTMLElement) {
    xterm.open(terminalElement)

    fitTerminal()

    xterm.onKey(onKeyHandler())
  }

  function fitTerminal() {
    fitAddon.fit()
  }

  function escribir(...args: any[]) {
    args.map((arg) => {
      const type = typeof arg

      switch (type) {
        case 'object':
          return writeOnXterm(JSON.stringify(arg, null, 2))

        default:
          return writeOnXterm(String(arg))
      }
    })
  }

  function writeOnXterm(value: string): void {
    return xterm.writeln(value)
  }

  async function leer(tipo: ExpectedResult = ExpectedResult.porDefecto) {
    return new Promise((resolve) => {
      xterm.options.disableStdin = false

      buffer.value = null

      if (!readingEnter.value)
        prompt(xterm)

      const unwatch = watch(
        buffer,
        (value) => {
          if (value === null)
            return

          resolve(handleResult(value, tipo))
          xterm.options.disableStdin = true
          readingSecret.value = false
          readingEnter.value = false
          unwatch()
        },
      )
    })
  }

  function leerCadena() {
    return leer(ExpectedResult.cadena)
  }

  function leerNumero() {
    return leer(ExpectedResult.numero)
  }

  function leerSecreto(tipo: ExpectedResult = ExpectedResult.porDefecto) {
    readingSecret.value = true
    return leer(tipo)
  }

  function leerEnter(tipo: ExpectedResult = ExpectedResult.porDefecto) {
    readingEnter.value = true
    return leer(tipo)
  }

  function limpiar() {
    xterm.write('\x1Bc') // TODO: Replace with `xterm.clear()` when EsJS Transpiler fixed.
  }

  function onKeyHandler() {
    let innerBuffer = ''

    return async (event: { key: string; domEvent: KeyboardEvent }) => {
      switch (event.domEvent.key) {
        case 'c': {
          if (event.domEvent.ctrlKey) {
            prompt(xterm)
            innerBuffer = ''
          }
          break
        }

        case 'v': {
          if (event.domEvent.ctrlKey) {
            try {
              const text = await window?.navigator?.clipboard?.readText()
              innerBuffer += text
              xterm.write(text)
            }
            catch (error) {}
          }

          break
        }

        case 'l': {
          if (event.domEvent.ctrlKey)
            limpiar()

          break
        }

        case 'Backspace': {
          innerBuffer = handleBackspace(xterm, innerBuffer)
          return
        }

        case 'Enter': {
          innerBuffer = innerBuffer.trim()

          if (innerBuffer.length === 0 && !readingEnter.value) {
            innerBuffer = ''
            return
          }

          buffer.value = innerBuffer

          if (!readingEnter.value)
            xterm.writeln('')

          innerBuffer = ''
        }
      }

      if (xterm.options.disableStdin)
        return

      const hasModifier = event.domEvent.altKey || event.domEvent.ctrlKey || event.domEvent.metaKey

      if (!hasModifier && isPrintableKeyCode(event.domEvent.keyCode)) {
        innerBuffer += event.key

        if (readingSecret.value) {
          setTimeout(() => {
            clearLine(xterm)
            xterm.write(`> ${''.padStart(innerBuffer.length, '*')}`)
          })
        }
        else if (readingEnter.value) {
          setTimeout(() => {
            clearLine(xterm)
          })
        }
      }
    }
  }

  function handleResult(value: string, expectedResult: ExpectedResult): string | number {
    switch (expectedResult) {
      case ExpectedResult.cadena:
        return String(value)

      case ExpectedResult.numero:
        return Number(value)

      case ExpectedResult.porDefecto:
      default:
        if (isNumber(value))
          return handleResult(value, ExpectedResult.numero)

        return value
    }
  }

  function centrar(texto: string) {
    const anchoTerminal = xterm.cols
    const lineas = texto.trim().split('\n')
    const espaciosPorLinea = lineas.map((linea) => {
      const longitudLinea = stripAnsi(linea).length

      if (longitudLinea >= anchoTerminal)
        return ''

      const espacios = anchoTerminal - longitudLinea

      return ' '.repeat(Math.floor(espacios / 2))
    })
    const resultado = lineas.map((linea, i) => {
      const espacios = espaciosPorLinea[i]
      return espacios + linea + espacios
    })
    return resultado.join('\n')
  }

  function alinearIzquierda(texto: string) {
    const anchoTerminal = xterm.cols
    const lineas = texto.trim().split('\n')
    const resultado = lineas.map((linea) => {
      const longitudLinea = stripAnsi(linea).length
      const espacios = anchoTerminal - longitudLinea
      return linea + ' '.repeat(espacios)
    })
    return resultado.join('\n')
  }

  function alinearDerecha(texto: string) {
    const anchoTerminal = xterm.cols
    const lineas = texto.trim().split('\n')
    const resultado = lineas.map((linea) => {
      const longitudLinea = stripAnsi(linea).length
      const espacios = anchoTerminal - longitudLinea
      return ' '.repeat(espacios) + linea
    })
    return resultado.join('\n')
  }

  function justificar(texto: string) {
    const anchoTerminal = xterm.cols
    const lineas = texto.trim().split('\n')
    const resultado = lineas.map((linea) => {
      const palabras = linea.split(' ')
      const longitudPalabras = palabras.map(palabra => stripAnsi(palabra).length)
      const longitudTotal = longitudPalabras.reduce((a, b) => a + b, 0)
      const espaciosFaltantes = anchoTerminal - longitudTotal
      const cantidadEspacios = palabras.length - 1
      const espaciosPorPalabra = cantidadEspacios > 0 ? Math.floor(espaciosFaltantes / cantidadEspacios) : 0
      const espaciosExtra = cantidadEspacios > 0 ? espaciosFaltantes % cantidadEspacios : 0
      const espaciosEntrePalabras = ' '.repeat(espaciosPorPalabra)
      const resultadoPalabras = palabras.map((palabra, i) => {
        const espaciosExtraPalabra = i < espaciosExtra ? 1 : 0
        return palabra + espaciosEntrePalabras + ' '.repeat(espaciosExtraPalabra + espaciosPorPalabra)
      })
      return resultadoPalabras.join('')
    })
    return resultado.join('\n')
  }

  return {
    xterm,
    fitAddon,
    escribir,
    log: escribir,
    leer,
    leerCadena,
    leerNumero,
    leerSecreto,
    leerEnter,
    setupTerminal,
    fitTerminal,
    limpiar,
    clear: limpiar,
    centrar,
    alinearIzquierda,
    alinearDerecha,
    justificar,
  }
}
