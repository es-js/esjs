import { createIframe } from './utils/render'
import type { EjecutarOptions } from './utils/ejecutar'

export async function createSandbox(elementOrId: HTMLElement | string, options: EjecutarOptions): Promise<HTMLIFrameElement> {
  if (typeof elementOrId === 'string')
    elementOrId = document.getElementById(elementOrId) as HTMLElement

  return createIframe(elementOrId, options)
}

