import esjsSyntax from '@es-js/language-tools/esjs.tmLanguage.json'
import { getHighlighter as getShikiHighlighter } from 'shiki'

export const getHighlighter = async () => {
  const esjsLanguage = {
    id: 'esjs',
    scopeName: 'source.esjs',
    grammar: esjsSyntax,
  }

  const highlighter = await getShikiHighlighter({
    themes: ['material-palenight'],
  })

  await highlighter.loadLanguage(esjsLanguage)

  return highlighter
}
