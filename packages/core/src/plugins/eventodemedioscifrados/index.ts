import {
    replaceObjects,
    replaceObjectProperties,
    replaceInstanceof,
} from '../utils'

export const report = ()=> 'Converts eventodemedioscifrados to mediaencryptedevent'

export const properties = new Map<string, string>([
    ['tipoDatoDeInicializacion', 'initDataType'],
    ['datosDeInicializacion', 'initData']
])

export const objects = new Map<string, string>([['EventoDeMediosCifrados', 'MediaEncryptedEvent']])

export function replace(){
    return {
        ...replaceObjectProperties({
            properties,
        }),
        ...replaceInstanceof({
            from: 'EventoDeMediosCifrados',
            to: 'MediaEncryptedEvent',
        }),
        ...replaceObjects({
            objects,
        }),
    };
}