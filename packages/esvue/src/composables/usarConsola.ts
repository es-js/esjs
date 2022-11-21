import { ref } from 'vue'
import { Terminal } from 'xterm'
import { FitAddon } from 'xterm-addon-fit'
import { WebLinksAddon } from 'xterm-addon-web-links'

const terminal = ref(new Terminal({
  cursorBlink: true,
}))

const fitAddon = new FitAddon()

export const usarConsola = () => {
  function setupTerminal() {
    terminal.value.loadAddon(fitAddon)
    terminal.value.loadAddon(new WebLinksAddon())
  }

  function escribir(...args: any[]) {
    args.map(arg => terminal.value.writeln(String(arg)))
  }

  async function leer() {
    let buffer = ''
    return new Promise((resolve) => {
      terminal.value.onData((data: any) => {
        if (data === '\r') {
          terminal.value.writeln('')
          resolve(buffer)
        }

        buffer += data
      })
    })
  }

  function limpiar() {
    terminal.value.write('\x1Bc')
  }

  return {
    terminal,
    fitAddon,
    escribir,
    leer,
    setupTerminal,
    limpiar,
  }
}
