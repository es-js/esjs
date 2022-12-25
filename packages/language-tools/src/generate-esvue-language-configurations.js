import { copyFileSync, existsSync, mkdirSync } from 'node:fs'

if (!existsSync('dist'))
  mkdirSync('dist')

copyFileSync('./assets/esvue-language-configuration.json', 'dist/esvue-language-configuration.json')
