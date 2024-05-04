import type { EjecutarOptions } from './ejecutar'
import { init } from './ejecutar'
import { setupWindow } from './window.js'

export async function setupSandbox(
	ejecutarOptions: EjecutarOptions,
): Promise<void> {
	await setupWindow()

	await init(ejecutarOptions)
}
