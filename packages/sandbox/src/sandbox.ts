import { init } from './utils/ejecutar'
import { setupWindow } from './utils/window.js'

export async function setupSandbox(ejecutarOptions) {
  await setupWindow()

  init(ejecutarOptions)
}

