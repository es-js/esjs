import { replaceObjects, replaceInstanceof } from '../utils'

export const report = () =>
  'Converts nodofusionadordecanales to channelmergernode'

export const objects = new Map<string, string>([
  ['NodoFusionadorDeCanales', 'ChannelMergerNode'],
])

export function replace() {
  return {
    ...replaceInstanceof({
      from: 'NodoFusionadorDeCanales',
      to: 'ChannelMergerNode',
    }),
    ...replaceObjects({
      objects,
    }),
  }
}
