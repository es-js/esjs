const { writeFileSync } = require('node:fs')
const axios = require('axios')

const BASE_URL = 'https://unpkg.com/@es-js/language-tools@latest/dist/'

const grammars = [
  'esjs.tmLanguage.json',
  'esvue.tmLanguage.json',
]

const configurations = [
  'esjs-language-configuration.json',
  'esvue-language-configuration.json',
]

const snippets = [
  'esjs.code-snippets.json',
]

grammars.forEach(grammar => downloadFile(`${BASE_URL}${grammar}`, `./syntaxes/${grammar}`))
configurations.forEach(conf => downloadFile(`${BASE_URL}${conf}`, `./languages/${conf}`))
snippets.forEach(snippet => downloadFile(`${BASE_URL}${snippet}`, `./snippets/${snippet}`))

async function downloadFile(url: string, destination: string) {
  try {
    const response = await axios.get(url, {
      headers: { 'Accept-Encoding': 'gzip,deflate,compress' },
    })
    const data = response.data
    writeFileSync(destination, JSON.stringify(data))
  }
  catch (error) {
    console.error(`Cant download ${url} to ${destination}`)
    throw error
  }
}
