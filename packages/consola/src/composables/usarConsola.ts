import { Terminal } from 'xterm'
import { FitAddon } from 'xterm-addon-fit'
import { WebLinksAddon } from 'xterm-addon-web-links'

const terminal = new Terminal({
  cursorBlink: true,
})
const fitAddon = new FitAddon()
terminal.loadAddon(fitAddon)
terminal.loadAddon(new WebLinksAddon())

export const usarConsola = () => {
  function setupTerminal(terminalElement: HTMLElement) {
    terminal.open(terminalElement)
    fitTerminal()
  }

  function fitTerminal() {
    fitAddon.fit()
  }

  function escribir(...args: any[]) {
    args.map(arg => terminal.writeln(String(arg)))
  }

  async function leer() {
    let buffer = ''
    return new Promise((resolve) => {
      terminal.onData((data: any) => {
        if (data === '\r') {
          terminal.writeln('')
          resolve(buffer)
        }

        buffer += data
      })
    })
  }

  function limpiar() {
    terminal.write('\x1Bc')
  }

  return {
    terminal,
    fitAddon,
    escribir,
    leer,
    setupTerminal,
    fitTerminal,
    limpiar,
  }
}
