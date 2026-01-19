import { compile as EsJSCompile } from '@es-js/core'
import { compile as EsCSSCompile } from '@es-js/escss'
import { compile as EsHTMLCompile } from '@es-js/eshtml'
import { parser } from '@es-js/eshtml/parser'
import { render } from '@es-js/eshtml/render'

export interface CompileOptions {
  from?: 'esvue' | 'vue'
  to?: 'esvue' | 'vue'
}

export function compile(
  content: string,
  options: CompileOptions = {
    from: 'esvue',
    to: 'vue',
  },
): string {
  if (!options.from) {
    options.from = 'esvue'
  }

  if (!options.to) {
    options.to = 'vue'
  }

  try {
    const html = options.from === 'esvue' ? EsHTMLCompile(content) : content

    const tree = parser(html)

    // Compile script block
    const script: any = tree.find((node: any) => node.tag === 'script')
    if (script) {
      compileScriptNode(script, options)
    }

    // Compile style block
    const style: any = tree.find((node: any) => node.tag === 'style')
    if (style) {
      compileStyleNode(style, options)
    }

    const rendered = render(tree)

    return options.to === 'esvue'
      ? EsHTMLCompile(rendered, { from: 'html', to: 'eshtml' })
      : rendered
  } catch (error) {
    console.error({ error })
    return content
  }
}

function compileScriptNode(node: any, options: CompileOptions): any {
  if (node?.attrs?.hasOwnProperty('configuracion')) {
    delete node.attrs.configuracion
    node.attrs.setup = ''
  }

  if (node?.attrs?.hasOwnProperty('setup')) {
    const code = node && node.content && node.content[0]

    if (code) {
      node.content[0] = EsJSCompile(code)
    }

    if (options.to === 'esvue') {
      delete node.attrs.setup
      node.attrs.configuracion = ''
    }
  }

  return node
}

function compileStyleNode(node: any, options: CompileOptions): any {
  const content = node && node.content && node.content[0]

  if (content && typeof content === 'string') {
    // Compile CSS content
    node.content[0] = EsCSSCompile(content, {
      from: options.from === 'esvue' ? 'escss' : 'css',
      to: options.to === 'esvue' ? 'escss' : 'css',
    })
  }

  return node
}
