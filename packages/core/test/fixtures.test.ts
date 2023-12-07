import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { beforeEach, describe, expect, it } from 'vitest'
import { transpile } from '../src/index'

const esjsFixtures = import.meta.glob('./fixtures/esjs/*.esjs')

let fixtureKeys: string[] = []

beforeEach(() => {
  fixtureKeys = Object.keys(esjsFixtures)
  expect(fixtureKeys.length).toBeGreaterThan(0)
})

const readFixture = (filepath: string) => {
  const esjsCode = readFileSync(resolve(`${__dirname}/${filepath}`), 'utf-8')
  const jsCode = readFileSync(resolve(`${__dirname}/${filepath.replace('.esjs', '.js')}`), 'utf-8')

  return {
    esjsCode,
    jsCode,
  }
}

const testTranspile = (fixture: string, reverse = false) => {
  const { esjsCode, jsCode } = readFixture(fixture)
  const transpiledCode = transpile(reverse ? jsCode : esjsCode, reverse)

  expect(transpiledCode).toEqual(reverse ? esjsCode : jsCode)
}

describe('transpile', () => {
  it('test fixtures', () => {
    fixtureKeys.forEach((key) => {
      testTranspile(key)
    })
  })

  it('test reverse fixtures', () => {
    fixtureKeys.forEach((key) => {
      testTranspile(key, true)
    })
  })
})

describe('transpile single', () => {
  const fixture = './fixtures/esjs/array.esjs'

  it('transforms esjs', () => {
    testTranspile(fixture)
  })

  it('transforms js to esjs', () => {
    testTranspile(fixture, true)
  })
})
