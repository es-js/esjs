import { describe, expect, it, test } from 'vitest'
import {
  convertCodeToFlowTree,
} from '@/index'

describe('test', () => {
  it('test', () => {
    const code = `function test() {
      if (true) {
        return true
      } else {
        return false
      }
    }`

    const flowTree = convertCodeToFlowTree(code)

    console.log({ flowTree })

    expect(flowTree).toMatchSnapshot()
  })

  it('test top level await', () => {
    const code = `async function init() {
    const response = await fetch('https://google.com');
}
if (true) {
    await init();
}`

    const flowTree = convertCodeToFlowTree(code)

    console.log({ flowTree })

    expect(flowTree).toMatchSnapshot()
  })
})
