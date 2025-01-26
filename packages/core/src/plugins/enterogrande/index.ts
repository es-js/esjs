import {
    replaceExpressionMethods,
    replaceInstanceof,
    replaceObjectProperties,
    replaceObjectStaticMethods,
    replaceObjects,
  } from '../utils'

  export const report = () => 'Converts EnteroGrande methods to JavaScript'

  export const staticMethods = new Map<string, string>([
    ['comoEntero', 'asIntN'],
    ['comoEnteroSinSigno', 'asUintN']
  ])

  export const methods = new Map<string, string>([
    ['aCadenaLocalizada', 'toLocaleString'],
    ['aCadena', 'toString'],
    ['valorDe', 'valueOf']
  ])

  export const objects = new Map<string, string>([['EnteroGrande', 'BigInt']])

  export function replace() {
    return {
      ...replaceObjectStaticMethods({
        from: 'EnteroGrande',
        to: 'BigInt',
        methods: staticMethods,
      }),
      ...replaceExpressionMethods({
        methods,
      }),
      ...replaceInstanceof({
        from: 'EnteroGrande',
        to: 'BigInt',
      }),
      ...replaceObjects({
        objects,
      }),
    }
  }
