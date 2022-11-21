import { ref } from 'vue'
import { transpile } from '@es-js/transpiler/dist/index'
import { usarConsola } from '@es-js/esvue'
import { importsRegex, pureRegex, replace } from '@/utils/format'

const consola = usarConsola()

const code = ref('')

const output = ref()

export const useEditor = () => {
  function setCode(value: string) {
    code.value = value
  }

  function cleanPreviousExecution() {
    consola.limpiar()
    output.value = null
  }

  async function execute() {
    cleanPreviousExecution()

    setTimeout(() => {
      output.value = transpile(code.value)
    })
  }

  function transpileCode(code: string) {
    // ignore imports so Babel doesn't transpile it
    const transpiledCode = replace(code, importsRegex)

    const hasImports = Boolean(code.match(importsRegex))
    const imports = code.match(importsRegex)?.join('\n') ?? ''

    // this is passed to `updateIframe`
    const iframeCode = hasImports ? `${imports}\n${transpiledCode}` : transpiledCode

    // this is passed to `updateSource`
    // ignore /*#__PURE__*/ from transpiled output to reduce noise
    const sourceCode = replace(transpiledCode, pureRegex)

    return {
      iframeCode,
      sourceCode,
    }
  }

  return {
    code,
    output,
    execute,
    transpileCode,
    setCode,
  }
}
