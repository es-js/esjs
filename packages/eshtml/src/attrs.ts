import { invertMap } from '@es-js/core/utils'
import { attributeUsages } from './utils/attributeUsages'
import { CompileOptions } from './index'

const dictionary: Map<string, string> = new Map([
	['accept', 'aceptar'],
	['accept-charset', 'aceptar-conjunto-caracteres'],
	['accesskey', 'tecla-acceso'],
	['action', 'accion'],
	['allow', 'permitir'],
	['alt', 'alternativo'],
	['as', 'como'],
	['async', 'asincrono'],
	['autocapitalize', 'autocapitalizar'],
	['autocomplete', 'autocompletar'],
	['autoplay', 'autoreproducir'],
	['background', 'fondo'],
	['bgcolor', 'color-fondo'],
	['border', 'borde'],
	['capture', 'capturar'],
	['charset', 'conjunto-caracteres'],
	['checked', 'chequeado'],
	['cite', 'citar'],
	['class', 'clase'],
	['color', 'color'],
	['cols', 'columnas'],
	['colspan', 'extender-columnas'],
	['content', 'contenido'],
	['contenteditable', 'contenidoeditable'],
	['controls', 'controles'],
	['coords', 'coordenadas'],
	['crossorigin', 'cruzar-origen'],
	['csp', 'csp'],
	['data', 'datos'],
	// ['data-*', 'datos-*'],
	['datetime', 'fechahora'],
	['decoding', 'decodificacion'],
	['default', 'por-defecto'],
	['defer', 'diferir'],
	['dir', 'direccion'],
	['dirname', 'nombre-direccion'],
	['disabled', 'deshabilitado'],
	['download', 'descargar'],
	['draggable', 'arrastrable'],
	['enctype', 'tipo-encriptacion'],
	['enterkeyhint', 'sugerencia-tecla-enter'],
	['for', 'para'],
	['form', 'formulario'],
	['formaction', 'formulario-accion'],
	['formenctype', 'tipo-formulario-encriptacion'],
	['formmethod', 'formulario-metodo'],
	['formnovalidate', 'sin-formulario-validacion'],
	['formtarget', 'formulario-objetivo'],
	['headers', 'cabeceras'],
	['height', 'altura'],
	['hidden', 'oculto'],
	['high', 'alto'],
	['href', 'referencia'],
	['hreflang', 'lenguaje-referencia'],
	['http-equiv', 'http-equiv'],
	['id', 'id'],
	['integrity', 'integridad'],
	['inputmode', 'modo-entrada'],
	['ismap', 'es-mapa'],
	['itemprop', 'propiedad-elemento'],
	['kind', 'tipo'],
	['label', 'etiqueta'],
	['lang', 'idioma'],
	['loading', 'cargando'],
	['list', 'lista'],
	['loop', 'bucle'],
	['low', 'bajo'],
	['max', 'maximo'],
	['maxlength', 'longitud-maxima'],
	['minlength', 'longitud-minima'],
	['media', 'media'],
	['method', 'metodo'],
	['min', 'minimo'],
	['multiple', 'multiple'],
	['muted', 'silenciado'],
	['name', 'nombre'],
	['novalidate', 'sin-validar'],
	['open', 'abierto'],
	['optimum', 'optimo'],
	['pattern', 'patron'],
	['ping', 'ping'],
	['placeholder', 'marcador'],
	['playsinline', 'reproducir-en-linea'],
	['poster', 'poster'],
	['preload', 'precargar'],
	['readonly', 'solo-lectura'],
	['referrerpolicy', 'politica-referencias'],
	['rel', 'rel'],
	['required', 'requerido'],
	['reversed', 'invertido'],
	['role', 'rol'],
	['rows', 'filas'],
	['rowspan', 'extender-filas'],
	['sandbox', 'sandbox'],
	['scope', 'alcance'],
	['scoped', 'aislado'],
	['selected', 'seleccionado'],
	['shape', 'forma'],
	['size', 'tamaño'],
	['sizes', 'tamaños'],
	['slot', 'slot'],
	['span', 'rango'],
	['spellcheck', 'verificacion-ortografia'],
	['src', 'fuente'],
	['srcdoc', 'fuente-doc'],
	['srclang', 'fuente-idioma'],
	['srcset', 'fuente-conjunto'],
	['start', 'inicio'],
	['step', 'paso'],
	['style', 'estilo'],
	['tabindex', 'indice-tab'],
	['target', 'objetivo'],
	['title', 'titulo'],
	['translate', 'traducir'],
	['type', 'tipo'],
	['usemap', 'usar-mapa'],
	['value', 'valor'],
	['width', 'ancho'],
	['wrap', 'envolver'],
])

export function getDictionary(inverted = false): Map<string, string> {
	if (!inverted) {
		return invertMap(dictionary)
	}

	return dictionary
}

export function transformAttr(
	htmlTag: string,
	attr: string,
	options: CompileOptions,
): string {
	const innerDictionary = getDictionary(options?.to === 'eshtml')

	const newAttr = innerDictionary.get(attr) || attr

	const htmlAttr = options?.to === 'html' ? newAttr : attr

	// @ts-ignore
	const usage = attributeUsages[htmlAttr]

	if (!usage) {
		return attr
	}

	if (usage.includes(htmlTag) || usage.includes('__GLOBAL__')) {
		return newAttr
	}

	return attr
}
