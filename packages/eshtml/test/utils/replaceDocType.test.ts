import { describe, expect, it } from 'vitest'
import { replaceDocType } from '../../src/utils/replaceDocType'

describe('replaceDocType', () => {
  it('replaces TIPODOC with DOCTYPE', () => {
    const code = '<!TIPODOC eshtml>\n<html></html>'
    const result = replaceDocType(code, { from: 'eshtml', to: 'html' })
    expect(result).toBe('<!DOCTYPE html>\n<html></html>')
  })

  it('ignores case when replacing TIPODOC', () => {
    const code = '<!tipoDoc eshtml>\n<html></html>'
    const result = replaceDocType(code, { from: 'eshtml', to: 'html' })
    expect(result).toBe('<!DOCTYPE html>\n<html></html>')
  })

  it('replaces DOCTYPE with TIPODOC', () => {
    const code = '<!DOCTYPE html>\n<html></html>'
    const result = replaceDocType(code, { from: 'html', to: 'eshtml' })
    expect(result).toBe('<!TIPODOC eshtml>\n<html></html>')
  })

  it('ignores case when replacing DOCTYPE', () => {
    const code = '<!doctype HTML>\n<html></html>'
    const result = replaceDocType(code, { from: 'html', to: 'eshtml' })
    expect(result).toBe('<!TIPODOC eshtml>\n<html></html>')
  })

  it('does nothing when doctype to replace is not found', () => {
    const code = '<html></html>'
    const result = replaceDocType(code, { from: 'html', to: 'eshtml' })
    expect(result).toBe('<html></html>')
  })

  it('replaces doctype when HTML content is on one line', () => {
    const code = '<!DOCTYPE html><html></html>'
    const result = replaceDocType(code, { from: 'html', to: 'eshtml' })
    expect(result).toBe('<!TIPODOC eshtml><html></html>')
  })

  it('maintains whitespace and content after doctype replacement', () => {
    const code =
      '   <!DOCTYPE html>\n<html>\n  <head></head>\n  <body></body>\n</html>'
    const result = replaceDocType(code, { from: 'html', to: 'eshtml' })
    expect(result).toBe(
      '   <!TIPODOC eshtml>\n<html>\n  <head></head>\n  <body></body>\n</html>',
    )
  })
})
