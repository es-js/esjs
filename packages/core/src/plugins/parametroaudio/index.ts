import {
    replaceExpressionMethods,
    replaceObjects,
    replaceObjectProperties,
    replaceInstanceof,
} from '../utils'

export const report = ()=> 'Converts parametroaudio to audioparam'

export const properties = new Map<string, string>([
    ['valorPorDefecto', 'defaultValue'],
    ['valorMaximo', 'maxValue'],
    ['valorMinimo', 'minValue'],
    ['valor', 'value']
])

export const objects = new Map<string, string>([['ParametroAudio', 'AudioParam']])

export const methods = new Map<string, string>([
    ['establecerValorEnTiempo', 'setValueAtTime'],
    ['rampaLinealAValorEnTiempo', 'linearRampToValueAtTime'],
    ['rampaExponencialAValorEnTiempo', 'exponentialRampToValueAtTime'],
    ['establecerObjetivoATiempo', 'setTargetAtTime'],
    ['establecerCurvaValorEnTiempo', 'setValueCurveAtTime'],
    ['cancelarProgramacionDeValores', 'cancelScheduledValues'],
    ['cancelarYMantenerEnTiempo', 'cancelAndHoldAtTime']
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
            from: 'ParametroAudio',
            to: 'AudioParam',
        }),
        ...replaceObjects({
            objects,
        }),
    };
}