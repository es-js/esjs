import {
    replaceObjects,
    replaceObjectProperties,
    replaceInstanceof,
} from '../utils'

export const report = ()=> 'Converts nodopanoramicoestereo to stereopannernode'

export const properties = new Map<string, string>([
    ['panoramica', 'pan'],
])

export const objects = new Map<string, string>([['NodoPanoramicoEstereo', 'StereoPannerNode']])

export function replace(){
    return {
        ...replaceObjectProperties({
            properties,
        }),
        ...replaceInstanceof({
            from: 'NodoPanoramicoEstereo',
            to: 'StereoPannerNode',
        }),
        ...replaceObjects({
            objects,
        }),
    };
}