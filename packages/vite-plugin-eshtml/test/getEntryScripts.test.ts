// import vite from 'vite'
import { expect, it } from 'vitest'
import { getEntryScripts } from '../src/lib/getEntryScripts'

it('getEntryScripts', async () => {
	const html = `<!DOCTYPE html>
<html lang="es">

  <head>
    <meta charset="UTF-8">
    <link rel="icon" href="/favicon.ico">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>EsHTML</title>
  </head>

  <body>
    <script src="/fuente/indice.esjs" type="module"></script>
    <script src="/fuente/utilidades.esjs" type="module"></script>
  </body>

</html>`

	const output = getEntryScripts(html)

	expect(output).toMatchSnapshot()
})
