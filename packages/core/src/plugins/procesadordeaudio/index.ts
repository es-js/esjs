import {
    replaceObjects,
    replaceObjectProperties,
    replaceInstanceof,
} from '../utils'

export const report = ()=> 'Converts procesadordeaudio to audioworklet'

export const properties = new Map<string, string>([
    ['puerto', 'port'],
])

export const objects = new Map<string, string>([['ProcesadorDeAudio', 'AudioWorklet']])

export function replace(){
    return {
        ...replaceObjectProperties({
            properties,
        }),
        ...replaceInstanceof({
            from: 'ProcesadorDeAudio',
            to: 'AudioWorklet',
        }),
        ...replaceObjects({
            objects,
        }),
    };
}