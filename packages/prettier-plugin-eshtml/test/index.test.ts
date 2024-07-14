import { format } from 'prettier'
import { describe, expect, it } from 'vitest'

describe('prettier-plugin-eshtml', () => {
	it('formats EsHTML code', async () => {
		const code = `<!TIPODOC eshtml>
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

		const expected = `<!TIPODOC eshtml>
<eshtml idioma="es">
  <cabecera>
    <recurso referencia="styles.css" rel="stylesheet">
    <estilo>
      body {
        background-color: lightblue;
      }
    </estilo>
  </cabecera>

  <cuerpo>
    <!-- Comentario -->
    <t1>¡Hola desde EsHTML!</t1>
    <imagen fuente="./logo.png" alternativo="logo">
    <ElementoPersonalizado></ElementoPersonalizado>
  </cuerpo>
</eshtml>
`

		expect(
			await format(code, {
				plugins: ['./dist/index.cjs'],
				filepath: 'fuente/indice.eshtml',
				parser: 'eshtml',
			}),
		).toBe(expected)
	})

	it('formats parts of EsHTML code', async () => {
		const code = `<cuerpo>
  <!-- Comentario -->
  <t1>¡Hola desde EsHTML!</t1>
      <imagen fuente="./logo.png" alternativo="logo">
                  <ElementoPersonalizado atributo="valor">
                      <SubElementoPersonalizado></SubElementoPersonalizado>
                  </ElementoPersonalizado>
</cuerpo>`

		const expected = `<cuerpo>
  <!-- Comentario -->
  <t1>¡Hola desde EsHTML!</t1>
  <imagen fuente="./logo.png" alternativo="logo">
  <ElementoPersonalizado atributo="valor">
    <SubElementoPersonalizado></SubElementoPersonalizado>
  </ElementoPersonalizado>
</cuerpo>
`

		expect(
			await format(code, {
				plugins: ['./dist/index.cjs'],
				filepath: 'fuente/indice.eshtml',
				parser: 'eshtml',
			}),
		).toBe(expected)
	})

	it('formats EsHTML with EsJS code', async () => {
		const code = `<!TIPODOC eshtml>
<eshtml idioma="es">
<cabecera>
  <codigo>
mut x = Mate.aleatorio()
  consola.escribir("¡Hola desde EsHTML! ",
x)
  </codigo>
</cabecera>

<cuerpo>
  <t1>¡Hola desde EsHTML!</t1>
</cuerpo>
</eshtml>`

		const expected = `<!TIPODOC eshtml>
<eshtml idioma="es">
  <cabecera>
    <codigo>
      mut x = Mate.aleatorio()
      consola.escribir("¡Hola desde EsHTML! ", x)
    </codigo>
  </cabecera>

  <cuerpo>
    <t1>¡Hola desde EsHTML!</t1>
  </cuerpo>
</eshtml>
`

		expect(
			await format(code, {
				plugins: ['./dist/index.cjs'],
				filepath: 'fuente/indice.eshtml',
				parser: 'eshtml',
			}),
		).toBe(expected)
	})
})
