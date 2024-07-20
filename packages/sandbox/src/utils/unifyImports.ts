/**
 * Genera los imports a partir de las funciones exportadas.
 */
export function unifyImports(code: string): string {
  const importMap = new Map<string, Set<string>>()

  const importRegex = /import\s+{([^}]+)}\s+from\s+['"]([^'"]+)['"]\s*(;)?/g
  let match
  // eslint-disable-next-line no-cond-assign
  while ((match = importRegex.exec(code)) !== null) {
    const [, namedImports, moduleSpecifier] = match

    if (!importMap.has(moduleSpecifier))
      importMap.set(moduleSpecifier, new Set())

    namedImports.split(/\s*,\s*/g).forEach((namedImport) => {
      const importName = namedImport.trim()
      if (importName) {
        // @ts-expect-error Set is not iterable
        importMap.get(moduleSpecifier).add(importName)
      }
    })
  }

  let output = ''
  importMap.forEach((namedImports, moduleSpecifier) => {
    const sortedImports = [...namedImports].sort()
    output += `import { ${sortedImports.join(
      ', ',
    )} } from '${moduleSpecifier}'\n`
  })

  // Add the remaining imports that are not duplicated
  const remainingImports = code.replace(importRegex, '').trim()
  output += remainingImports

  return output.trim()
}
