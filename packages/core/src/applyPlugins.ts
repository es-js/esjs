import { parse, print, transform } from 'putout'
import { setToEsJS } from './plugins/utils'
import { plugins } from './plugins/'

export function applyPlugins(source: string, toEsJS = false) {
  const ast = parse(source, {
    printer: 'recast',
  })

  setToEsJS(toEsJS)

  transform(ast, source, {
    plugins,
  })

  return print(ast, {
    printer: 'recast',
  })
}
