/**
 * Get entry scripts from HTML.
 */
export function getEntryScripts(html: string): Map<string, string> {
  const matches = html.match(/<script.*?src="(.+?\.esjs)".*?><\/script>/g)

  if (!matches) {
    return new Map()
  }

  const entryScripts = new Map<string, string>()

  for (const match of matches) {
    const src = match.match(/<script.*?src="(.+?\.esjs)".*?><\/script>/)?.[1]

    if (src) {
      entryScripts.set(src.replace('.esjs', '.js'), src)
    }
  }

  return entryScripts
}
