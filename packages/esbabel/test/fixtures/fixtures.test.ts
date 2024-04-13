import { readFileSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { beforeEach, describe, expect, it } from 'vitest'
import { compile } from '../../src'

const esjsFixtures = import.meta.glob('./esjs/*.esjs')

let fixtureKeys: string[] = []

beforeEach(() => {
  fixtureKeys = Object.keys(esjsFixtures)
  expect(fixtureKeys.length).toBeGreaterThan(0)
})

function readFixture(filepath: string) {
  const esjsCode = readFileSync(resolve(join(__dirname, filepath)), 'utf-8')
  const jsCode = readFileSync(resolve(join(__dirname, filepath.replace('.esjs', '.js'))), 'utf-8')

  return {
    esjsCode,
    jsCode,
  }
}

async function testCompile(fixture: string, reverse = false) {
  try {
    const { esjsCode, jsCode } = readFixture(fixture)

    return {
      generated: compile(reverse ? jsCode : esjsCode, reverse),
      expected: reverse ? esjsCode : jsCode,
    }
  }
  catch (error) {
    console.error(`Error in ${fixture}`, error)
  }
}

describe('compile', () => {
  it('test fixtures', async () => {
    for (const key of fixtureKeys) {
      const result = await testCompile(key)

      expect(result.generated).toEqual(result.expected)
    }
  })

  it('test reverse fixtures', () => {
    fixtureKeys.forEach((key) => {
      testCompile(key, true)
    })
  })
})

describe('compile single', () => {
  const fixture = './esjs/asincrono.esjs'

  it('transforms esjs', async () => {
    const result = await testCompile(fixture)

    expect(result.generated).toEqual(result.expected)
  })

  it('transforms js to esjs', async () => {
    const result = await testCompile(fixture, true)

    expect(result.generated).toEqual(result.expected)
  })
})
