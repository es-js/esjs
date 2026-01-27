import { replaceObjects, replaceInstanceof } from '../utils'

export const report = () => 'Converts fuentedemedios to mediasource'

export const objects = new Map<string, string>([
  ['FuenteDeMedios', 'MediaSource'],
])

export function replace() {
  return {
    ...replaceInstanceof({
      from: 'FuenteDeMedios',
      to: 'MediaSource',
    }),
    ...replaceObjects({
      objects,
    }),
  }
}
