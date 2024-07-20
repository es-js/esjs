/**
 * Replace EsJS entry script with a JS script that will load the EsJS script.
 */
export function replaceEntryScript(
  html: string,
  scriptType: string = 'module',
): string {
  return html.replace(/<script.*?src="(.+?\.esjs)".*?><\/script>/g, (m, p1) => {
    return `<script src="${p1.replace(
      '.esjs',
      '.js',
    )}" type="${scriptType}"></script>`
  })
}
