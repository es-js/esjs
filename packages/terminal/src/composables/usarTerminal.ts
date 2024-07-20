import isNumber from 'is-number'
import XTerminal from 'xterminal'
import PCancelable from 'p-cancelable'

let xterm: XTerminal | null = null

let buffer: string | null = null

let readingValue = false
let readingSecret = false
let readingEnter = false

let cancelablePromises: PCancelable<any>[] = []

let terminalElement: HTMLElement | null = null

export enum ResultadoEsperado {
  porDefecto = 'porDefecto',
  cadena = 'cadena',
  numero = 'numero',
}

const PREGUNTA_POR_DEFECTO = '> '

let currentPrompt: string = PREGUNTA_POR_DEFECTO

export const usarTerminal = () => {
  function iniciar(elementOrId: HTMLElement | string, options: any = {}) {
    if (typeof elementOrId === 'string') {
      elementOrId = document.querySelector(elementOrId) as HTMLElement
    }

    if (!elementOrId) {
      return
    }

    terminalElement = elementOrId

    xterm = new XTerminal()

    xterm.mount(terminalElement)

    xterm.pause()

    xterm.on('data', async (data: any) => {
      if (!readingValue) {
        return
      }

      if (readingEnter) {
        xterm?.emit('input:enter')
      } else if (readingSecret) {
        if (buffer?.trim() === '') {
          xterm?.writeln(currentPrompt)
          return
        }

        xterm?.emit('input', buffer)
        xterm?.writeln('')
      } else if (data.trim() === '') {
        xterm?.writeln(currentPrompt)
      } else {
        xterm?.emit('input', data)
        xterm?.writeln(data)
      }
    })

    xterm.on('keypress', (event: any) => {
      if (readingEnter) {
        event.cancel()
      } else if (readingSecret) {
        const key = event.key.toLowerCase()

        event.cancel()

        if (key === 'backspace' && buffer?.length) {
          buffer = buffer.substring(0, buffer.length - 1)
        } else {
          const hasModifier = event.altKey || event.ctrlKey || event.metaKey

          if (key.length !== 1 || hasModifier) {
            return
          }

          buffer += event.key
        }

        xterm?.clearLast()
        xterm?.write(`${currentPrompt}${'*'.repeat(buffer?.length || 1)}`)
      }
    })

    setTheme(options.theme || 'dark')
  }

  function destruir() {
    cancelablePromises.map((cancelablePromise) => cancelablePromise.cancel())
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
    buffer = null
  }

  async function leer(
    pregunta = PREGUNTA_POR_DEFECTO,
    tipo: ResultadoEsperado = ResultadoEsperado.porDefecto,
  ) {
    xterm?.resume()

    currentPrompt = pregunta
    readingValue = true

    const promise = new PCancelable(
      (resolve: any, reject: any, onCancel: any) => {
        if (!xterm) return reject(new Error('Terminal not initialized'))

        onCancel.shouldReject = false
        onCancel(() => {
          resetWriteBuffer()
        })

        xterm.write(pregunta)

        if (readingEnter) {
          xterm.once('input:enter', () => {
            resetWriteBuffer()
            resolve(null)
          })
        } else {
          xterm.once('input', (value: any) => {
            resetWriteBuffer()
            resolve(handleResult(value ?? '', tipo))
          })
        }
      },
    )

    cancelablePromises.push(promise)

    return promise
  }

  function leerCadena(pregunta = PREGUNTA_POR_DEFECTO) {
    return leer(pregunta, ResultadoEsperado.cadena)
  }

  function leerNumero(pregunta = PREGUNTA_POR_DEFECTO) {
    return leer(pregunta, ResultadoEsperado.numero)
  }

  function leerSecreto(
    pregunta = PREGUNTA_POR_DEFECTO,
    tipo: ResultadoEsperado = ResultadoEsperado.porDefecto,
  ) {
    buffer = ''
    readingSecret = true
    return leer(pregunta, tipo)
  }

  function leerEnter(
    pregunta = PREGUNTA_POR_DEFECTO,
    tipo: ResultadoEsperado = ResultadoEsperado.porDefecto,
  ) {
    readingEnter = true
    return leer(pregunta, tipo)
  }

  function limpiar() {
    xterm?.clear()
  }

  function limpiarUltimaLinea() {
    xterm?.clearLast()
  }

  function handleResult(
    value: string,
    expectedResult: ResultadoEsperado,
  ): string | number {
    switch (expectedResult) {
      case ResultadoEsperado.cadena:
        return String(value.trim())

      case ResultadoEsperado.numero:
        return Number(value)

      default:
        if (isNumber(value))
          return handleResult(value, ResultadoEsperado.numero)

        return handleResult(value, ResultadoEsperado.cadena)
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

  function enlace(url: string, texto?: string, destino = '_nuevo') {
    destino = destino === '_nuevo' ? '_blank' : destino

    return `<a href="${url}" target="${destino}">${texto || url}</a>`
  }

  function setTheme(theme: 'dark' | 'light') {
    terminalElement?.classList.toggle('dark', theme === 'dark')
  }

  function enfocar(): void {
    xterm?.focus()
  }

  function escribirSinSalto(...args: any[]) {
    args.map((arg) => {
      const type = typeof arg

      switch (type) {
        case 'object':
          return xterm?.write(JSON.stringify(arg, null, 2))

        default:
          return xterm?.write(String(arg))
      }
    })
  }

  function configurarColores(fondo: string, frente: string) {
    configurarColorFondo(fondo)
    configurarColorFrente(frente)
  }

  function configurarColorFondo(fondo: string) {
    establecerVariableCss('--xt-bg', fondo)
  }

  function configurarColorFrente(frente: string) {
    establecerVariableCss('--xt-fg', frente)
  }

  function establecerVariableCss(variable: string, valor: string) {
    terminalElement?.style.setProperty(variable, valor)
  }

  return {
    escribir,
    log: escribir,
    imprimir: escribir,
    escribirSinSalto,
    imprimirSinSalto: escribirSinSalto,
    leer,
    leerCadena,
    leerNumero,
    leerSecreto,
    leerEnter,
    iniciar,
    destruir,
    limpiar,
    clear: limpiar,
    limpiarUltimaLinea,
    centrar,
    alinearIzquierda,
    alinearDerecha,
    justificar,
    enlace,
    setTheme,
    enfocar,
    configurarColores,
    configurarColorFondo,
    configurarColorFrente,
    establecerVariableCss,
  }
}
