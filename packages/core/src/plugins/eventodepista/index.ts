import {
    replaceObjects,
    replaceObjectProperties,
    replaceInstanceof,
} from '../utils'

export const report = ()=> 'Converts eventodepista to trackevent'

export const properties = new Map<string, string>([
    ['pista', 'track']
])

export const objects = new Map<string, string>([['EventoDePista', 'TrackEvent']])

export function replace(){
    return {
        ...replaceObjectProperties({
            properties,
        }),
        ...replaceInstanceof({
            from: 'EventoDePista',
            to: 'TrackEvent',
        }),
        ...replaceObjects({
            objects,
        }),
    };
}