export { splitCodeImports } from './utils/split-code-imports'
export { splitScriptTemplate } from './utils/split-script-template'

export function invertMap(map: Map<string, string>): Map<string, string> {
  const invertedMap = new Map<string, string>()
  for (const [key, value] of map.entries())
    invertedMap.set(value, key)

  return invertedMap
}
