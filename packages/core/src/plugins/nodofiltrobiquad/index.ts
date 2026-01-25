import {
    replaceExpressionMethods,
    replaceObjects,
    replaceObjectProperties,
    replaceInstanceof,
} from '../utils'

export const report = ()=> 'Converts nodofiltrobiquad to biquadfilternode'

export const properties = new Map<string, string>([
    ['frecuencia', 'frequency'],
    ['desorientar', 'detune'],
    ['Q', 'Q'],
    ['ganancia', 'gain'],
    ['tipo', 'type']
])

export const objects = new Map<string, string>([['NodoFiltroBiquad', 'BiquadFilterNode']])

export const methods = new Map<string, string>([
    ['obtenerFrecuenciaDeRespuesta', 'getFrequencyResponse']
])

export function replace(){
    return {
        ...replaceExpressionMethods({
            methods,
        }),
        ...replaceObjectProperties({
            properties,
        }),
        ...replaceInstanceof({
            from: 'NodoFiltroBiquad',
            to: 'BiquadFilterNode',
        }),
        ...replaceObjects({
            objects,
        }),
    };
}