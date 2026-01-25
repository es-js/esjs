import {
    replaceObjects,
    replaceObjectProperties,
    replaceInstanceof,
} from '../utils'

export const report = ()=> 'Converts nodofuentedeaudioelementodemedios to mediaelementaudiosourcenode'

export const properties = new Map<string, string>([
    ['elementoDeMedios', 'mediaElement']
])

export const objects = new Map<string, string>([['NodoFuenteDeAudioElementoDeMedios', 'MediaElementAudioSourceNode']])

export function replace(){
    return {
        ...replaceObjectProperties({
            properties,
        }),
        ...replaceInstanceof({
            from: 'NodoFuenteDeAudioElementoDeMedios',
            to: 'MediaElementAudioSourceNode',
        }),
        ...replaceObjects({
            objects,
        }),
    };
}