import {
    replaceExpressionMethods,
    replaceObjects,
    replaceObjectProperties,
    replaceInstanceof,
} from '../utils'

export const report = ()=> 'Converts nodofuentedebufferaudio to audiobuffersourcenode'

export const properties = new Map<string, string>([
    ['buffer', 'buffer'],
    ['desorientar', 'detune'],
    ['bucle', 'loop'],
    ['bucleInicio', 'loopStart'],
    ['bucleFin', 'loopEnd'],
    ['velocidadDeReproduccion', 'playbackRate']
])

export const objects = new Map<string, string>([['NodoFuenteDeBufferAudio', 'AudioBufferSourceNode']])

export const methods = new Map<string, string>([
    ['empezar', 'start']
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
            from: 'NodoFuenteDeBufferAudio',
            to: 'AudioBufferSourceNode',
        }),
        ...replaceObjects({
            objects,
        }),
    };
}