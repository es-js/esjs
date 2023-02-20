import { copyFileSync, existsSync, mkdirSync } from 'node:fs'

if (!existsSync('dist'))
  mkdirSync('dist')

copyFileSync('./assets/esjs.code-snippets.json', 'dist/esjs.code-snippets.json')
