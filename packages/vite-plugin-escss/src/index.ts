import { compile } from '@es-js/escss'
import type { Plugin, ViteDevServer } from 'vite'
import { readFileSync, existsSync, writeFileSync, mkdirSync } from 'fs'
import path from 'path'

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

  const ESCSS_QUERY = '?from=escss'
  const escssAssetsToEmit: Array<{ fileName: string; source: string }> = []

  return {
    name: 'vite-plugin-escss',
    enforce: 'pre',

    configResolved(config) {
      root = config.root
    },

    buildStart() {
      escssAssetsToEmit.length = 0
    },

    // Resolver: .escss → módulo .css para que el build lo trate como CSS y no como asset
    resolveId(sourceId: string, importer?: string) {
      if (!enabled || !sourceId.endsWith('.escss')) return null
      const base = importer ? path.dirname(importer) : root
      const fullPath = path.resolve(base, sourceId)
      if (!existsSync(fullPath)) return null
      return fullPath.replace(/\.escss$/, '.css') + ESCSS_QUERY
    },

    // Cargar: leer .escss, compilar a CSS y devolver como contenido del módulo
    load(id: string) {
      if (!enabled || !id.includes(ESCSS_QUERY)) return null
      const escssPath = id.replace(ESCSS_QUERY, '').replace(/\.css$/, '.escss')
      if (!existsSync(escssPath)) return null
      try {
        const raw = readFileSync(escssPath, 'utf-8')
        const compiled = compile(raw, { from: 'escss', to: 'css' })
        return { code: compiled, map: null }
      } catch (e) {
        console.error(`Failed to compile EsCSS: ${escssPath}`, e)
        return null
      }
    },

    // Handle direct .escss file requests (e.g., <link> tags) en dev
    configureServer(server: ViteDevServer) {
      if (!enabled) return

      server.middlewares.use((req, res, next) => {
        const url = req.url || ''
        if (!url.endsWith('.escss')) return next()

        const cleanUrl = url.split('?')[0]
        const filePath = path.resolve(root, cleanUrl.slice(1))

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

    // Handle .escss imports en JS/TS (por si se importa directamente)
    transform(raw: string, id: string) {
      if (!enabled || !/\.escss$/.test(id)) return
      // No transformar si ya viene de nuestro load (id con ?from=escss)
      if (id.includes(ESCSS_QUERY)) return
      const compiled = compile(raw, { from: 'escss', to: 'css' })
      return { code: compiled, map: null }
    },

    // Build: compilar .escss a CSS; guardar para emitir en writeBundle y actualizar <link>
    transformIndexHtml: {
      order: 'pre',
      handler(html: string) {
        if (!enabled) return html
        return html.replace(
          /<link\s(?=[^>]*rel=["']stylesheet["'])[^>]*href=["']([^"']+\.escss)["'][^>]*\/?>/gi,
          (match, href: string) => {
            const cleanHref = href.replace(/^\//, '').split('?')[0]
            const filePath = path.resolve(root, cleanHref)
            if (!existsSync(filePath)) return match
            try {
              const raw = readFileSync(filePath, 'utf-8')
              const compiled = compile(raw, { from: 'escss', to: 'css' })
              const baseName = path.basename(cleanHref, '.escss') + '.css'
              const fileName = `assets/${baseName}`
              escssAssetsToEmit.push({ fileName, source: compiled })
              return `<link rel="stylesheet" href="/${fileName}">`
            } catch (e) {
              console.error(`Failed to compile EsCSS: ${filePath}`, e)
              return match
            }
          },
        )
      },
    },

    // Build: escribir los .css compilados a disco (a nivel archivo)
    writeBundle(outputOptions: { dir?: string }) {
      if (!enabled || escssAssetsToEmit.length === 0) return
      const outDir = outputOptions.dir
      if (!outDir) return
      for (const { fileName, source } of escssAssetsToEmit) {
        const fullPath = path.join(outDir, fileName)
        mkdirSync(path.dirname(fullPath), { recursive: true })
        writeFileSync(fullPath, source, 'utf-8')
      }
    },
  }
}

// Named export for convenience
export { EsCSS }
