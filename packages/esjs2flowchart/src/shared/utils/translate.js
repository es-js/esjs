import { keywords } from '@es-js/core'

function invertMap(map) {
  const invertedMap = new Map()
  for (const [key, value] of map.entries())
    invertedMap.set(value, key)

  return invertedMap
}

const translations = new Map([
  ...invertMap(keywords),
  ...(new Map([
    ['source', 'fuente'],
    ['Program', 'Programa'],
    ['module', 'modulo'],
  ])),
])
export function translate(keyword) {
  return translations.get(keyword)
}
