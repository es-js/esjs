import { getSandboxUrls } from '~/utils/sandboxDev'
import packageJson from '../../package.json'

/**
 * Configuración del sandbox (runtime y estilos). Si NUXT_PUBLIC_SANDBOX_DEV_URL está definida,
 * apunta al servidor de desarrollo; si no, usa CDN.
 */
export function useSandboxDevConfig() {
  const config = useRuntimeConfig().public
  const devUrl = (config.sandboxDevUrl as string) || undefined
  return getSandboxUrls({
    devUrl,
    cdnVersion: packageJson.devDependencies['@es-js/sandbox'],
  })
}
