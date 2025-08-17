import {
    replaceObjects,
    replaceObjectProperties,
    replaceInstanceof,
} from '../utils'

export const report = ()=> 'Converts pistadeaudio to audiotrack'

export const properties = new Map<string, string>([
    ['habilitada', 'enabled'],
    ['id', 'id'],
    ['tipo', 'kind'],
    ['etiqueta', 'label'],
    ['idioma', 'language'],
    ['bufferDeFuente', 'sourceBuffer']
])

export const objects = new Map<string, string>([['PistaDeAudio', 'AudioTrack']])

export function replace(){
    return {
        ...replaceObjectProperties({
            properties,
        }),
        ...replaceInstanceof({
            from: 'PistaDeAudio',
            to: 'AudioTrack',
        }),
        ...replaceObjects({
            objects,
        }),
    };
}