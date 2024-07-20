import { existsSync, mkdirSync, writeFileSync } from 'node:fs'
import {
  arrayMethods,
  consoleMethods,
  constantLanguage,
  dateMethods,
  keywordControl,
  mathMethods,
  metaVariable,
  numberMethods,
  promiseMethods,
  storageType,
  stringMethods,
  supportFunction,
  variableLanguage,
} from '@es-js/core/keywords'
import { markdownTable } from 'markdown-table'

if (!existsSync('dist')) mkdirSync('dist')

function generateTableForKeyword(map) {
  return Array.from(map.keys()).map((k) => [k, map.get(k)])
}

function getTable(keywords) {
  return markdownTable([
    ['EsJS', 'JavaScript'],
    ...keywords.map((keyword) => generateTableForKeyword(keyword)).flat(),
  ])
}

function getTitle(title) {
  return `

## ${title}

`
}

function getOutput() {
  let output = ''

  output += getTitle('Palabras reservadas de control (Control Keywords)')
  output += getTable([
    keywordControl,
    variableLanguage,
    metaVariable,
    storageType,
  ])

  output += getTitle('Constantes del lenguaje (Language Constants)')
  output += getTable([constantLanguage])

  output += getTitle('Funciones de soporte (Support Functions)')
  output += getTable([supportFunction])

  output += getTitle('Objeto Consola (Console Object)')
  output += getTable([consoleMethods])

  output += getTitle('Objeto Cadena (String Object)')
  output += getTable([stringMethods])

  output += getTitle('Objeto Número (Number Object)')
  output += getTable([numberMethods])

  output += getTitle('Objeto Mate (Math Object)')
  output += getTable([mathMethods])

  output += getTitle('Objeto Fecha (Date Object)')
  output += getTable([dateMethods])

  output += getTitle('Objeto Arreglo (Array Object)')
  output += getTable([arrayMethods])

  output += getTitle('Objeto Promesa (Promise Object)')
  output += getTable([promiseMethods])

  return output.trim()
}

writeFileSync('dist/reserved-words.md', getOutput())
