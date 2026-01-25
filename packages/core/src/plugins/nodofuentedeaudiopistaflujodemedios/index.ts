import { replaceObjects, replaceInstanceof } from '../utils'

export const report = () =>
  'Converts nodofuentedeaudiopistaflujodemedios to mediastreamtrackaudiosourcenode'

export const objects = new Map<string, string>([
  ['NodoFuenteDeAudioPistaFlujoDeMedios', 'MediaStreamTrackAudioSourceNode'],
])

export function replace() {
  return {
    ...replaceInstanceof({
      from: 'NodoFuenteDeAudioPistaFlujoDeMedios',
      to: 'MediaStreamAudioSourceNode',
    }),
    ...replaceObjects({
      objects,
    }),
  }
}
