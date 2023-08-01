import type { EjecutarOptions } from './utils/ejecutar'
import { init } from './utils/ejecutar'
import { setupWindow } from './utils/window.js'

export async function setupSandbox(ejecutarOptions: EjecutarOptions): Promise<void> {
  await setupWindow()

  init(ejecutarOptions)
}

