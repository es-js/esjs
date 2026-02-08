/**
 * Transform a CSS value, handling multiple values and preserving function syntax.
 * @param value - The CSS value to transform
 * @param dictionary - The dictionary to use for transformation
 */
export function transformValue(
  value: string,
  dictionary: Map<string, string>
): string {
  // Handle simple direct match first
  const directMatch = dictionary.get(value)
  if (directMatch) {
    return directMatch
  }

  // Split by spaces but preserve function contents like calc(), var(), etc.
  const parts = splitValuePreservingFunctions(value)

  return parts
    .map((part) => {
      // Handle trailing commas (e.g., "sistema-ui," in font-family)
      const hasTrailingComma = part.endsWith(',')
      const cleanPart = hasTrailingComma ? part.slice(0, -1) : part

      // Check for direct match
      const match = dictionary.get(cleanPart)
      if (match) {
        return hasTrailingComma ? match + ',' : match
      }
      return part
    })
    .join(' ')
}

/**
 * Split a CSS value by spaces while preserving function contents.
 * For example: "flex 1px solid red" -> ["flex", "1px", "solid", "red"]
 * But: "calc(100% - 20px)" stays as one unit
 */
function splitValuePreservingFunctions(value: string): string[] {
  const parts: string[] = []
  let current = ''
  let depth = 0
  let quote: string | null = null
  let escaped = false

  for (let i = 0; i < value.length; i++) {
    const char = value[i]

    if (escaped) {
      current += char
      escaped = false
      continue
    }

    if (char === '\\') {
      current += char
      escaped = true
      continue
    }

    if (quote) {
      current += char
      if (char === quote) {
        quote = null
      }
      continue
    }

    if (char === '"' || char === '\'') {
      quote = char
      current += char
    } else if (char === '(') {
      depth++
      current += char
    } else if (char === ')') {
      depth--
      current += char
    } else if (char === ' ' && depth === 0) {
      if (current) {
        parts.push(current)
        current = ''
      }
    } else {
      current += char
    }
  }

  if (current) {
    parts.push(current)
  }

  return parts
}
