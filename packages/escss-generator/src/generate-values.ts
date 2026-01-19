/**
 * CSS values that should be translated to Spanish.
 * Maps CSS values to their Spanish equivalents.
 */
export const cssValueTranslations = new Map<string, string>([
  // Display values
  ['none', 'ninguno'],
  ['block', 'bloque'],
  ['inline', 'enlinea'],
  ['inline-block', 'enlinea-bloque'],
  ['flex', 'flex'],
  ['inline-flex', 'enlinea-flex'],
  ['grid', 'cuadricula'],
  ['inline-grid', 'enlinea-cuadricula'],
  ['table', 'tabla'],
  ['table-row', 'tabla-fila'],
  ['table-cell', 'tabla-celda'],
  ['table-column', 'tabla-columna'],
  ['table-row-group', 'tabla-grupo-filas'],
  ['table-column-group', 'tabla-grupo-columnas'],
  ['table-header-group', 'tabla-grupo-encabezado'],
  ['table-footer-group', 'tabla-grupo-pie'],
  ['list-item', 'elemento-lista'],
  ['contents', 'contenidos'],
  ['flow-root', 'flujo-raiz'],

  // Position values
  ['static', 'estatico'],
  ['relative', 'relativo'],
  ['absolute', 'absoluto'],
  ['fixed', 'fijo'],
  ['sticky', 'pegajoso'],

  // Visibility values
  ['visible', 'visible'],
  ['hidden', 'oculto'],
  ['collapse', 'colapsar'],

  // Overflow values
  ['scroll', 'desplazar'],
  ['auto', 'auto'],

  // Flexbox values
  ['row', 'fila'],
  ['row-reverse', 'fila-inversa'],
  ['column', 'columna'],
  ['column-reverse', 'columna-inversa'],
  ['wrap', 'envolver'],
  ['nowrap', 'sinenvolver'],
  ['wrap-reverse', 'envolver-inverso'],
  ['flex-start', 'flex-inicio'],
  ['flex-end', 'flex-fin'],
  ['center', 'centro'],
  ['space-between', 'espacio-entre'],
  ['space-around', 'espacio-alrededor'],
  ['space-evenly', 'espacio-uniforme'],
  ['stretch', 'estirar'],
  ['baseline', 'lineabase'],
  ['start', 'inicio'],
  ['end', 'fin'],
  ['self-start', 'propio-inicio'],
  ['self-end', 'propio-fin'],

  // Text alignment values
  ['left', 'izquierda'],
  ['right', 'derecha'],
  ['justify', 'justificar'],

  // Vertical alignment values
  ['top', 'arriba'],
  ['bottom', 'abajo'],
  ['middle', 'medio'],
  ['text-top', 'texto-arriba'],
  ['text-bottom', 'texto-abajo'],
  ['sub', 'sub'],
  ['super', 'super'],

  // Font weight values
  ['normal', 'normal'],
  ['bold', 'negrita'],
  ['bolder', 'mas-negrita'],
  ['lighter', 'mas-ligera'],

  // Font style values
  ['italic', 'italica'],
  ['oblique', 'oblicua'],

  // Text transform values
  ['capitalize', 'capitalizar'],
  ['uppercase', 'mayusculas'],
  ['lowercase', 'minusculas'],

  // Text decoration values
  ['underline', 'subrayado'],
  ['overline', 'sobrelinea'],
  ['line-through', 'tachado'],

  // White space values
  ['pre', 'pre'],
  ['pre-wrap', 'pre-envolver'],
  ['pre-line', 'pre-linea'],
  ['break-spaces', 'romper-espacios'],

  // Word break values
  ['break-all', 'romper-todo'],
  ['keep-all', 'mantener-todo'],
  ['break-word', 'romper-palabra'],

  // Border style values
  ['solid', 'solido'],
  ['dashed', 'discontinuo'],
  ['dotted', 'punteado'],
  ['double', 'doble'],
  ['groove', 'ranura'],
  ['ridge', 'cresta'],
  ['inset', 'interno'],
  ['outset', 'externo'],

  // Background values
  ['repeat', 'repetir'],
  ['no-repeat', 'sin-repetir'],
  ['repeat-x', 'repetir-x'],
  ['repeat-y', 'repetir-y'],
  ['cover', 'cubrir'],
  ['contain', 'contener'],
  ['local', 'local'],
  ['padding-box', 'caja-relleno'],
  ['border-box', 'caja-borde'],
  ['content-box', 'caja-contenido'],

  // Object fit values
  ['fill', 'rellenar'],
  ['scale-down', 'reducir'],

  // Cursor values
  ['pointer', 'puntero'],
  ['default', 'predeterminado'],
  ['crosshair', 'cruceta'],
  ['move', 'mover'],
  ['text', 'texto'],
  ['wait', 'esperar'],
  ['help', 'ayuda'],
  ['not-allowed', 'no-permitido'],
  ['grab', 'agarrar'],
  ['grabbing', 'agarrando'],
  ['zoom-in', 'acercar'],
  ['zoom-out', 'alejar'],
  ['col-resize', 'redimensionar-columna'],
  ['row-resize', 'redimensionar-fila'],
  ['n-resize', 'redimensionar-norte'],
  ['s-resize', 'redimensionar-sur'],
  ['e-resize', 'redimensionar-este'],
  ['w-resize', 'redimensionar-oeste'],
  ['ne-resize', 'redimensionar-noreste'],
  ['nw-resize', 'redimensionar-noroeste'],
  ['se-resize', 'redimensionar-sureste'],
  ['sw-resize', 'redimensionar-suroeste'],
  ['ew-resize', 'redimensionar-este-oeste'],
  ['ns-resize', 'redimensionar-norte-sur'],
  ['nesw-resize', 'redimensionar-noreste-suroeste'],
  ['nwse-resize', 'redimensionar-noroeste-sureste'],

  // List style type values
  ['disc', 'disco'],
  ['circle', 'circulo'],
  ['square', 'cuadrado'],
  ['decimal', 'decimal'],
  ['decimal-leading-zero', 'decimal-cero-inicial'],
  ['lower-roman', 'romano-minuscula'],
  ['upper-roman', 'romano-mayuscula'],
  ['lower-alpha', 'alfa-minuscula'],
  ['upper-alpha', 'alfa-mayuscula'],
  ['lower-latin', 'latin-minuscula'],
  ['upper-latin', 'latin-mayuscula'],

  // Animation values
  ['infinite', 'infinito'],
  ['alternate', 'alternar'],
  ['alternate-reverse', 'alternar-inverso'],
  ['forwards', 'adelante'],
  ['backwards', 'atras'],
  ['both', 'ambos'],
  ['running', 'ejecutando'],
  ['paused', 'pausado'],
  ['ease', 'facilidad'],
  ['ease-in', 'facilidad-entrada'],
  ['ease-out', 'facilidad-salida'],
  ['ease-in-out', 'facilidad-entrada-salida'],
  ['linear', 'lineal'],
  ['step-start', 'paso-inicio'],
  ['step-end', 'paso-fin'],

  // Scroll behavior
  ['smooth', 'suave'],
  ['instant', 'instantaneo'],

  // Resize values
  ['both', 'ambos'],
  ['horizontal', 'horizontal'],
  ['vertical', 'vertical'],

  // User select values
  ['all', 'todo'],

  // Global values
  ['inherit', 'heredar'],
  ['initial', 'inicial'],
  ['unset', 'desestablecer'],
  ['revert', 'revertir'],

  // Font family values
  ['system-ui', 'sistema-ui'],
  ['sans-serif', 'sans-serif'],
  ['serif', 'serif'],
  ['monospace', 'monoespaciado'],
  ['cursive', 'cursiva'],
  ['fantasy', 'fantasia'],

  // CSS Named Colors - Basic
  ['black', 'negro'],
  ['white', 'blanco'],
  ['red', 'rojo'],
  ['green', 'verde'],
  ['blue', 'azul'],
  ['yellow', 'amarillo'],
  ['orange', 'naranja'],
  ['purple', 'purpura'],
  ['pink', 'rosa'],
  ['brown', 'marron'],
  ['gray', 'gris'],
  ['grey', 'gris'],

  // CSS Named Colors - Extended
  ['aqua', 'agua'],
  ['cyan', 'cian'],
  ['magenta', 'magenta'],
  ['lime', 'lima'],
  ['olive', 'oliva'],
  ['navy', 'marino'],
  ['teal', 'verde-azulado'],
  ['maroon', 'granate'],
  ['silver', 'plata'],
  ['gold', 'oro'],
  ['coral', 'coral'],
  ['salmon', 'salmon'],
  ['crimson', 'carmesi'],
  ['violet', 'violeta'],
  ['indigo', 'indigo'],
  ['turquoise', 'turquesa'],
  ['beige', 'beige'],
  ['ivory', 'marfil'],
  ['khaki', 'caqui'],
  ['lavender', 'lavanda'],
  ['plum', 'ciruela'],
  ['orchid', 'orquidea'],
  ['tan', 'bronceado'],
  ['chocolate', 'chocolate'],
  ['sienna', 'siena'],
  ['peru', 'peru'],
  ['wheat', 'trigo'],
  ['linen', 'lino'],
  ['snow', 'nieve'],
  ['azure', 'celeste'],
  ['mint', 'menta'],
  ['honeydew', 'melon'],

  // CSS Named Colors - Dark variants
  ['darkblue', 'azul-oscuro'],
  ['darkgreen', 'verde-oscuro'],
  ['darkred', 'rojo-oscuro'],
  ['darkcyan', 'cian-oscuro'],
  ['darkmagenta', 'magenta-oscuro'],
  ['darkorange', 'naranja-oscuro'],
  ['darkviolet', 'violeta-oscuro'],
  ['darkgray', 'gris-oscuro'],
  ['darkgrey', 'gris-oscuro'],
  ['darkkhaki', 'caqui-oscuro'],
  ['darkolivegreen', 'verde-oliva-oscuro'],
  ['darkorchid', 'orquidea-oscuro'],
  ['darksalmon', 'salmon-oscuro'],
  ['darkseagreen', 'verde-mar-oscuro'],
  ['darkslateblue', 'azul-pizarra-oscuro'],
  ['darkslategray', 'gris-pizarra-oscuro'],
  ['darkslategrey', 'gris-pizarra-oscuro'],
  ['darkturquoise', 'turquesa-oscuro'],
  ['darkgoldenrod', 'oro-oscuro'],

  // CSS Named Colors - Light variants
  ['lightblue', 'azul-claro'],
  ['lightgreen', 'verde-claro'],
  ['lightcyan', 'cian-claro'],
  ['lightpink', 'rosa-claro'],
  ['lightyellow', 'amarillo-claro'],
  ['lightgray', 'gris-claro'],
  ['lightgrey', 'gris-claro'],
  ['lightcoral', 'coral-claro'],
  ['lightsalmon', 'salmon-claro'],
  ['lightseagreen', 'verde-mar-claro'],
  ['lightskyblue', 'azul-cielo-claro'],
  ['lightslategray', 'gris-pizarra-claro'],
  ['lightslategrey', 'gris-pizarra-claro'],
  ['lightsteelblue', 'azul-acero-claro'],
  ['lightgoldenrodyellow', 'amarillo-oro-claro'],

  // CSS Named Colors - Other common
  ['aliceblue', 'azul-alice'],
  ['antiquewhite', 'blanco-antiguo'],
  ['aquamarine', 'aguamarina'],
  ['blanchedalmond', 'almendra-blanqueada'],
  ['blueviolet', 'azul-violeta'],
  ['burlywood', 'madera'],
  ['cadetblue', 'azul-cadete'],
  ['chartreuse', 'chartreuse'],
  ['cornflowerblue', 'azul-aciano'],
  ['cornsilk', 'seda-maiz'],
  ['deeppink', 'rosa-profundo'],
  ['deepskyblue', 'azul-cielo-profundo'],
  ['dimgray', 'gris-tenue'],
  ['dimgrey', 'gris-tenue'],
  ['dodgerblue', 'azul-dodger'],
  ['firebrick', 'ladrillo'],
  ['floralwhite', 'blanco-floral'],
  ['forestgreen', 'verde-bosque'],
  ['fuchsia', 'fucsia'],
  ['gainsboro', 'gainsboro'],
  ['ghostwhite', 'blanco-fantasma'],
  ['greenyellow', 'verde-amarillo'],
  ['hotpink', 'rosa-intenso'],
  ['indianred', 'rojo-indio'],
  ['lawngreen', 'verde-cesped'],
  ['lemonchiffon', 'chiffon-limon'],
  ['mediumaquamarine', 'aguamarina-medio'],
  ['mediumblue', 'azul-medio'],
  ['mediumorchid', 'orquidea-medio'],
  ['mediumpurple', 'purpura-medio'],
  ['mediumseagreen', 'verde-mar-medio'],
  ['mediumslateblue', 'azul-pizarra-medio'],
  ['mediumspringgreen', 'verde-primavera-medio'],
  ['mediumturquoise', 'turquesa-medio'],
  ['mediumvioletred', 'rojo-violeta-medio'],
  ['midnightblue', 'azul-medianoche'],
  ['mistyrose', 'rosa-brumoso'],
  ['moccasin', 'mocasin'],
  ['navajowhite', 'blanco-navajo'],
  ['oldlace', 'encaje-antiguo'],
  ['olivedrab', 'verde-oliva-militar'],
  ['orangered', 'rojo-naranja'],
  ['palegoldenrod', 'oro-palido'],
  ['palegreen', 'verde-palido'],
  ['paleturquoise', 'turquesa-palido'],
  ['palevioletred', 'rojo-violeta-palido'],
  ['papayawhip', 'papaya'],
  ['peachpuff', 'melocoton'],
  ['powderblue', 'azul-polvo'],
  ['rebeccapurple', 'purpura-rebecca'],
  ['rosybrown', 'marron-rosado'],
  ['royalblue', 'azul-real'],
  ['saddlebrown', 'marron-silla'],
  ['sandybrown', 'marron-arena'],
  ['seagreen', 'verde-mar'],
  ['seashell', 'concha'],
  ['skyblue', 'azul-cielo'],
  ['slateblue', 'azul-pizarra'],
  ['slategray', 'gris-pizarra'],
  ['slategrey', 'gris-pizarra'],
  ['springgreen', 'verde-primavera'],
  ['steelblue', 'azul-acero'],
  ['thistle', 'cardo'],
  ['tomato', 'tomate'],
  ['whitesmoke', 'humo-blanco'],
  ['yellowgreen', 'verde-amarillento'],

  // Transparent
  ['transparent', 'transparente'],
  ['currentcolor', 'color-actual'],
  ['currentColor', 'color-actual'],
])

/**
 * Generate TypeScript code for the values dictionary.
 */
export function generateValuesCode(): string {
  const entries = Array.from(cssValueTranslations.entries())
    .map(([css, escss]) => `  ['${escss}', '${css}'],`)
    .join('\n')

  return `import { invertMap } from '@es-js/core/utils'

/**
 * EsCSS to CSS value dictionary.
 * Maps Spanish CSS values to standard CSS values.
 * Auto-generated by escss-generator.
 */
const dictionary: Map<string, string> = new Map([
${entries}
])

/**
 * Get the values dictionary.
 * @param inverted - If true, returns CSS -> EsCSS mapping, otherwise EsCSS -> CSS
 */
export function getDictionary(inverted = false): Map<string, string> {
  if (!inverted) {
    return dictionary
  }
  return invertMap(dictionary)
}

/**
 * Transform a CSS value, handling multiple values and functions.
 */
export function transformValue(
  value: string,
  dictionary: Map<string, string>
): string {
  // Split by spaces but preserve function contents
  const parts = value.split(/\\s+/)

  return parts
    .map((part) => {
      // Check for direct match
      if (dictionary.has(part)) {
        return dictionary.get(part)!
      }
      return part
    })
    .join(' ')
}
`
}
