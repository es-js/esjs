import fs from 'fs'
import attributes from './attributes.json' with { type: 'json' }

export function generateAttributeUsages() {
  const output: any = []

  for (const { Attribute, Elements } of attributes) {
    const elements = Elements.split(',')
      .map((el) => el.trim())
      .map((el) => el.replace(/<|>/g, '')) // Remove < and > from the element name
      .map((el) => {
        if (el === 'Global attribute') {
          return '__GLOBAL__'
        }

        return el
      })

    output[Attribute] = elements
  }

  const fileContent = `export const attributeUsages = {
	  ${Object.entries(output)
      .map(([key, value]) => {
        return `'${key}': ${JSON.stringify(value)},`
      })
      .join('\n')}
  }
  `

  fs.writeFileSync('src/utils/attributeUsages.ts', fileContent)

  return fs.readFileSync('src/utils/attributeUsages.ts', 'utf-8')
}
