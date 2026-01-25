import {
    replaceExpressionMethods,
    replaceObjects,
    replaceObjectProperties,
    replaceInstanceof,
} from '../utils'

export const report = ()=> 'Converts ambitoglobaldeprocesadordeaudio to audioworkletglobalscope'

export const properties = new Map<string, string>([
    ['fotogramaActual', 'currentFrame'],
    ['tiempoActual', 'currentTime'],
    ['frecuenciaDeMuestreo', 'sampleRate'],
    ['puerto', 'port']
])

export const objects = new Map<string, string>([['AmbitoGlobalDeProcesadorDeAudio', 'AudioWorkletGlobalScope']])

export const methods = new Map<string, string>([
    ['registrarProcesador', 'registerProcessor']
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
            from: 'AmbitoGlobalDeProcesadorDeAudio',
            to: 'AudioWorkletGlobalScope',
        }),
        ...replaceObjects({
            objects,
        }),
    };
}