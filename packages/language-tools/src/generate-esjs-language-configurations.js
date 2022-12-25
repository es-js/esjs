import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'

if (!existsSync('dist'))
  mkdirSync('dist')

const data = readFileSync('./assets/javascript-language-configuration.json')

const jsonData = JSON.parse(data)

jsonData.onEnterRules = [
  ...jsonData.onEnterRules,
  {
    beforeText: {
      pattern: '^\\s*(\\bcaso\\s.+:|\\bporDefecto:)$',
    },
    afterText: {
      pattern: '^(?!\\s*(\\bcaso\\b|\\bporDefecto\\b))',
    },
    action: {
      indent: 'indent',
    },
  },
]

const output = JSON.stringify(jsonData, null, '\t')

writeFileSync('dist/esjs-language-configuration.json', output)
