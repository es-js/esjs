import { translateProperty } from './word-dictionary'

/**
 * Complete list of CSS properties to translate.
 * This is a curated list of the most commonly used CSS properties.
 */
export const cssProperties = [
  // Display & Visibility
  'display',
  'visibility',
  'opacity',

  // Positioning
  'position',
  'top',
  'right',
  'bottom',
  'left',
  'z-index',
  'inset',
  'inset-block',
  'inset-block-start',
  'inset-block-end',
  'inset-inline',
  'inset-inline-start',
  'inset-inline-end',

  // Box Model
  'width',
  'height',
  'min-width',
  'min-height',
  'max-width',
  'max-height',
  'margin',
  'margin-top',
  'margin-right',
  'margin-bottom',
  'margin-left',
  'margin-block',
  'margin-block-start',
  'margin-block-end',
  'margin-inline',
  'margin-inline-start',
  'margin-inline-end',
  'padding',
  'padding-top',
  'padding-right',
  'padding-bottom',
  'padding-left',
  'padding-block',
  'padding-block-start',
  'padding-block-end',
  'padding-inline',
  'padding-inline-start',
  'padding-inline-end',
  'box-sizing',

  // Border
  'border',
  'border-width',
  'border-style',
  'border-color',
  'border-top',
  'border-top-width',
  'border-top-style',
  'border-top-color',
  'border-right',
  'border-right-width',
  'border-right-style',
  'border-right-color',
  'border-bottom',
  'border-bottom-width',
  'border-bottom-style',
  'border-bottom-color',
  'border-left',
  'border-left-width',
  'border-left-style',
  'border-left-color',
  'border-radius',
  'border-top-left-radius',
  'border-top-right-radius',
  'border-bottom-right-radius',
  'border-bottom-left-radius',
  'border-image',
  'border-image-source',
  'border-image-slice',
  'border-image-width',
  'border-image-outset',
  'border-image-repeat',
  'border-collapse',
  'border-spacing',

  // Outline
  'outline',
  'outline-width',
  'outline-style',
  'outline-color',
  'outline-offset',

  // Background
  'background',
  'background-color',
  'background-image',
  'background-position',
  'background-size',
  'background-repeat',
  'background-attachment',
  'background-origin',
  'background-clip',
  'background-blend-mode',

  // Color
  'color',
  'accent-color',
  'caret-color',

  // Typography
  'font',
  'font-family',
  'font-size',
  'font-weight',
  'font-style',
  'font-variant',
  'font-stretch',
  'line-height',
  'letter-spacing',
  'word-spacing',
  'text-align',
  'text-decoration',
  'text-decoration-line',
  'text-decoration-color',
  'text-decoration-style',
  'text-decoration-thickness',
  'text-transform',
  'text-indent',
  'text-shadow',
  'text-overflow',
  'text-wrap',
  'white-space',
  'word-break',
  'word-wrap',
  'overflow-wrap',
  'hyphens',
  'tab-size',
  'vertical-align',
  'direction',
  'writing-mode',
  'unicode-bidi',

  // Flexbox
  'flex',
  'flex-direction',
  'flex-wrap',
  'flex-flow',
  'flex-grow',
  'flex-shrink',
  'flex-basis',
  'justify-content',
  'align-items',
  'align-self',
  'align-content',
  'order',
  'gap',
  'row-gap',
  'column-gap',

  // Grid
  'grid',
  'grid-template',
  'grid-template-columns',
  'grid-template-rows',
  'grid-template-areas',
  'grid-auto-columns',
  'grid-auto-rows',
  'grid-auto-flow',
  'grid-column',
  'grid-column-start',
  'grid-column-end',
  'grid-row',
  'grid-row-start',
  'grid-row-end',
  'grid-area',
  'place-content',
  'place-items',
  'place-self',

  // Overflow
  'overflow',
  'overflow-x',
  'overflow-y',
  'scroll-behavior',
  'scroll-margin',
  'scroll-margin-top',
  'scroll-margin-right',
  'scroll-margin-bottom',
  'scroll-margin-left',
  'scroll-padding',
  'scroll-padding-top',
  'scroll-padding-right',
  'scroll-padding-bottom',
  'scroll-padding-left',
  'scroll-snap-type',
  'scroll-snap-align',

  // Float & Clear
  'float',
  'clear',

  // List
  'list-style',
  'list-style-type',
  'list-style-position',
  'list-style-image',
  'counter-reset',
  'counter-increment',

  // Table
  'table-layout',
  'caption-side',
  'empty-cells',

  // Transform
  'transform',
  'transform-origin',
  'transform-style',
  'rotate',
  'scale',
  'translate',
  'perspective',
  'perspective-origin',
  'backface-visibility',

  // Transition
  'transition',
  'transition-property',
  'transition-duration',
  'transition-timing-function',
  'transition-delay',

  // Animation
  'animation',
  'animation-name',
  'animation-duration',
  'animation-timing-function',
  'animation-delay',
  'animation-iteration-count',
  'animation-direction',
  'animation-fill-mode',
  'animation-play-state',

  // Filters & Effects
  'filter',
  'backdrop-filter',
  'mix-blend-mode',
  'isolation',
  'box-shadow',

  // Clipping & Masking
  'clip',
  'clip-path',
  'mask',
  'mask-image',
  'mask-mode',
  'mask-position',
  'mask-size',
  'mask-repeat',
  'mask-origin',
  'mask-clip',

  // Object
  'object-fit',
  'object-position',
  'aspect-ratio',

  // Interaction
  'cursor',
  'pointer-events',
  'user-select',
  'touch-action',
  'resize',
  'appearance',
  'will-change',

  // Columns
  'columns',
  'column-count',
  'column-width',
  'column-rule',
  'column-rule-width',
  'column-rule-style',
  'column-rule-color',
  'column-span',
  'column-fill',

  // Print
  'page-break-before',
  'page-break-after',
  'page-break-inside',
  'break-before',
  'break-after',
  'break-inside',
  'orphans',
  'widows',

  // Contain
  'contain',
  'content-visibility',

  // Other
  'content',
  'quotes',
  'all',
]

