import {
    replaceObjects,
    replaceObjectProperties,
    replaceInstanceof,
} from '../utils'

export const report = ()=> 'Converts nodofuentedeaudioflujodemedio to mediastreamaudiosourcenode'

export const properties = new Map<string, string>([
    ['flujoDeMedio', 'mediaStream']
])

export const objects = new Map<string, string>([['NodoFuenteDeAudioFlujoDeMedio', 'MediaStreamAudioSourceNode']])

export function replace(){
    return {
        ...replaceObjectProperties({
            properties,
        }),
        ...replaceInstanceof({
            from: 'NodoFuenteDeAudioFlujoDeMedio',
            to: 'MediaStreamAudioSourceNode',
        }),
        ...replaceObjects({
            objects,
        }),
    };
}