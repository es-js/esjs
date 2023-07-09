import isNumber from 'is-number'
import XTerminal from 'xterminal'
import PCancelable from 'p-cancelable'
import type { Ref } from './reactive'
import { ref, watch } from './reactive'

let xterm: XTerminal | null = null

const innerBuffer: Ref<string | null> = ref(null)
const buffer: Ref<string | null> = ref(null)

let readingValue = false
let readingSecret = false
let readingEnter = false

let watchers: any[] = []
let cancelablePromises: PCancelable<any>[] = []

let terminalElement: HTMLElement | null = null

export enum ExpectedResult {
  porDefecto,
  cadena,
  numero,
}

const PREGUNTA_POR_DEFECTO = '> '

let currentPrompt: string = PREGUNTA_POR_DEFECTO

export const usarTerminal = () => {
  function setupTerminal(elementOrId: HTMLElement | string, options: any = {}) {
    if (typeof elementOrId === 'string')
      elementOrId = document.querySelector(elementOrId) as HTMLElement

    if (!elementOrId)
      return

    terminalElement = elementOrId

    xterm = new XTerminal()

    xterm.mount(terminalElement)

    xterm.pause()

    xterm.on('data', async (data: any) => {
      if (!readingValue)
        return

      if (readingEnter) {
        buffer.value = Math.random().toString()
      }
      else if (readingSecret) {
        if (data.trim() === '' && innerBuffer.value?.trim() === '') {
          xterm?.writeln('')
          await leer(currentPrompt)
          return
        }

        buffer.value = innerBuffer.value
        xterm?.writeln('')
      }
      else if (data.trim() === '') {
        xterm?.writeln('')
        await leer(currentPrompt)
      }
      else {
        buffer.value = data
        xterm?.writeln(data)
      }
    })

    xterm.on('keypress', (event: any) => {
      if (readingEnter) {
        event.cancel()
      }
      else if (readingSecret) {
        const key = event.key.toLowerCase()

        if (key === 'backspace') {
          event.cancel()

          if (innerBuffer.value && innerBuffer.value.length > 0)
            innerBuffer.value = innerBuffer.value.substr(0, innerBuffer.value.length - 1)

          xterm?.clearLast()
          xterm?.write(`${currentPrompt}${'*'.repeat(innerBuffer.value?.length || 1)}`)
          return
        }

        const hasModifier = event.altKey || event.ctrlKey || event.metaKey

        if (key.length !== 1 || hasModifier) {
          event.cancel()
          return
        }

        event.cancel()
        xterm?.clearLast()
        xterm?.write(`${currentPrompt}${'*'.repeat(innerBuffer.value?.length || 1)}`)
        innerBuffer.value += event.key
      }
    })

    setTheme(options.theme || 'dark')
  }

  function destroyTerminal() {
    watchers.map(unwatch => unwatch())
    watchers = []

    cancelablePromises.map(cancelablePromise => cancelablePromise.cancel())
    cancelablePromises = []

    xterm?.dispose()
  }

  function escribir(...args: any[]) {
    args.map((arg) => {
      const type = typeof arg

      switch (type) {
        case 'object':
          return xterm?.writeln(JSON.stringify(arg, null, 2))

        default:
          return xterm?.writeln(String(arg))
      }
    })
  }

  function resetWriteBuffer() {
    xterm?.pause()
    readingValue = false
    readingSecret = false
    readingEnter = false
    currentPrompt = PREGUNTA_POR_DEFECTO
  }

  async function leer(pregunta = PREGUNTA_POR_DEFECTO, tipo: ExpectedResult = ExpectedResult.porDefecto) {
    xterm?.resume()

    currentPrompt = pregunta
    readingValue = true

    const promise = new PCancelable((resolve: any, reject: any, onCancel: any) => {
      if (!xterm)
        return reject(new Error('Terminal not initialized'))

      onCancel.shouldReject = false
      onCancel(() => {
        resetWriteBuffer()
      })

      xterm.write(pregunta)

      const watcher = watch(() => buffer.value, (value) => {
        watcher()
        resetWriteBuffer()
        watchers = watchers.filter(w => w !== watcher)
        cancelablePromises = cancelablePromises.filter(p => p !== promise)

        if (readingEnter)
          resolve(null)
        else
          resolve(handleResult(value ?? '', tipo))
      })

      watchers.push(watcher)
    })

    cancelablePromises.push(promise)

    return promise
  }

  function leerCadena(pregunta = PREGUNTA_POR_DEFECTO) {
    return leer(pregunta, ExpectedResult.cadena)
  }

  function leerNumero(pregunta = PREGUNTA_POR_DEFECTO) {
    return leer(pregunta, ExpectedResult.numero)
  }

  function leerSecreto(pregunta = PREGUNTA_POR_DEFECTO, tipo: ExpectedResult = ExpectedResult.porDefecto) {
    innerBuffer.value = ''
    readingSecret = true
    return leer(pregunta, tipo)
  }

  function leerEnter(pregunta = PREGUNTA_POR_DEFECTO, tipo: ExpectedResult = ExpectedResult.porDefecto) {
    readingEnter = true
    return leer(pregunta, tipo)
  }

  function limpiar() {
    xterm?.clear()
  }

  function handleResult(value: string, expectedResult: ExpectedResult): string | number {
    switch (expectedResult) {
      case ExpectedResult.cadena:
        return String(value.trim())

      case ExpectedResult.numero:
        return Number(value)

      case ExpectedResult.porDefecto:
      default:
        if (isNumber(value))
          return handleResult(value, ExpectedResult.numero)

        return handleResult(value, ExpectedResult.cadena)
    }
  }

  function centrar(texto: string) {
    return `<div style="text-align: center;">${texto}</div>`
  }

  function alinearIzquierda(texto: string) {
    return `<div style="text-align: left;">${texto}</div>`
  }

  function alinearDerecha(texto: string) {
    return `<div style="text-align: right;">${texto}</div>`
  }

  function justificar(texto: string) {
    return `<div style="text-align: justify;">${texto}</div>`
  }

  function setTheme(theme: 'dark' | 'light') {
    terminalElement?.classList.toggle('dark', theme === 'dark')
  }

  function enfocar(): void {
    xterm?.focus()
  }

  return {
    escribir,
    log: escribir,
    leer,
    leerCadena,
    leerNumero,
    leerSecreto,
    leerEnter,
    setupTerminal,
    destroyTerminal,
    limpiar,
    clear: limpiar,
    centrar,
    alinearIzquierda,
    alinearDerecha,
    justificar,
    setTheme,
    enfocar,
  }
}
