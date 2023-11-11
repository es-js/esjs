import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'

import {
  arrayMethods,
  constantLanguage,
  keywordControl,
  metaVariable,
  storageType,
  supportFunction,
  variableLanguage,
  vueRef,
} from '@es-js/core/keywords'

function includeKeywords(k) {
  return `\\b(${Array.from(k.keys()).join('|')})\\b`
}

if (!existsSync('dist'))
  mkdirSync('dist')

const data = readFileSync('./assets/JavaScript.tmLanguage.json')

const jsonData = JSON.parse(data)

jsonData.scopeName = 'source.esjs'

const esjsRepository = {
  patterns: [
    {
      name: 'keyword.control.esjs',
      match: includeKeywords(keywordControl),
    },
    {
      name: 'constant.language.esjs',
      match: includeKeywords(constantLanguage),
    },
    {
      name: 'variable.language.esjs',
      match: includeKeywords(variableLanguage),
    },
    {
      name: 'meta.variable.esjs',
      match: includeKeywords(metaVariable),
    },
    {
      name: 'support.function.esjs',
      match: includeKeywords(supportFunction),
    },
    {
      name: 'storage.type.esjs',
      match: includeKeywords(storageType),
    },
    {
      name: 'keyword.other.esjs',
      match: includeKeywords(vueRef),
    },
    {
      name: 'keyword.other.esjs',
      match: includeKeywords(arrayMethods),
    },
  ],
}

jsonData.repository = {
  esjs: esjsRepository,
  ...jsonData.repository,
  comment: {
    ...jsonData.repository.comment,
    patterns: [
      {
        include: '#esjs',
      },
      ...jsonData.repository.comment.patterns,
    ],
  },
}

jsonData.patterns = [
  {
    include: '#esjs',
  },
  ...jsonData.patterns,
]

const output = JSON.stringify(jsonData, null, '\t')

writeFileSync('dist/esjs.tmLanguage.json', output)
