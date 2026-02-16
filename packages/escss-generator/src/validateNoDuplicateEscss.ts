/**
 * Validates that no two CSS keys map to the same EsCSS value in a translation map.
 * When invertMap is used, duplicate values would cause lost entries.
 * @param map - Map of CSS key -> EsCSS value
 * @param label - Label for the error message (e.g. "at-rule", "selector", "value")
 * @throws Error listing duplicated EsCSS names and their source CSS keys
 */
export function validateNoDuplicateEscssValues(
  map: Map<string, string>,
  label: string
): void {
  const seen = new Map<string, string[]>()
  for (const [css, escss] of map) {
    const existing = seen.get(escss)
    if (existing) {
      existing.push(css)
    } else {
      seen.set(escss, [css])
    }
  }
  const duplicates = Array.from(seen.entries()).filter(([, cssKeys]) => cssKeys.length > 1)
  if (duplicates.length > 0) {
    const details = duplicates
      .map(([escss, cssKeys]) => `  '${escss}' <- [${cssKeys.join(', ')}]`)
      .join('\n')
    throw new Error(`Duplicate EsCSS ${label} names detected:\n${details}`)
  }
}
