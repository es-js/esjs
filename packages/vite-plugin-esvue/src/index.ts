import { compile } from '@es-js/core'
import { splitCodeImports, splitScriptTemplate } from '@es-js/core/utils'
import type { Plugin } from 'vite'

export default function EsVue(): Plugin {
	return {
		name: 'vite-plugin-esvue',
		enforce: 'pre',
		transform(raw: string, id: string) {
			if (!/\.esvue$/.test(id)) {
				return
			}

			const { script, template } = splitScriptTemplate(raw)

			const compiled = compile(script || '', {
				compiler: 'essucrase',
			})

			const { imports, codeWithoutImports } = splitCodeImports(compiled)

			return `
<script setup lang="ts">
${imports}

${codeWithoutImports}
</script>
${template}`
		},
	}
}
