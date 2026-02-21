import { describe, it, expect } from 'vitest'
import { transformSelector } from '../src/utils/transformSelector'

describe('transformSelector', () => {
  describe('pseudo-classes (single colon) vs pseudo-elements (double colon)', () => {
    it('transforms only single-colon pseudo-classes, not double-colon', () => {
      // CSS → EsCSS: :hover → :encima, ::before → ::antes
      expect(transformSelector('a:hover', true)).toBe('a:encima')
      expect(transformSelector('a::before', true)).toBe('a::antes')
    })

    it('does not match after double-colon: selector with both :: and :', () => {
      // The pseudo-class regex must not match the colon of ::before (negative lookbehind)
      const result = transformSelector('a:hover::before', true)
      expect(result).toBe('a:encima::antes')
    })

    it('transforms pseudo-element then pseudo-class without double-colon being treated as pseudo-class', () => {
      // Order in string: ::before first, then :hover. After pseudo-element replace: a::antes:hover
      // Pseudo-class regex must match :hover (single colon) but not the : in ::antes
      const result = transformSelector('a::before:hover', true)
      expect(result).toBe('a::antes:encima')
    })

    it('EsCSS → CSS: single-colon and double-colon remain distinct', () => {
      expect(transformSelector('a:encima', false)).toBe('a:hover')
      expect(transformSelector('a::antes', false)).toBe('a::before')
      expect(transformSelector('a:encima::antes', false)).toBe(
        'a:hover::before',
      )
      expect(transformSelector('a::antes:encima', false)).toBe(
        'a::before:hover',
      )
    })
  })

  describe('functional pseudo-classes (with params)', () => {
    it('transforms pseudo-class with params (CSS → EsCSS)', () => {
      expect(transformSelector('span:nth-child(2n+1)', true)).toBe(
        'span:hijo-n(2n+1)',
      )
      expect(transformSelector('p:not(.foo)', true)).toBe('p:no(.foo)')
    })

    it('transforms pseudo-class with params (EsCSS → CSS)', () => {
      expect(transformSelector('span:hijo-n(2n+1)', false)).toBe(
        'span:nth-child(2n+1)',
      )
      expect(transformSelector('p:no(.foo)', false)).toBe('p:not(.foo)')
    })
  })

  describe('simple pseudo-classes', () => {
    it('transforms simple pseudo-classes CSS → EsCSS', () => {
      expect(transformSelector('.btn:focus', true)).toBe('.btn:enfoque')
      expect(transformSelector('.link:active', true)).toBe('.link:activo')
    })

    it('transforms simple pseudo-classes EsCSS → CSS', () => {
      expect(transformSelector('.btn:enfoque', false)).toBe('.btn:focus')
      expect(transformSelector('.link:activo', false)).toBe('.link:active')
    })
  })
})
