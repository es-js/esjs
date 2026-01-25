import {
    replaceExpressionMethods,
    replaceObjects,
    replaceObjectProperties,
    replaceInstanceof,
} from '../utils'

export const report = ()=> 'Converts reproduccionremota to remoteplayback'

export const properties = new Map<string, string>([
    ['estado', 'state']
])

export const objects = new Map<string, string>([['ReproduccionRemota', 'RemotePlayback']])

export const methods = new Map<string, string>([
    ['observarDisponibilidad', 'watchAvailability'],
    ['cancelarObservacionDeDisponibilidad', 'cancelWatchAvailability'],
    ['preguntar', 'prompt']
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
            from: 'ReproduccionRemota',
            to: 'RemotePlayback',
        }),
        ...replaceObjects({
            objects,
        }),
    };
}