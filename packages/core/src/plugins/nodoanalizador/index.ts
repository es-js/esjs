import {
    replaceExpressionMethods,
    replaceObjects,
    replaceObjectProperties,
    replaceInstanceof,
} from '../utils'

export const report = ()=> 'Converts nodoanalizador to analysernode'

export const properties = new Map<string, string>([
    ['fftTamaño', 'fftSize'],
    ['frecuenciaBinariaCuenta', 'frequencyBinCount'],
    ['suavizadoConstanteTiempo', 'smoothingTimeConstant'],
    ['minimoDecibelios', 'minDecibels'],
    ['maximoDecibelios', 'maxDecibels']
])

export const objects = new Map<string, string>([['NodoAnalizador', 'AnalyserNode']])

export const methods = new Map<string, string>([
    ['obtenerDatosDeTiempoFloat', 'getFloatTimeDomainData']
    ['obtenerDatosDeTiempoByte', 'getByteTimeDomainData'],
    ['obtenerDatosDeFrecuenciaFloat', 'getFloatFrequencyData'],
    ['obtenerDatosDeFrecuenciaByte', 'getByteFrequencyData']
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
            from: 'NodoAnalizador',
            to: 'AnalyserNode',
        }),
        ...replaceObjects({
            objects,
        }),
    };
}