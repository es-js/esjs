import { getHighlighter as getShikiHighlighter } from 'shiki'
import esjsSyntax from './esjs.tmLanguage.json' assert {type: 'json'}

export const getHighlighter = async () => {
  const esjsLanguage = {
    id: 'esjs',
    scopeName: 'source.esjs',
    grammar: esjsSyntax,
  }

  const highlighter = await getShikiHighlighter({})

  await highlighter.loadLanguage(esjsLanguage)

  return highlighter
}
