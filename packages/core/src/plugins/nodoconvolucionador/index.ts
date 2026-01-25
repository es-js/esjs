import {
    replaceObjects,
    replaceObjectProperties,
    replaceInstanceof,
} from '../utils'

export const report = ()=> 'Converts nodoconvolucionador to convolvernode'

export const properties = new Map<string, string>([
    ['buffer', 'buffer'],
    ['normalizar', 'normalize']
])

export const objects = new Map<string, string>([['NodoConvolucionador', 'ConvolverNode']])

export function replace(){
    return {
        ...replaceObjectProperties({
            properties,
        }),
        ...replaceInstanceof({
            from: 'NodoConvolucionador',
            to: 'ConvolverNode',
        }),
        ...replaceObjects({
            objects,
        }),
    };
}