/**
 * Generate the properties dictionary mapping.
 * Returns tuples of [css-property, escss-property]
 */
export function generatePropertiesMapping(): [string, string][] {
  const mappings = cssProperties.map((prop): [string, string] => [prop, translateProperty(prop)])

  const seen = new Map<string, string[]>()
  for (const [css, escss] of mappings) {
    const existing = seen.get(escss)
    if (existing) {
      existing.push(css)
    } else {
      seen.set(escss, [css])
    }
  }

  const duplicates = Array.from(seen.entries()).filter(([, cssNames]) => cssNames.length > 1)
  if (duplicates.length > 0) {
    const details = duplicates.map(([escss, cssNames]) => `  '${escss}' <- [${cssNames.join(', ')}]`).join('\n')
    throw new Error(`Duplicate EsCSS property names detected:\n${details}`)
  }

  return mappings
}

/**
 * Generate TypeScript code for the properties dictionary.
 */
export function generatePropertiesCode(): string {
  const mappings = generatePropertiesMapping()

  const entries = mappings
    .map(([css, escss]) => `  ['${escss}', '${css}'],`)
    .join('\n')

  return `import { invertMap } from '@es-js/core/utils'

/**
 * EsCSS to CSS property dictionary.
 * Maps Spanish CSS property names to standard CSS property names.
 * Auto-generated by escss-generator.
 */
const dictionary: Map<string, string> = new Map([
${entries}
])

/**
 * Get the properties dictionary.
 * @param inverted - If true, returns CSS -> EsCSS mapping, otherwise EsCSS -> CSS
 */
let invertedDictionary: Map<string, string> | undefined

export function getDictionary(inverted = false): Map<string, string> {
  if (!inverted) {
    return dictionary
  }
  if (!invertedDictionary) {
    invertedDictionary = invertMap(dictionary)
  }
  return invertedDictionary
}

/**
 * List of all CSS properties.
 */
export const cssProperties = [
${cssProperties.map((p) => `  '${p}',`).join('\n')}
]

/**
 * List of all EsCSS properties.
 */
export const escssProperties = [
${mappings.map(([, escss]) => `  '${escss}',`).join('\n')}
]
`
}
