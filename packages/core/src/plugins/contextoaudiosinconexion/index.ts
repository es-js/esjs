import {
    replaceExpressionMethods,
    replaceObjects,
    replaceObjectProperties,
    replaceInstanceof,
} from '../utils'

export const report = ()=> 'Converts contextoaudiosinconexion to offlineaudiocontext'

export const properties = new Map<string, string>([
    ['longitud', 'length']
])

export const objects = new Map<string, string>([['ContextoAudioSinConexion', 'OfflineAudioContext']])

export const methods = new Map<string, string>([
    ['suspender', 'suspend'],
    ['iniciarRendimiento', 'startRendering']
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
            from: 'ContextoAudioSinConexion',
            to: 'OfflineAudioContext',
        }),
        ...replaceObjects({
            objects,
        }),
    };
}