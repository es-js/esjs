import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'

if (!existsSync('dist')) {
  mkdirSync('dist')
}

const data = readFileSync('./assets/css-language-configuration.json')

const jsonData = JSON.parse(data)

const output = JSON.stringify(jsonData, null, '\t')

writeFileSync('dist/escss-language-configuration.json', output)
