import {
    replaceObjects,
    replaceObjectProperties,
    replaceInstanceof,
} from '../utils'

export const report = ()=> 'Converts nododestinodeaudioflujodemedios to mediastreamaudiodestinationnode'

export const properties = new Map<string, string>([
    ['flujo', 'stream']
])

export const objects = new Map<string, string>([['NodoDestinoDeAudioFlujoDeMedios', 'MediaStreamAudioDestinationNode']])

export function replace(){
    return {
        ...replaceObjectProperties({
            properties,
        }),
        ...replaceInstanceof({
            from: 'NodoDestinoDeAudioFlujoDeMedios',
            to: 'MediaStreamAudioDestinationNode',
        }),
        ...replaceObjects({
            objects,
        }),
    };
}