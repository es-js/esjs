import { describe, expect, it } from 'vitest'
import { invertMap, splitCodeImports } from '../src/utils'

describe('utils', () => {
  it('split code imports', () => {
    const code = `
import { foo } from 'bar'
import { bar } from 'foo'
import { foo as bar } from 'bar'
import 'foo'
import 'bar'

const x = 1
var y = 2
let z = 3
`

    const { codeWithoutImports, imports, hasImports } = splitCodeImports(code)

    expect(codeWithoutImports).toBe(`const x = 1
var y = 2
let z = 3`)

    expect(imports).toBe(`import { foo } from 'bar'
import { bar } from 'foo'
import { foo as bar } from 'bar'
import 'foo'
import 'bar'`)

    expect(hasImports).toBe(true)
  })

  it('split code without imports', () => {
    const code = `
const x = 1
var y = 2
let z = 3
`

    const { codeWithoutImports, imports, hasImports } = splitCodeImports(code)

    expect(codeWithoutImports).toBe(`const x = 1
var y = 2
let z = 3`)

    expect(imports).toBe('')

    expect(hasImports).toBe(false)
  })

  it('invert map', () => {
    const map = new Map<string, string>([
      ['foo', 'bar'],
      ['bar', 'baz'],
      ['baz', 'foo'],
    ])

    const invertedMap = invertMap(map)

    expect(invertedMap).toEqual(
      new Map<string, string>([
        ['bar', 'foo'],
        ['baz', 'bar'],
        ['foo', 'baz'],
      ]),
    )
  })
})
