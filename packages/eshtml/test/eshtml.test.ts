import { describe, expect, it } from 'vitest'
import { compile } from '../src'
import { formatWithPrettier } from './testUtils'

const eshtml = `<eshtml>
<cabecera></cabecera>

<cuerpo>
  <t1>¡Hola desde EsHTML!</t1>
  <ElementoPersonalizado></ElementoPersonalizado>
</cuerpo>
</eshtml>`

const html = `<html>
<head></head>

<body>
  <h1>¡Hola desde EsHTML!</h1>
  <ElementoPersonalizado></ElementoPersonalizado>
</body>
</html>`

describe('eshtml', () => {
	it('eshtml to html', async () => {
		const compiled = compile(eshtml)

		expect(await formatWithPrettier(compiled)).toBe(
			await formatWithPrettier(html),
		)
	})

	it('html to eshtml', async () => {
		const compiled = compile(html, { from: 'html', to: 'eshtml' })

		expect(await formatWithPrettier(compiled)).toBe(
			await formatWithPrettier(eshtml),
		)
	})
})
