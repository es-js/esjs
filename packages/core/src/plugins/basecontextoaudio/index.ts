import {
    replaceExpressionMethods,
    replaceObjects,
    replaceObjectProperties,
    replaceInstanceof,
} from '../utils'

export const report = ()=> 'Converts basecontextoaudio to baseaudiocontext'

export const properties = new Map<string, string>([
    ['moduloDeAudio', 'audioWorklet'],
    ['tiempoActual', 'currentTime'],
    ['destino', 'destination'],
    ['oyente', 'listener'],
    ['frecuenciaDeMuestreo', 'sampleRate'],
    ['estado', 'state']
])

export const objects = new Map<string, string>([['BaseContextoAudio', 'BaseAudioContext']])

export const methods = new Map<string, string>([
    ['crearAnalizador', 'createAnalyser'],
    ['crearFiltroBiquad', 'createBiquadFilter'],
    ['crearBuffer', 'createBuffer'],
    ['crearFuenteBuffer', 'createBufferSource'],
    ['crearFuenteConstante', 'createConstantSource'],
    ['crearFusionadorDeCanales', 'createChannelMerger'],
    ['crearDivisorDeCanales', 'createChannelSplitter'],
    ['crearConvolucionador', 'createConvolver'],
    ['crearRetraso', 'createDelay'],
    ['crearCompresorDinamico', 'createDynamicsCompressor'],
    ['crearGanancia', 'createGain'],
    ['crearFiltroIIR', 'createIIRFilter'],
    ['crearOscilador', 'createOscillator'],
    ['crearPaneador', 'createPanner'],
    ['crearOndaPeriodica', 'createPeriodicWave'],
    ['crearPaneadorEstereo', 'createStereoPanner'],
    ['crearMoldeadorDeOnda', 'createWaveShaper'],
    ['decodificarDatosDeAudio', 'decodeAudioData']
])

export function replace(){
    return {
        ...replaceExpressionMethods({
            methods,
        }),
        ...replaceObjectProperties({
            properties,
        }),
        ...replaceInstanceof({
            from: 'BaseContextoAudio',
            to: 'BaseAudioContext',
        }),
        ...replaceObjects({
            objects,
        }),
    };
}