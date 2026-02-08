import {
  getPseudoClassesDictionary,
  getPseudoElementsDictionary,
} from '../generated/pseudo'
import { getDictionary as getSelectorsDictionary } from '../generated/selectors'

/**
 * Transform CSS selectors by converting element names, pseudo-classes and pseudo-elements.
 */
export function transformSelector(
  selector: string,
  toEsCSS: boolean
): string {
  const pseudoClassDict = getPseudoClassesDictionary(toEsCSS)
  const pseudoElementDict = getPseudoElementsDictionary(toEsCSS)
  const selectorsDict = getSelectorsDictionary(toEsCSS)

  let result = selector

  // Transform element selectors (body, div, etc.)
  // Match element names at the start, after space, comma, >, +, ~ or [
  // Allow matches followed by : (pseudo-class) but not ( or [
  result = result.replace(
    /(?<=^|[\s,>+~\[]|\))\b([a-zñ][a-zñ0-9-]*)\b(?![([])/gi,
    (match, element) => {
      const transformed = selectorsDict.get(element.toLowerCase())
      return transformed || match
    }
  )

  // Transform pseudo-elements (::before, ::after, etc.)
  result = result.replace(
    /::([a-zñ-]+)(?:\(([^)]*)\))?/gi,
    (match, pseudoElement, params) => {
      const transformed = pseudoElementDict.get(pseudoElement.toLowerCase())
      if (transformed) {
        return params ? `::${transformed}(${params})` : `::${transformed}`
      }
      return match
    }
  )

  // Transform pseudo-classes (:hover, :focus, etc.)
  // Handle both functional pseudo-classes like :nth-child(n) and simple ones like :hover
  result = result.replace(
    /:([a-zñ-]+)(?:\(([^)]*)\))?/gi,
    (match, pseudoClass, params) => {
      // Skip if it's actually a pseudo-element (double colon)
      if (match.startsWith('::')) {
        return match
      }

      const transformed = pseudoClassDict.get(pseudoClass.toLowerCase())
      if (transformed) {
        return params ? `:${transformed}(${params})` : `:${transformed}`
      }
      return match
    }
  )

  return result
}
