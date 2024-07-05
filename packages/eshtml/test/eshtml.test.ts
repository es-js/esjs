import { describe, expect, it } from 'vitest'
import { compile } from '../src'
import { compareDoms } from '../src/utils/compareDoms'
import { minifyHtml } from './testUtils'

const eshtml = `<eshtml idioma="es">
<cabecera></cabecera>

<cuerpo>
  <!-- Comentario -->
  <t1>¡Hola desde EsHTML!</t1>
  <ElementoPersonalizado></ElementoPersonalizado>
</cuerpo>
</eshtml>`

const html = `<html lang="es">
<head></head>

<body>
  <!-- Comentario -->
  <h1>¡Hola desde EsHTML!</h1>
  <ElementoPersonalizado></ElementoPersonalizado>
</body>
</html>`

describe('compile', () => {
	it('eshtml to html', async () => {
		const compiled = compile(eshtml)

		expect(minifyHtml(compiled)).toBe(minifyHtml(html))
		expect(compareDoms(compiled, html)).toBe(true)
	})

	it('html to eshtml', async () => {
		const compiled = compile(html, { from: 'html', to: 'eshtml' })

		expect(minifyHtml(compiled)).toBe(minifyHtml(eshtml))
		expect(compareDoms(compiled, eshtml)).toBe(true)
	})
})
