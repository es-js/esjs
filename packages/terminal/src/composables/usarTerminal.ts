import { Terminal } from 'xterm'
import { FitAddon } from 'xterm-addon-fit'
import { WebLinksAddon } from 'xterm-addon-web-links'

const xterm = new Terminal({
  cursorBlink: true,
})
const fitAddon = new FitAddon()
xterm.loadAddon(fitAddon)
xterm.loadAddon(new WebLinksAddon())

export const usarTerminal = () => {
  function setupTerminal(terminalElement: HTMLElement) {
    xterm.open(terminalElement)
    fitTerminal()
  }

  function fitTerminal() {
    fitAddon.fit()
  }

  function escribir(...args: any[]) {
    args.map(arg => xterm.writeln(String(arg)))
  }

  async function leer() {
    return new Promise((resolve) => {
      let buffer = ''
      xterm.onData((data: any) => {
        if (data === '\r') {
          xterm.writeln('')
          resolve(buffer)
        }

        buffer += data
      })
    })
  }

  function limpiar() {
    xterm.write('\x1Bc')
  }

  return {
    xterm,
    fitAddon,
    escribir,
    log: escribir,
    leer,
    setupTerminal,
    fitTerminal,
    limpiar,
    clear: limpiar,
  }
}
