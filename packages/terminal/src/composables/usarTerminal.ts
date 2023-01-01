import { Terminal } from 'xterm'
import { FitAddon } from 'xterm-addon-fit'
import { WebLinksAddon } from 'xterm-addon-web-links'
import type { Ref } from 'vue'
import { ref, watch } from 'vue'
import isNumber from 'is-number'
import stringify from 'string.ify'
import { clearLine, handleBackspace, isPrintableKeyCode, prompt } from '../utils/xtermUtils'

const xterm = new Terminal({
  cursorBlink: true,
  disableStdin: true,
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
          return writeOnXterm(stringify.configure({ pretty: false })(arg))

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
  }
}
