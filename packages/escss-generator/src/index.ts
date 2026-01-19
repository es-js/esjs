import { existsSync, mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { generatePropertiesCode } from './generate-properties'
import { generateValuesCode } from './generate-values'
import { generateAtRulesCode } from './generate-at-rules'
import { generatePseudoCode } from './generate-pseudo'
import { generateSelectorsCode } from './generate-selectors'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const outputDir = join(__dirname, '../../escss/src/generated')

function ensureDir(dir: string): void {
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true })
  }
}

function generate(): void {
  console.log('Generating EsCSS dictionaries...')

  ensureDir(outputDir)

  // Generate properties
  const propertiesCode = generatePropertiesCode()
  writeFileSync(join(outputDir, 'properties.ts'), propertiesCode)
  console.log('  - Generated properties.ts')

  // Generate values
  const valuesCode = generateValuesCode()
  writeFileSync(join(outputDir, 'values.ts'), valuesCode)
  console.log('  - Generated values.ts')

  // Generate at-rules
  const atRulesCode = generateAtRulesCode()
  writeFileSync(join(outputDir, 'at-rules.ts'), atRulesCode)
  console.log('  - Generated at-rules.ts')

  // Generate pseudo selectors
  const pseudoCode = generatePseudoCode()
  writeFileSync(join(outputDir, 'pseudo.ts'), pseudoCode)
  console.log('  - Generated pseudo.ts')

  // Generate element selectors
  const selectorsCode = generateSelectorsCode()
  writeFileSync(join(outputDir, 'selectors.ts'), selectorsCode)
  console.log('  - Generated selectors.ts')

  console.log('Done! Generated files in:', outputDir)
}

generate()
