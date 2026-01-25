import {
    replaceExpressionMethods,
    replaceObjects,
    replaceObjectProperties,
    replaceInstanceof,
} from '../utils'

export const report = ()=> 'Converts bufferaudio to audiobuffer'

export const properties = new Map<string, string>([
    ['frecuenciaDeMuestreo', 'sampleRate'],
    ['longitud', 'length'],
    ['duracion', 'duration'],
    ['numeroDeCanales', 'numberOfChannels']
])

export const objects = new Map<string, string>([['BufferAudio', 'AudioBuffer']])

export const methods = new Map<string, string>([
    ['obtenerDatosDelCanal', 'getChannelData'],
    ['copiarDeCanal', 'copyFromChannel'],
    ['copiarAlCanal', 'copyToChannel']
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
            from: 'BufferAudio',
            to: 'AudioBuffer',
        }),
        ...replaceObjects({
            objects,
        }),
    };
}