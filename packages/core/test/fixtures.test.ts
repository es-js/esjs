import { readFileSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { beforeEach, describe, expect, it } from 'vitest'
import { compileCode } from './testUtils'

const esjsFixtures = import.meta.glob('./fixtures/keywords/*.esjs')
const esjsFixturesExtras = import.meta.glob('./fixtures/extras/*.esjs')

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

async function testCompile(fixture: string, options: {
  reverse?: boolean
  convert?: boolean
} = {
  reverse: false,
  convert: true,
}) {
  try {
    const { esjsCode, jsCode } = readFixture(fixture)

    const generated = await compileCode(
      options.reverse ? jsCode : esjsCode,
      {
        reverse: options.reverse,
        convert: options.convert,
      },
    )

    return {
      generated,
      expected: options.reverse ? esjsCode : jsCode,
    }
  }
  catch (error) {
    console.error(`Error in ${fixture}`, error)
  }
}

describe('compile esjs -> js', () => {
  it('test fixtures/keywords', async () => {
    for (const key of fixtureKeys) {
      const result = await testCompile(key, {
        convert: false,
      })

      expect(result.generated).toEqual(result.expected)
    }
  })

  it('test fixtures/extras', async () => {
    for (const key of Object.keys(esjsFixturesExtras)) {
      const result = await testCompile(key, {
        convert: true,
      })

      expect(result.generated).toEqual(result.expected)
    }
  })
})

describe('compile single', () => {
  const fixture = './fixtures/extras/consola.esjs'

  it('compile single: esjs -> js', async () => {
    const result = await testCompile(fixture)

    expect(result.generated).toEqual(result.expected)
  })

  it('compile single: js -> esjs', async () => {
    const result = await testCompile(fixture, {
      reverse: true,
      convert: true,
    })

    expect(result.generated).toEqual(result.expected)
  })
})

describe('compile js -> esjs', () => {
  it('test fixtures/keywords', async () => {
    for (const key of fixtureKeys) {
      const result = await testCompile(key, {
        reverse: true,
        convert: false,
      })

      expect(result.generated).toEqual(result.expected)
    }
  })
})
