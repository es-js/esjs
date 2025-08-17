import {
    replaceExpressionMethods,
    replaceObjects,
    replaceInstanceof,
} from '../utils'

export const report = ()=> 'Converts nodofiltroiir to iirfilternode'

export const objects = new Map<string, string>([['NodoFiltroIIR', 'IIRFilterNode']])

export const methods = new Map<string, string>([
    ['obtenerFrecuenciaDeRespuesta', 'getFrequencyResponse']
])

export function replace(){
    return {
        ...replaceExpressionMethods({
            methods,
        }),
        ...replaceInstanceof({
            from: 'NodoFiltroIIR',
            to: 'IIRFilterNode',
        }),
        ...replaceObjects({
            objects,
        }),
    };
}