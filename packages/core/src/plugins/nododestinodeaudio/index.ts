import {
    replaceObjects,
    replaceObjectProperties,
    replaceInstanceof,
} from '../utils'

export const report = ()=> 'Converts nododestinodeaudio to audiodestinationnode'

export const properties = new Map<string, string>([
    ['maximoCanalesDeEntrada', 'maxChannelCount']
])

export const objects = new Map<string, string>([['NodoDestinoDeAudio', 'AudioDestinationNode']])

export function replace(){
    return {
        ...replaceObjectProperties({
            properties,
        }),
        ...replaceInstanceof({
            from: 'NodoDestinoDeAudio',
            to: 'AudioDestinationNode',
        }),
        ...replaceObjects({
            objects,
        }),
    };
}