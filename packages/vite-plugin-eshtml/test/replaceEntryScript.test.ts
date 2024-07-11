// import vite from 'vite'
import { expect, it } from 'vitest'
import { replaceEntryScript } from '../src/lib/replaceEntryScript'

it('replaceEntryScript', async () => {
	const html = `<script type="module" src="/fuente/indice.esjs"></script>`

	const output = replaceEntryScript(html)

	expect(output).toBe(`<script src="/fuente/indice.js" type="module"></script>`)
})
