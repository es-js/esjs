import path from 'path'
import { fileURLToPath } from 'url'
import { describe, it, expect, beforeAll } from 'vitest'
import EsCSS from '../src/index'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const fixturesDir = path.join(__dirname, 'fixtures')

describe('vite-plugin-escss', () => {
  let plugin: ReturnType<typeof EsCSS>

  beforeAll(() => {
    plugin = EsCSS()
    if (Array.isArray(plugin)) {
      throw new Error('Plugin returned array, expected single plugin')
    }
    plugin.configResolved?.({ root: fixturesDir } as any)
  })

  it('transform: compila .escss a CSS', () => {
    const result = plugin.transform!(
      `.tarjeta { mostrar: flex; fondo-color: azul; }`,
      '/ruta/archivo.escss',
    )
    expect(result).toBeDefined()
    expect(result?.code).toContain('display: flex')
    expect(result?.code).toContain('background-color')
    expect(result?.code).not.toContain('mostrar')
    expect(result?.code).not.toContain('fondo-color')
  })

  it('transform: no transforma si id tiene ?from=escss', () => {
    const result = plugin.transform!(
      `.x { display: flex; }`,
      '/ruta/estilos.css?from=escss',
    )
    expect(result).toBeUndefined()
  })

  it('resolveId: resuelve .escss a .css?from=escss cuando el archivo existe', () => {
    const importer = path.join(fixturesDir, 'index.html')
    const resolved = plugin.resolveId!('./estilos.escss', importer)
    expect(resolved).toBeTruthy()
    expect(resolved).toContain('.css')
    expect(resolved).toContain('?from=escss')
    expect(resolved).not.toContain('.escss')
  })

  it('resolveId: devuelve null si el archivo .escss no existe', () => {
    const importer = path.join(fixturesDir, 'index.html')
    const resolved = plugin.resolveId!('./no-existe.escss', importer)
    expect(resolved).toBeNull()
  })

  it('load: devuelve CSS compilado para id con ?from=escss', () => {
    const resolvedId = path.join(fixturesDir, 'estilos.css') + '?from=escss'
    const result = plugin.load!(resolvedId)
    expect(result).toBeDefined()
    expect(result).toHaveProperty('code')
    expect((result as { code: string }).code).toContain('display: flex')
    expect((result as { code: string }).code).toContain('background-color')
    expect((result as { code: string }).code).not.toContain('mostrar')
  })

  it('transformIndexHtml: sustituye link .escss por link al .css (archivo emitido en writeBundle)', () => {
    const handler =
      typeof plugin.transformIndexHtml === 'object' &&
      'handler' in plugin.transformIndexHtml
        ? plugin.transformIndexHtml.handler
        : plugin.transformIndexHtml
    expect(handler).toBeTypeOf('function')

    const html = `
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="./estilos.escss">
</head>
<body></body>
</html>`
    const result = (handler as (html: string) => string)(html)
    expect(result).not.toContain('href="./estilos.escss"')
    expect(result).toContain('rel="stylesheet"')
    expect(result).toContain('href="/assets/estilos.css"')
    expect(result).not.toContain('<style>')
  })

  it('transformIndexHtml: deja el HTML igual si no hay link .escss', () => {
    const handler =
      typeof plugin.transformIndexHtml === 'object' &&
      'handler' in plugin.transformIndexHtml
        ? plugin.transformIndexHtml.handler
        : plugin.transformIndexHtml
    const html =
      '<html><head><link rel="stylesheet" href="./foo.css"></head></html>'
    const result = (handler as (html: string) => string)(html)
    expect(result).toBe(html)
  })

  it('con enabled: false no transforma', () => {
    const disabled = EsCSS({ enabled: false })
    if (Array.isArray(disabled)) throw new Error('Expected single plugin')
    const result = disabled.transform!(
      `.x { mostrar: flex; }`,
      '/ruta/file.escss',
    )
    expect(result).toBeUndefined()
  })
})
