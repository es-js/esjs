import {
    replaceExpressionMethods,
    replaceObjects,
    replaceObjectProperties,
    replaceInstanceof,
} from '../utils'

export const report = ()=> 'Converts listadepistasdeaudio to audiotracklist'

export const properties = new Map<string, string>([
    ['longitud', 'length']
])

export const objects = new Map<string, string>([['ListaDePistasDeAudio', 'AudioTrackList']])

export const methods = new Map<string, string>([
    ['obtenerPistaPorId', 'getTrackById']
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
            from: 'ListaDePistasDeAudio',
            to: 'AudioTrackList',
        }),
        ...replaceObjects({
            objects,
        }),
    };
}