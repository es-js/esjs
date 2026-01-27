import {
  replaceExpressionMethods,
  replaceObjects,
  replaceObjectProperties,
  replaceInstanceof,
} from '../utils'

export const report = () => 'Converts elementohtmldemedios to htmlmediaelement'

export const properties = new Map<string, string>([
  ['pistasDeAudio', 'audioTracks'],
  ['autoReproduccion', 'autoplay'],
  ['almacenadoBuffer', 'buffered'],
  ['controles', 'controls'],
  ['listaControles', 'controlsList'],
  ['origenCruzado', 'crossOrigin'],
  ['fuenteActual', 'currentSrc'],
  ['tiempoActual', 'currentTime'],
  ['silenciadoPorDefecto', 'defaultMuted'],
  ['velocidadDeReproduccionPorDefecto', 'defaultPlaybackRate'],
  ['deshabilitarReproduccionRemota', 'disableRemotePlayback'],
  ['duracion', 'duration'],
  ['finalizado', 'ended'],
  ['error', 'error'],
  ['bucle', 'loop'],
  ['clavesMultimedia', 'mediaKeys'],
  ['silenciado', 'muted'],
  ['estadoDeRed', 'networkState'],
  ['pausado', 'paused'],
  ['velocidadDeReproduccion', 'playbackRate'],
  ['reproducido', 'played'],
  ['precarga', 'preload'],
  ['conservaElTono', 'preservesPitch'],
  ['remoto', 'remote'],
  ['buscable', 'seekable'],
  ['buscando', 'seeking'],
  ['idDeSalida', 'sinkId'],
  ['fuente', 'src'],
  ['objetoFuente', 'srcObject'],
  ['pistasDeTexto', 'textTracks'],
  ['pistasDeVideo', 'videoTracks'],
  ['volumen', 'volume'],
])

export const objects = new Map<string, string>([
  ['ElementoHTMLDeMedios', 'HTMLMediaElement'],
])

export const methods = new Map<string, string>([
  ['agregarPistaDeTexto', 'addTextTrack'],
  ['capturarFlujo', 'captureStream'],
  ['puedeReproducirTipo', 'canPlayType'],
  ['saltoRapido', 'fastSeek'],
  ['cargar', 'load'],
  ['pausar', 'pause'],
  ['reproducir', 'play'],
  ['establecerClavesMultimedia', 'setMediaKeys'],
  ['establecerIdDeSalida', 'setSinkId'],
])

export function replace() {
  return {
    ...replaceExpressionMethods({
      methods,
    }),
    ...replaceObjectProperties({
      properties,
    }),
    ...replaceInstanceof({
      from: 'ElementoHTMLDeMedios',
      to: 'HTMLMediaElement',
    }),
    ...replaceObjects({
      objects,
    }),
  }
}
