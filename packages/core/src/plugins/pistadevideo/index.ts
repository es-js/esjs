import {
    replaceObjects,
    replaceObjectProperties,
    replaceInstanceof,
} from '../utils'

export const report = ()=> 'Converts pistadevideo to videotrack'

export const properties = new Map<string, string>([
    ['seleccionado', 'selected'],
    ['id', 'id'],
    ['tipo', 'kind'],
    ['etiqueta', 'label'],
    ['idioma', 'language'],
    ['bufferDeFuente', 'sourceBuffer']
])

export const objects = new Map<string, string>([['PistaDeVideo', 'VideoTrack']])

export function replace(){
    return {
        ...replaceObjectProperties({
            properties,
        }),
        ...replaceInstanceof({
            from: 'PistaDeVideo',
            to: 'VideoTrack',
        }),
        ...replaceObjects({
            objects,
        }),
    };
}