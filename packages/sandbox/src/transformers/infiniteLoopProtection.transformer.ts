import * as espree from 'espree'
import { Transformer } from './index'

const timeout = 75

let start
let end
let prolog
let epilog

/**
 * Agrega un límite de tiempo de ejecución para cada bucle.
 * @author Ariya Hidayat (versión esprima)
 * @author Enzo Notario (versión espree)
 * @see https://github.com/chinchang/web-maker/blob/master/src/utils.js#L122
 */
export class InfiniteLoopProtectionTransformer implements Transformer {
	transform(code: string) {
		let loopId = 1
		const patches: { pos: number; str: string }[] = []
		const varPrefix = '_wmloopvar'
		const varStr = 'var %d = Date.now();\n'
		const checkStr = `\nif (Date.now() - %d > ${timeout}) { window._handleInfiniteLoopException(new Error("Bucle infinito")); break;}\n`

		espree
			.parse(code, {
				range: true,
				ecmaVersion: 'latest',
				jsx: false,
				loc: true,
				tolerant: true,
				sourceType: 'module',
			})
			.body.forEach((node: any) => {
				this.addInfiniteLoopProtectionToBody(
					node,
					varStr,
					varPrefix,
					loopId,
					patches,
					checkStr,
				)
			})

		patches
			.sort((a, b) => {
				return b.pos - a.pos
			})
			.forEach((patch) => {
				code = code.slice(0, patch.pos) + patch.str + code.slice(patch.pos)
			})

		return code
	}

	addInfiniteLoopProtectionToBody(
		node: any,
		varStr: string,
		varPrefix: string,
		loopId: number,
		patches: {
			pos: number
			str: string
		}[],
		checkStr: string,
	) {
		switch (node.type) {
			case 'FunctionDeclaration':
				const { body } = node

				body.body.forEach((childNode: any) => {
					this.addInfiniteLoopProtectionToBody(
						childNode,
						varStr,
						varPrefix,
						loopId,
						patches,
						checkStr,
					)
				})

				break

			case 'ExportNamedDeclaration':
			case 'ExportDefaultDeclaration':
			case 'ExportAllDeclaration':
				this.addInfiniteLoopProtectionToBody(
					node.declaration,
					varStr,
					varPrefix,
					loopId,
					patches,
					checkStr,
				)
				break

			case 'DoWhileStatement':
			case 'ForStatement':
			case 'ForInStatement':
			case 'ForOfStatement':
			case 'WhileStatement':
				start = 1 + node.body.range[0]
				end = node.body.range[1]
				prolog = checkStr.replace('%d', varPrefix + loopId)
				epilog = ''

				if (node.body.type !== 'BlockStatement') {
					// `while(1) doThat()` becomes `while(1) {doThat()}`
					prolog = `{${prolog}`
					epilog = '}'
					--start
				}

				patches.push({
					pos: start,
					str: prolog,
				})
				patches.push({
					pos: end,
					str: epilog,
				})
				patches.push({
					pos: node.range[0],
					str: varStr.replace('%d', varPrefix + loopId),
				})
				++loopId
				break

			default:
				break
		}
	}
}
