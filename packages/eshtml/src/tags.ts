import { invertMap } from '@es-js/core/utils'

const dictionary: Map<string, string> = new Map([
  // Document Structure
  ['html', 'eshtml'],
  ['head', 'cabecera'],
  ['body', 'cuerpo'],
  ['title', 'titulo'],

  // Metadata Elements
  ['base', 'base'],
  ['link', 'recurso'],
  ['meta', 'meta'],
  ['style', 'estilo'],

  // Sectioning Content
  ['address', 'direccion'],
  ['article', 'articulo'],
  ['aside', 'lateral'],
  ['footer', 'pie-pagina'],
  ['header', 'encabezado'],
  ['h1', 't1'],
  ['h2', 't2'],
  ['h3', 't3'],
  ['h4', 't4'],
  ['h5', 't5'],
  ['h6', 't6'],
  ['hgroup', 'grupo-encabezados'],
  ['main', 'principal'],
  ['nav', 'navegacion'],
  ['section', 'seccion'],

  // Text Content
  ['blockquote', 'cita-bloque'],
  ['dd', 'definicion-descripcion'],
  ['div', 'division'],
  ['dl', 'lista-definiciones'],
  ['dt', 'termino-definicion'],
  ['figcaption', 'figura-leyenda'],
  ['figure', 'figura'],
  ['hr', 'linea-horizontal'],
  ['li', 'lista-elemento'],
  ['ol', 'lista-ordenada'],
  ['p', 'parrafo'],
  ['pre', 'preformateado'],
  ['ul', 'lista-desordenada'],

  // Inline Text Semantics
  ['a', 'enlace'],
  ['abbr', 'abreviatura'],
  ['b', 'negrita'],
  ['bdi', 'aislamiento-direccion-texto'],
  ['bdo', 'anulacion-direccion-texto'],
  ['br', 'salto-linea'],
  ['cite', 'cita'],
  ['code', 'codigo-bloque'],
  ['data', 'datos'],
  ['dfn', 'definicion'],
  ['em', 'enfasis'],
  ['i', 'cursiva'],
  ['kbd', 'tecla'],
  ['mark', 'marcado'],
  ['q', 'cita-corta'],
  ['rp', 'rp'],
  ['rt', 'rt'],
  ['ruby', 'ruby'],
  ['s', 'tachado'],
  ['samp', 'muestra'],
  ['small', 'pequeño'],
  ['span', 'segmento'],
  ['strong', 'fuerte'],
  ['sub', 'subindice'],
  ['sup', 'superindice'],
  ['time', 'hora'],
  ['u', 'subrayado'],
  ['var', 'variable'],
  ['wbr', 'salto-linea-opcional'],

  // Multimedia Elements
  ['area', 'area'],
  ['audio', 'audio'],
  ['img', 'imagen'],
  ['map', 'mapa'],
  ['track', 'pista'],
  ['video', 'video'],

  // Embedded Content
  ['embed', 'incrustar'],
  ['iframe', 'marco-integrado'],
  ['object', 'objeto'],
  ['param', 'parametro'],
  ['picture', 'imagen-adaptativa'],
  ['source', 'origen'],

  // Scripting Elements
  ['canvas', 'canvas'],
  ['noscript', 'sin-codigo'],
  ['script', 'codigo'],

  // Table Elements
  ['caption', 'tabla-leyenda'],
  ['col', 'columna'],
  ['colgroup', 'grupo-columnas'],
  ['table', 'tabla'],
  ['tbody', 'tabla-cuerpo'],
  ['td', 'tabla-celda'],
  ['tfoot', 'tabla-pie'],
  ['th', 'tabla-celda-encabezado'],
  ['thead', 'tabla-encabezado'],
  ['tr', 'tabla-fila'],

  // Form Elements
  ['button', 'boton'],
  ['datalist', 'lista-datos'],
  ['fieldset', 'conjunto-campos'],
  ['form', 'formulario'],
  ['input', 'entrada'],
  ['label', 'etiqueta'],
  ['legend', 'leyenda'],
  ['meter', 'medidor'],
  ['optgroup', 'grupo-opciones'],
  ['option', 'opcion'],
  ['output', 'salida'],
  ['progress', 'progreso'],
  ['select', 'seleccion'],
  ['textarea', 'area-texto'],

  // Interactive Elements
  ['menu', 'menu'],
  ['details', 'detalles'],
  ['dialog', 'dialogo'],
  ['summary', 'resumen'],

  // Web Components
  ['template', 'plantilla'],
  ['slot', 'ranura'],

  // SVG and Math
  ['svg', 'grafico-vectorial'],

  // Deprecated (No soportadas en HTML5 o reemplazadas)
  // ['acronimo', 'acronym'],
  // ['applet', 'applet'],
  // ['base-fuente', 'basefont'],
  // ['grande', 'big'],
  // ['centrar', 'center'],
  // ['directorio', 'dir'],
  // ['fuente', 'font'],
  // ['marco', 'frame'],
  // ['conjunto-marcos', 'frameset'],
  // ['sin-marcos', 'noframes'],
  // ['teletipo', 'tt'],
])

export function getDictionary(inverted = false): Map<string, string> {
  if (!inverted) {
    return invertMap(dictionary)
  }

  return dictionary
}

export const htmlTags = [
  // '!DOCTYPE',
  'a',
  'abbr',
  // 'acronym',
  'address',
  // 'applet',
  'area',
  'article',
  'aside',
  'audio',
  'b',
  'base',
  // 'basefont',
  'bdi',
  'bdo',
  // 'big',
  'blockquote',
  'body',
  'br',
  'button',
  'canvas',
  'caption',
  // 'center',
  'cite',
  'code',
  'col',
  'colgroup',
  'data',
  'datalist',
  'dd',
  // 'del',
  'details',
  'dfn',
  'dialog',
  // 'dir',
  'div',
  'dl',
  'dt',
  'em',
  'embed',
  'fieldset',
  'figcaption',
  'figure',
  // 'font',
  'footer',
  'form',
  // 'frame',
  // 'frameset',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'head',
  'header',
  'hgroup',
  'hr',
  'html',
  'i',
  'iframe',
  'img',
  'input',
  // 'ins',
  'kbd',
  'label',
  'legend',
  'li',
  'link',
  'main',
  'map',
  'mark',
  'menu',
  'meta',
  'meter',
  'nav',
  // 'noframes',
  'noscript',
  'object',
  'ol',
  'optgroup',
  'option',
  'output',
  'p',
  'param',
  'picture',
  'pre',
  'progress',
  'q',
  'rp',
  'rt',
  'ruby',
  's',
  'samp',
  'script',
  // 'search',
  'section',
  'select',
  'slot',
  'small',
  'source',
  'span',
  // 'strike',
  'strong',
  'style',
  'sub',
  'summary',
  'sup',
  'svg',
  'table',
  'tbody',
  'td',
  'template',
  'textarea',
  'tfoot',
  'th',
  'thead',
  'time',
  'title',
  'tr',
  'track',
  // 'tt',
  'u',
  'ul',
  'var',
  'video',
  'wbr',
]
