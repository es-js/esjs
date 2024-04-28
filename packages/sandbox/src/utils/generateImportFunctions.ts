import * as espree from 'espree'

/**
 * Genera los imports a partir de las funciones exportadas.
 *
 * Por ejemplo, para el módulo `./foo`, y para el código:
 *
 * ```js
 * export function foo() {
 *  return 'foo';
 * }
 * ```
 *
 * Genera:
 *
 * ```js
 * import { foo } from './foo'
 * ```
 */
export function generateImportFunctions({
  code,
  modulePath,
}: {
  code: string
  modulePath: string
}) {
  const ast = espree.parse(code, {
    range: true,
    ecmaVersion: 'latest',
    jsx: false,
    loc: true,
    tolerant: true,
    sourceType: 'module',
  })

  const namedExports = ast.body.filter(
    (node: any) =>
      node.type === 'ExportNamedDeclaration'
      && node.declaration?.type === 'FunctionDeclaration',
  )

  const imports = namedExports.map(
    (node: any) =>
      `import { ${node.declaration?.id?.name} } from '${modulePath}'`,
  )

  return imports.join('\n')
}
