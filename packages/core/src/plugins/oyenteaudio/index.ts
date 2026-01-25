import {
    replaceObjects,
    replaceObjectProperties,
    replaceInstanceof,
} from '../utils'

export const report = ()=> 'Converts oyenteaudio to audiolistener'

export const properties = new Map<string, string>([
    ['posicionX', 'positionX'],
    ['posicionY', 'positionY'],
    ['posicionZ', 'positionZ'],
    ['adelanteX', 'forwardX'],
    ['adelanteY', 'forwardY'],
    ['adelanteZ', 'forwardZ'],
    ['arribaX', 'upX'],
    ['arribaY', 'upY'],
    ['arribaZ', 'upZ']
])

export const objects = new Map<string, string>([['OyenteAudio', 'AudioListener']])

export function replace(){
    return {
        ...replaceObjectProperties({
            properties,
        }),
        ...replaceInstanceof({
            from: 'OyenteAudio',
            to: 'AudioListener',
        }),
        ...replaceObjects({
            objects,
        }),
    };
}