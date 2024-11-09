import {
    replaceExpressionMethods,
    replaceInstanceof,
    replaceObjectStaticMethods,
    replaceObjects,
  } from '../utils'
  
  export const report = () => 'Converts Apoderado methods to JavaScript'
  
  export const staticMethods = new Map<string, string>([
    ["revocable", "revocable"]
  ])

  export const objects = new Map<string, string>([['Apoderado', 'Proxy']])

  export function replace() {
    return {
      ...replaceObjectStaticMethods({
        from: 'Apoderado',
        to: 'Proxy',
        methods: staticMethods,
      }),
      ...replaceInstanceof({
        from: 'Apoderado',
        to: 'Proxy',
      }),
      ...replaceObjects({
        objects,
      }),
    }
  }
  