import type { OrchestratorFile as File } from '../orchestrator'
import { orchestrator as store } from '../orchestrator'

export const MAIN_FILE = 'codigo.esjs'
export const MAIN_TESTS_FILE = 'pruebas.esjs'

export async function compileFile({ filename, code, compiled }: File) {
  if (!code.trim()) {
    store.errors = []
    return
  }

  if (!filename.endsWith('.vue')) {
    compiled.js = compiled.ssr = code
    store.errors = []
    return
  }

  // Clear errors.
  store.errors = []
}

