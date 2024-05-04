import { copyFileSync, existsSync, mkdirSync } from 'node:fs'

if (!existsSync('dist')) {
	mkdirSync('dist')
}

copyFileSync('./assets/esvue.tmLanguage.json', 'dist/esvue.tmLanguage.json')
