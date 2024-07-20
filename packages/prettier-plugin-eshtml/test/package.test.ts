import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'

import { expect, it } from 'vitest'

it('should be importable', async () => {
  const imported = await import('..')

  expect(imported).toMatchSnapshot()
})

it('should be requireable', () => {
  const imported = createRequire(import.meta.url)('..')

  expect(imported).toMatchSnapshot()
})

it('should be resolvable', () => {
  const actualPath = fileURLToPath(
    new URL('../dist/index.cjs', import.meta.url),
  )

  const resolved = require.resolve('..')

  expect(resolved).toEqual(actualPath)
})
