import {
    replaceObjects,
    replaceObjectProperties,
    replaceInstanceof,
} from '../utils'

export const report = ()=> 'Converts nodoprocesadordeaudio to audioworkletnode'

export const properties = new Map<string, string>([
    ['puerto', 'port'],
    ['parametros', 'parameters']
])

export const objects = new Map<string, string>([['NodoProcesadorDeAudio', 'AudioWorkletNode']])

export function replace(){
    return {
        ...replaceObjectProperties({
            properties,
        }),
        ...replaceInstanceof({
            from: 'NodoProcesadorDeAudio',
            to: 'AudioWorkletNode',
        }),
        ...replaceObjects({
            objects,
        }),
    };
}