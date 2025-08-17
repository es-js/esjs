import {
    replaceObjects,
    replaceInstanceof,
} from '../utils'

export const report = ()=> 'Converts nododivisordecanales to channelsplitternode'

export const objects = new Map<string, string>([['NodoDivisorDeCanales', 'ChannelSplitterNode']])

export function replace(){
    return {
        ...replaceInstanceof({
            from: 'NodoDivisorDeCanales',
            to: 'ChannelSplitterNode',
        }),
        ...replaceObjects({
            objects,
        }),
    };
}