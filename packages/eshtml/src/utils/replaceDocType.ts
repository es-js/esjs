import { CompileOptions } from '../index'

export function replaceDocType(code: string, options: CompileOptions): string {
  const fromDocType =
    options?.from === 'html' ? '<!DOCTYPE html>' : '<!TIPODOC eshtml>'
  const toDocType =
    options?.to === 'html' ? '<!DOCTYPE html>' : '<!TIPODOC eshtml>'
  const fromDocTypeRegex = new RegExp(escapeRegExp(fromDocType), 'gi')
  return code.replace(fromDocTypeRegex, toDocType)
}

function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') // Escapa caracteres especiales para regex
}
