import { resolve } from 'node:path'
import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { transpile } from '../src/index'

const esjsFixtures = import.meta.glob('./fixtures/esjs/*.esjs')

describe('transform', () => {
  it('transforms esjs', () => {
    const fixtureKeys = Object.keys(esjsFixtures)

    expect(fixtureKeys.length).toBeGreaterThan(0)

    for (const esjsFixture of fixtureKeys) {
      const esjsCode = readFileSync(resolve(`${__dirname}/${esjsFixture}`), 'utf-8')
      const jsCode = readFileSync(resolve(`${__dirname}/${esjsFixture.replace('.esjs', '.js')}`), 'utf-8')

      const esjsCodeTranspiled = transpile(esjsCode)

      expect(esjsCodeTranspiled).toEqual(jsCode)
    }
  })
})
