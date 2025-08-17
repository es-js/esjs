import {
    replaceExpressionMethods,
    replaceObjects,
    replaceInstanceof,
} from '../utils'

export const report = ()=> 'Converts clavesmultimedia to mediakeys'

export const objects = new Map<string, string>([['ClavesMultimedia', 'MediaKeys']])

export const methods = new Map<string, string>([
    ['crearSesion', 'createSession'],
    ['obtenerEstadoParaPolitica', 'getStatusForPolicy'],
    ['establecerServidorCertificado', 'setServerCertificate']
])

export function replace(){
    return {
        ...replaceExpressionMethods({
            methods,
        }),
        ...replaceInstanceof({
            from: 'ClavesMultimedia',
            to: 'MediaKeys',
        }),
        ...replaceObjects({
            objects,
        }),
    };
}