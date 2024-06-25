import { EssucraseCompiler } from '@es-js/core/compiler/essucrase.compiler'
import { processSandboxedCode } from '@es-js/sandbox/utils/processSandboxedCode'
import { splitCodeImports } from '@es-js/core/utils'
import { zh } from 'h3-zod'
import javascriptObfuscator from 'javascript-obfuscator'
import { z } from 'zod'

const { obfuscate } = javascriptObfuscator

export default defineEventHandler(async(event) => {
  const body = await zh.useSafeValidatedBody(event, z.object({
    code: z.string(),
  }))

  const obfuscatedCode = await getObfuscatedCode(body?.data?.code ?? '')

  return {
    obfuscatedCode,
  }
})

async function getObfuscatedCode(code: string) {
  const putout = await import('https://esm.sh/@putout/bundle@2')

  const compiler = new EssucraseCompiler(putout)

  const compiledCode = processSandboxedCode(
    compiler.compile(code, {}),
  )

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
