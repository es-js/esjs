import { prepareCode } from '@es-js/sandbox/parser'
import { splitCodeImports } from '@es-js/core/utils'
import { zh } from 'h3-zod'
import javascriptObfuscator from 'javascript-obfuscator'
import { z } from 'zod'

const { obfuscate } = javascriptObfuscator

export default defineEventHandler(async(event) => {
  const body = await zh.useSafeValidatedBody(event, z.object({
    code: z.string(),
  }))

  const obfuscatedCode = getObfuscatedCode(body.data.code)

  return {
    obfuscatedCode,
  }
})

function getObfuscatedCode(code: string) {
  const compiledCode = prepareCode(code)

  const splittedCode = splitCodeImports(compiledCode)

  const obfuscatedCode = obfuscateCode(splittedCode.codeWithoutImports)

  if (!obfuscatedCode) {
    return
  }

  return `${splittedCode.imports}

${obfuscatedCode.getObfuscatedCode()}`
}

function obfuscateCode(code: string) {
  return obfuscate(code, {
    compact: true,
    simplify: false,
    controlFlowFlattening: false,
    ignoreImports: true,
  })
}
