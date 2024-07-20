import type { ProcessSandboxedCodeOptions } from '../runtime/ejecutar'
import { applyTransformers } from '../transformers'
import { ExportFunctionsTransformer } from '../transformers/exportFunctions.transformer'
import { FormatTransformer } from '../transformers/format.transformer'
import { InfiniteLoopProtectionTransformer } from '../transformers/infiniteLoopProtection.transformer'

class ProcessSandboxedCodeError extends Error {
  constructor(
    message: string,
    public line: number,
    public column: number,
  ) {
    super(message)
  }
}

export function processSandboxedCode(
  code: string,
  options?: ProcessSandboxedCodeOptions,
) {
  try {
    return applyTransformers(code, [
      ...(options?.preFormat ? [new FormatTransformer()] : []),
      ...(options?.exportFunctions ? [new ExportFunctionsTransformer()] : []),
      ...(options?.infiniteLoopProtection
        ? [new InfiniteLoopProtectionTransformer()]
        : []),
      new FormatTransformer(),
    ])
  } catch (error: any) {
    const errorMessage = error.message
    const line = error?.loc?.start?.line || 1
    const column = error?.loc?.start?.column || 1

    throw new ProcessSandboxedCodeError(errorMessage, line, column)
  }
}
