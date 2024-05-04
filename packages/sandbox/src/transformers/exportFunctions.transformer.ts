import escodegen from 'escodegen'
import * as espree from 'espree'
import { Transformer } from './index'

/**
 * Agrega `export` a las funciones declaradas.
 */
export class ExportFunctionsTransformer implements Transformer {
	transform(code: string) {
		const ast = espree.parse(code, {
			range: true,
			ecmaVersion: 'latest',
			jsx: false,
			loc: true,
			tolerant: true,
			sourceType: 'module',
		})

		ast.body.forEach((node: any) => {
			if (node.type === 'FunctionDeclaration') {
				// Crear el nodo de exportación
				const exportNode = {
					type: 'ExportNamedDeclaration',
					declaration: node,
					source: null,
					specifiers: [],
				}

				// Reemplazar el nodo de la función con el nodo de exportación
				const index = ast.body.indexOf(node)
				ast.body[index] = exportNode
			}
		})

		return escodegen.generate(ast)
	}
}
