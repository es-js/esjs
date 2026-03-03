import { compile } from '@es-js/eshtml'

export const useEshtmlCompiler = () => {
  function compileEshtml(content: string): { html: string; error?: string } {
    try {
      return { html: compile(content, { from: 'eshtml', to: 'html' }) }
    }
    catch (error: any) {
      return { html: content, error: error.message }
    }
  }

  return { compileEshtml }
}
