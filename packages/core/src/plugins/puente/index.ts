import {
    replaceInstanceof,
    replaceObjectStaticMethods,
    replaceObjects,
  } from '../utils'
  
  export const report = () => 'Converts Puente methods to JavaScript'
  
  export const staticMethods = new Map<string, string>([
    ["revocable", "revocable"]
  ])

  export const objects = new Map<string, string>([['Puente', 'Proxy']])

  export function replace() {
    return {
      ...replaceObjectStaticMethods({
        from: 'Puente',
        to: 'Proxy',
        methods: staticMethods,
      }),
      ...replaceInstanceof({
        from: 'Puente',
        to: 'Proxy',
      }),
      ...replaceObjects({
        objects,
      }),
    }
  }
  