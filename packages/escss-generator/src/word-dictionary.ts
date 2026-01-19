/**
 * Word-based translation dictionary for CSS property names.
 * These are word fragments that appear in CSS property names.
 */
export const cssWordTranslations = new Map<string, string>([
  // Layout
  ['display', 'mostrar'],
  ['position', 'posicion'],
  ['flex', 'flex'],
  ['grid', 'cuadricula'],
  ['float', 'flotar'],
  ['clear', 'limpiar'],

  // Dimensions
  ['width', 'ancho'],
  ['height', 'alto'],
  ['min', 'minimo'],
  ['max', 'maximo'],
  ['size', 'tamanio'],

  // Spacing
  ['margin', 'margen'],
  ['padding', 'relleno'],
  ['gap', 'espacio'],

  // Box Model
  ['border', 'borde'],
  ['outline', 'contorno'],
  ['radius', 'radio'],
  ['shadow', 'sombra'],
  ['box', 'caja'],

  // Colors & Backgrounds
  ['color', 'color'],
  ['background', 'fondo'],
  ['opacity', 'opacidad'],
  ['image', 'imagen'],

  // Typography
  ['font', 'fuente'],
  ['family', 'familia'],
  ['text', 'texto'],
  ['line', 'linea'],
  ['letter', 'letra'],
  ['word', 'palabra'],
  ['align', 'alinear'],
  ['vertical', 'vertical'],
  ['horizontal', 'horizontal'],
  ['weight', 'peso'],
  ['style', 'estilo'],
  ['decoration', 'decoracion'],
  ['transform', 'transformar'],
  ['spacing', 'espaciado'],
  ['indent', 'sangria'],
  ['wrap', 'envolver'],
  ['overflow', 'desbordamiento'],
  ['white', 'blanco'],
  ['space', 'espacio'],

  // Flexbox/Grid
  ['direction', 'direccion'],
  ['justify', 'justificar'],
  ['content', 'contenido'],
  ['items', 'elementos'],
  ['self', 'propio'],
  ['grow', 'crecer'],
  ['shrink', 'encoger'],
  ['basis', 'base'],
  ['order', 'orden'],
  ['template', 'plantilla'],
  ['columns', 'columnas'],
  ['rows', 'filas'],
  ['area', 'area'],
  ['auto', 'auto'],
  ['flow', 'flujo'],

  // Positioning
  ['top', 'arriba'],
  ['bottom', 'abajo'],
  ['left', 'izquierda'],
  ['right', 'derecha'],
  ['inset', 'insercion'],
  ['z', 'z'],
  ['index', 'indice'],

  // Animation & Transition
  ['animation', 'animacion'],
  ['transition', 'transicion'],
  ['duration', 'duracion'],
  ['delay', 'retraso'],
  ['timing', 'tiempo'],
  ['function', 'funcion'],
  ['iteration', 'iteracion'],
  ['count', 'conteo'],
  ['fill', 'relleno'],
  ['mode', 'modo'],
  ['play', 'reproducir'],
  ['state', 'estado'],
  ['name', 'nombre'],
  ['keyframes', 'fotogramas'],

  // Visual
  ['visibility', 'visibilidad'],
  ['clip', 'recorte'],
  ['path', 'ruta'],
  ['filter', 'filtro'],
  ['blend', 'mezcla'],
  ['cursor', 'cursor'],
  ['pointer', 'puntero'],
  ['events', 'eventos'],
  ['resize', 'redimensionar'],
  ['user', 'usuario'],
  ['select', 'seleccionar'],
  ['scroll', 'desplazar'],
  ['behavior', 'comportamiento'],
  ['snap', 'ajustar'],

  // Table
  ['table', 'tabla'],
  ['caption', 'titulo'],
  ['cell', 'celda'],
  ['collapse', 'colapsar'],
  ['layout', 'disposicion'],

  // List
  ['list', 'lista'],
  ['marker', 'marcador'],
  ['counter', 'contador'],
  ['reset', 'reiniciar'],
  ['increment', 'incrementar'],

  // Other
  ['object', 'objeto'],
  ['fit', 'ajuste'],
  ['aspect', 'aspecto'],
  ['ratio', 'proporcion'],
  ['contain', 'contener'],
  ['break', 'romper'],
  ['page', 'pagina'],
  ['inside', 'dentro'],
  ['after', 'despues'],
  ['before', 'antes'],
  ['column', 'columna'],
  ['rule', 'regla'],
  ['orphans', 'huerfanos'],
  ['widows', 'viudas'],
  ['all', 'todo'],
  ['initial', 'inicial'],
  ['inherit', 'heredar'],
  ['unset', 'desestablecer'],
  ['revert', 'revertir'],
  ['none', 'ninguno'],
  ['block', 'bloque'],
  ['inline', 'enlinea'],
  ['hidden', 'oculto'],
  ['visible', 'visible'],
  ['solid', 'solido'],
  ['dashed', 'discontinuo'],
  ['dotted', 'punteado'],
  ['double', 'doble'],
  ['start', 'inicio'],
  ['end', 'fin'],
  ['center', 'centro'],
  ['stretch', 'estirar'],
  ['normal', 'normal'],
  ['bold', 'negrita'],
  ['italic', 'italica'],
  ['underline', 'subrayado'],
  ['overline', 'sobrelinea'],
  ['through', 'atraves'],
  ['capitalize', 'capitalizar'],
  ['uppercase', 'mayusculas'],
  ['lowercase', 'minusculas'],
  ['nowrap', 'sinenvolver'],
  ['pre', 'pre'],
  ['baseline', 'lineabase'],
  ['middle', 'medio'],
  ['sub', 'sub'],
  ['super', 'super'],
  ['absolute', 'absoluto'],
  ['relative', 'relativo'],
  ['fixed', 'fijo'],
  ['sticky', 'pegajoso'],
  ['static', 'estatico'],
  ['cover', 'cubrir'],
  ['repeat', 'repetir'],
  ['attachment', 'fijacion'],
  ['origin', 'origen'],
  ['sizing', 'dimensionamiento'],
  ['accent', 'acento'],
  ['caret', 'cursor-texto'],
  ['appearance', 'apariencia'],
  ['writing', 'escritura'],
  ['rotate', 'rotar'],
  ['scale', 'escala'],
  ['translate', 'trasladar'],
  ['skew', 'sesgar'],
  ['perspective', 'perspectiva'],
  ['backface', 'cara-trasera'],
  ['mask', 'mascara'],
  ['shape', 'forma'],
  ['offset', 'desplazamiento'],
  ['place', 'colocar'],
  ['touch', 'tocar'],
  ['action', 'accion'],
  ['will', 'va'],
  ['change', 'cambiar'],
  ['mix', 'mezclar'],
  ['isolation', 'aislamiento'],
  ['hyphens', 'guiones'],
  ['hanging', 'colgante'],
  ['punctuation', 'puntuacion'],
  ['tab', 'tabulacion'],
  ['print', 'imprimir'],
  ['orphans', 'huerfanos'],
  ['widows', 'viudas'],
])

/**
 * Translate a CSS property name to Spanish using word-based translation.
 */
export function translateProperty(cssProperty: string): string {
  const parts = cssProperty.split('-')
  const translated = parts.map((part) => cssWordTranslations.get(part) || part)
  return translated.join('-')
}

/**
 * Create an inverted map (Spanish -> English)
 */
export function createInvertedWordDictionary(): Map<string, string> {
  const inverted = new Map<string, string>()
  for (const [key, value] of cssWordTranslations.entries()) {
    inverted.set(value, key)
  }
  return inverted
}
