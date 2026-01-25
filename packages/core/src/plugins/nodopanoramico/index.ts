import {
  replaceObjects,
  replaceObjectProperties,
  replaceInstanceof,
} from '../utils'

export const report = () => 'Converts nodopanoramico to pannernode'

export const properties = new Map<string, string>([
  ['conoAnguloInterior', 'coneInnerAngle'],
  ['conoAnguloExterior', 'coneOuterAngle'],
  ['conoGananciaExterior', 'coneOuterGain'],
  ['modeloDeDistancia', 'distanceModel'],
  ['distanciaMaxima', 'maxDistance'],
  ['orientacionX', 'orientationX'],
  ['orientacionY', 'orientationY'],
  ['orientacionZ', 'orientationZ'],
  ['modeloDePanoramizacion', 'panningModel'],
  ['posicionX', 'positionX'],
  ['posicionY', 'positionY'],
  ['posicionZ', 'positionZ'],
  ['distanciaDeReferencia', 'refDistance'],
  ['distanciaDeRodado', 'rolloffFactor'],
])

export const objects = new Map<string, string>([
  ['NodoPanoramico', 'PannerNode'],
])

export function replace() {
  return {
    ...replaceObjectProperties({
      properties,
    }),
    ...replaceInstanceof({
      from: 'NodoPanoramico',
      to: 'PannerNode',
    }),
    ...replaceObjects({
      objects,
    }),
  }
}
