import { compile } from '@es-js/escss'

export const useEscssCompiler = () => {
  function compileEscss(content: string): { css: string; error?: string } {
    try {
      return { css: compile(content, { from: 'escss', to: 'css' }) }
    }
    catch (error: any) {
      return { css: content, error: error.message }
    }
  }

  return { compileEscss }
}
