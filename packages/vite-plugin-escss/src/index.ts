import { compile } from '@es-js/escss'
import type { Plugin, ViteDevServer } from 'vite'
import { readFileSync, existsSync } from 'fs'
import { resolve } from 'path'

export interface EsCSSOptions {
  /**
   * Enable or disable the plugin.
   * @default true
   */
  enabled?: boolean
}

/**
 * Vite plugin for EsCSS - CSS with Spanish syntax.
 *
 * This plugin transforms `.escss` files into standard CSS.
 *
 * @example
 * ```ts
 * // vite.config.ts
 * import EsCSS from '@es-js/vite-plugin-escss'
 *
 * export default {
 *   plugins: [EsCSS()]
 * }
 * ```
 *
 * @example
 * ```css
 * // styles.escss
 * .tarjeta {
 *   mostrar: flex;
 *   flex-direccion: columna;
 *   relleno: 1rem;
 * }
 * ```
 */
export default function EsCSS(options: EsCSSOptions = {}): Plugin {
  const { enabled = true } = options
  let root = process.cwd()

  return {
    name: 'vite-plugin-escss',
    enforce: 'pre',

    configResolved(config) {
      root = config.root
    },

    // Handle direct .escss file requests (e.g., <link> tags)
    configureServer(server: ViteDevServer) {
      if (!enabled) return

      server.middlewares.use((req, res, next) => {
        const url = req.url || ''
        if (!url.endsWith('.escss')) return next()

        const cleanUrl = url.split('?')[0]
        const filePath = resolve(root, cleanUrl.slice(1))

        if (!existsSync(filePath)) return next()

        try {
          const raw = readFileSync(filePath, 'utf-8')
          const compiled = compile(raw, { from: 'escss', to: 'css' })
          res.setHeader('Content-Type', 'text/css')
          res.end(compiled)
        } catch (e) {
          console.error(`Failed to compile EsCSS: ${filePath}`, e)
          next()
        }
      })
    },

    // Handle .escss imports in JS/TS
    transform(raw: string, id: string) {
      if (!enabled || !/\.escss$/.test(id)) return

      const compiled = compile(raw, { from: 'escss', to: 'css' })
      return { code: compiled, map: null }
    },
  }
}

// Named export for convenience
export { EsCSS }
