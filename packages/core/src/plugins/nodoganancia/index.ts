import {
    replaceObjects,
    replaceObjectProperties,
    replaceInstanceof,
} from '../utils'

export const report = ()=> 'Converts nodoganancia to gainnode'

export const properties = new Map<string, string>([
    ['ganancia', 'gain']
])

export const objects = new Map<string, string>([['NodoGanancia', 'GainNode']])

export function replace(){
    return {
        ...replaceObjectProperties({
            properties,
        }),
        ...replaceInstanceof({
            from: 'NodoGanancia',
            to: 'GainNode',
        }),
        ...replaceObjects({
            objects,
        }),
    };
}