import { setToEsJS } from './utils'
import * as booleano from './booleano'
import * as cadena from './cadena'
import * as consola from './consola'
import * as fecha from './fecha'
import * as mate from './mate'
import * as matriz from './matriz'
import * as numero from './numero'
import * as promesa from './promesa'
import * as soporte from './soporte'
import * as funcion from './funcion'
import * as json from './json'
import * as tipos from './tipos'

export const plugins = [
	['consola', consola],
	['matriz', matriz],
	['cadena', cadena],
	['fecha', fecha],
	['numero', numero],
	['promesa', promesa],
	['mate', mate],
	['booleano', booleano],
	['funcion', funcion],
	['soporte', soporte],
	['json', json],
	['tipos', tipos],
]

export { setToEsJS }
