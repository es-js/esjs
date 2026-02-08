import postcss, { Root, Rule, Declaration, AtRule } from 'postcss'
import { getDictionary as getPropertiesDictionary } from './generated/properties'
import { getDictionary as getValuesDictionary } from './generated/values'
import { getDictionary as getAtRulesDictionary } from './generated/at-rules'
import { transformSelector } from './utils/transformSelector'
import { transformValue } from './utils/transformValue'

export interface CompileOptions {
  from?: 'escss' | 'css'
  to?: 'escss' | 'css'
}

/**
 * Compile EsCSS to CSS or CSS to EsCSS.
 *
 * @param content - The CSS or EsCSS content to compile
 * @param options - Compilation options
 * @returns The compiled content
 *
 * @example
 * ```typescript
 * // EsCSS to CSS
 * const css = compile(`
 *   .tarjeta {
 *     mostrar: flex;
 *     direccion-flex: columna;
 *     color-fondo: azul;
 *   }
 * `, { from: 'escss', to: 'css' })
 *
 * // CSS to EsCSS
 * const escss = compile(`
 *   .card {
 *     display: flex;
 *     flex-direction: column;
 *     background-color: blue;
 *   }
 * `, { from: 'css', to: 'escss' })
 * ```
 */
export function compile(
  content: string,
  options: CompileOptions = { from: 'escss', to: 'css' }
): string {
  if (!options.from) {
    options.from = 'escss'
  }

  if (!options.to) {
    options.to = 'css'
  }

  // If from and to are the same, return the content as-is
  if (options.from === options.to) {
    return content
  }

  try {
    const root = postcss.parse(content)
    const toEsCSS = options.to === 'escss'

    // Get dictionaries with correct direction
    // When toEsCSS is true: we need CSS -> EsCSS (inverted = true)
    // When toEsCSS is false: we need EsCSS -> CSS (inverted = false)
    const propDict = getPropertiesDictionary(toEsCSS)
    const valueDict = getValuesDictionary(toEsCSS)
    const atRuleDict = getAtRulesDictionary(toEsCSS)

    // Transform declarations (properties and values)
    root.walkDecls((decl: Declaration) => {
      const newProp = propDict.get(decl.prop)
      if (newProp) {
        decl.prop = newProp
      }
      decl.value = transformValue(decl.value, valueDict)
    })

    // Transform at-rules (@media, @keyframes, etc.)
    root.walkAtRules((atRule: AtRule) => {
      const newName = atRuleDict.get(atRule.name)
      if (newName) {
        atRule.name = newName
      }
      // Transform params (e.g., min-width in @media)
      atRule.params = transformMediaParams(atRule.params, propDict, valueDict)
    })

    // Transform selectors (pseudo-classes/elements)
    root.walkRules((rule: Rule) => {
      rule.selector = transformSelector(rule.selector, toEsCSS)
    })

    return root.toString()
  } catch (error) {
    console.error({ error })
    return content
  }
}

/**
 * Transform media query parameters.
 * Handles properties like min-width, max-height, etc.
 */
function transformMediaParams(
  params: string,
  propDict: Map<string, string>,
  valueDict: Map<string, string>
): string {
  // Match property: value pairs in media queries
  return params.replace(
    /\(([a-zñ-]+)\s*:\s*([^)]+)\)/gi,
    (match, property, value) => {
      const newProperty = propDict.get(property) || property
      const newValue = transformValue(value.trim(), valueDict)
      return `(${newProperty}: ${newValue})`
    }
  )
}

// Re-export utilities and dictionaries for advanced usage
export { transformSelector } from './utils/transformSelector'
export { transformValue } from './utils/transformValue'
export { getDictionary as getPropertiesDictionary } from './generated/properties'
export { getDictionary as getValuesDictionary } from './generated/values'
export { getDictionary as getAtRulesDictionary } from './generated/at-rules'
export { getDictionary as getSelectorsDictionary } from './generated/selectors'
export {
  getPseudoClassesDictionary,
  getPseudoElementsDictionary,
} from './generated/pseudo'
