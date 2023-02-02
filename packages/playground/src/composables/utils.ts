import * as esprima from 'esprima'

/**
 * Agrega un límite de tiempo de ejecución para cada bucle.
 * @author Ariya Hidayat.
 * @see https://github.com/chinchang/web-maker/blob/master/src/utils.js#L122
 */
export function addInfiniteLoopProtection(code: string, { timeout } = { timeout: 75 }) {
  let loopId = 1
  const patches = []
  const varPrefix = '_wmloopvar'
  const varStr = 'var %d = Date.now();\n'
  const checkStr = `\nif (Date.now() - %d > ${timeout}) { window._handleInfiniteLoopException(new Error("Bucle infinito")); break;}\n`

  esprima.parse(
    code,
    {
      tolerant: true,
      range: true,
      jsx: true,
    },
    (node) => {
      switch (node.type) {
        case 'DoWhileStatement':
        case 'ForStatement':
        case 'ForInStatement':
        case 'ForOfStatement':
        case 'WhileStatement':
          var start = 1 + node.body.range[0]
          var end = node.body.range[1]
          var prolog = checkStr.replace('%d', varPrefix + loopId)
          var epilog = ''

          if (node.body.type !== 'BlockStatement') {
            // `while(1) doThat()` becomes `while(1) {doThat()}`
            prolog = `{${prolog}`
            epilog = '}'
            --start
          }

          patches.push({
            pos: start,
            str: prolog,
          })
          patches.push({
            pos: end,
            str: epilog,
          })
          patches.push({
            pos: node.range[0],
            str: varStr.replace('%d', varPrefix + loopId),
          })
          ++loopId
          break

        default:
          break
      }
    },
  )

  patches
    .sort((a, b) => {
      return b.pos - a.pos
    })
    .forEach((patch) => {
      code = code.slice(0, patch.pos) + patch.str + code.slice(patch.pos)
    })

  return code
}

/**
 * @author @slevithan
 * @param str
 */
export function escapeQuotes(str) {
  return str.replace(/\\([\s\S])|(")/g, '\\$1$2')
}
