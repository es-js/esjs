export interface Transformer {
  transform(code: string): string
}

export function applyTransformers(code: string, transformers: Transformer[]) {
  return transformers.reduce(
    (acc, transformer) => transformer.transform(acc),
    code,
  )
}
