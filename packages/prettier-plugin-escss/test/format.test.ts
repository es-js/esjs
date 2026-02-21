import { describe, it, expect } from 'vitest'
import { format } from 'prettier'
import EsCSSPlugin from '../src/index'
import { compile } from '@es-js/escss'

const formatOptions = {
  parser: 'escss',
  plugins: [EsCSSPlugin],
  printWidth: 80,
}

describe('prettier-plugin-escss', () => {
  it('formats EsCSS and returns valid EsCSS (not raw CSS)', async () => {
    const input = `.tarjeta{mostrar:flex;ancho:100%;color-fondo:azul;}`
    const output = await format(input, formatOptions)

    expect(output).toBeDefined()
    expect(typeof output).toBe('string')
    // Formatted output should be EsCSS (Spanish property names), not CSS
    expect(output).toContain('mostrar')
    expect(output).toContain('ancho')
    expect(output).toContain('color-fondo')
    expect(output).not.toContain('display:')
    expect(output).not.toContain('width:')
    expect(output).not.toContain('background-color:')
  })

  it('formats EsCSS and result compiles to expected CSS', async () => {
    const input = `.caja { mostrar: flex; ancho: 100%; }`
    const output = await format(input, formatOptions)

    const compiled = compile(output, { from: 'escss', to: 'css' })
    expect(compiled).toContain('display: flex')
    expect(compiled).toContain('width: 100%')
  })

  it('applies Prettier formatting (indentation, newlines)', async () => {
    const input = `.a{color:rojo;}.b{color:azul;}`
    const output = await format(input, formatOptions)

    // Should have newlines between rules
    expect(output).toMatch(/\n/)
    expect(output).toContain('color')
    expect(output).toContain('rojo')
    expect(output).toContain('azul')
  })
})
