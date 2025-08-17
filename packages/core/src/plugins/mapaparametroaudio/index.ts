import {
    replaceExpressionMethods,
    replaceObjects,
    replaceObjectProperties,
    replaceInstanceof,
} from '../utils'

export const report = ()=> 'Converts mapaparametroaudio to audioparammap'

export const properties = new Map<string, string>([
    ['tamaño', 'size']
])

export const objects = new Map<string, string>([['MapaParametroAudio', 'AudioParamMap']])

export const methods = new Map<string, string>([
    ['entradas', 'entries'],
    ['paraCada', 'forEach'],
    ['obtener', 'get'],
    ['tiene', 'has'],
    ['claves', 'keys'],
    ['valores', 'values']
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
            from: 'MapaParametroAudio',
            to: 'AudioParamMap',
        }),
        ...replaceObjects({
            objects,
        }),
    };
}