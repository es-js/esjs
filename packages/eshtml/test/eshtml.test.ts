import { describe, expect, it } from 'vitest'
import { compile } from '../src'
import { compareDoms } from '../src/utils/compareDoms'
import { minifyHtml } from './testUtils'

const eshtml = `<!TIPODOC eshtml>
<eshtml idioma="es">
<cabecera>
    <recurso referencia="styles.css" rel="stylesheet">
    <estilo>
      body { background-color: lightblue; }
    </estilo>
</cabecera>

<cuerpo>
  <!-- Comentario -->
  <t1>¡Hola desde EsHTML!</t1>
  <imagen fuente="./logo.png" alternativo="logo">
  <ElementoPersonalizado></ElementoPersonalizado>
</cuerpo>
</eshtml>`

const html = `<!DOCTYPE html>
<html lang="es">
<head>
    <link href="styles.css" rel="stylesheet">
    <style>
      body { background-color: lightblue; }
    </style>
</head>

<body>
  <!-- Comentario -->
  <h1>¡Hola desde EsHTML!</h1>
  <img src="./logo.png" alt="logo">
  <ElementoPersonalizado></ElementoPersonalizado>
</body>
</html>`

describe('compile', () => {
	it('eshtml to html', async () => {
		const compiled = compile(eshtml)

		expect(compiled).toBe(html)
		expect(minifyHtml(compiled)).toBe(minifyHtml(html))
		expect(compareDoms(compiled, html)).toBe(true)
	})

	it('html to eshtml', async () => {
		const compiled = compile(html, { from: 'html', to: 'eshtml' })

		expect(compiled).toBe(eshtml)
		// expect(minifyHtml(compiled)).toBe(minifyHtml(eshtml))
		expect(compareDoms(compiled, eshtml)).toBe(true)
	})
})
