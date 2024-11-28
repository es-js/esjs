import {
    replaceExpressionMethods,
    replaceInstanceof,
    replaceObjectProperties,
    replaceObjectStaticMethods,
    replaceObjects,
  } from '../utils'

  export const report = () => 'Converts NumeroGrande methods to JavaScript'

  export const staticMethods = new Map<string, string>([
    ['comoNumeroSig', 'asIntN'],
    ['comoNumero', 'asUintN']
  ])

  export const properties = new Map<string, string>([
    ['etiquetaCadena', 'toStringTag']
  ])

  export const methods = new Map<string, string>([
    ['aCadenaLocalizada', 'toLocaleString'],
    ['aCadena', 'toString'],
    ['valorDe', 'valueOf']
  ])

  export const objects = new Map<string, string>([['NumeroGrande', 'BigInt']])

  export function replace() {
    return {
      ...replaceObjectStaticMethods({
        from: 'NumeroGrande',
        to: 'BigInt',
        methods: staticMethods,
      }),
      ...replaceExpressionMethods({
        methods,
      }),
      ...replaceObjectProperties({
        properties,
      }),
      ...replaceInstanceof({
        from: 'NumeroGrande',
        to: 'BigInt',
      }),
      ...replaceObjects({
        objects,
      }),
    }
  }