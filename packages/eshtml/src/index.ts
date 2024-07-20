import { parser } from 'posthtml-parser'
import { transformAttr } from './attrs'
import { render } from './render'
import { replaceDocType } from './utils/replaceDocType'
import { getDictionary } from './tags'
import { compile as compileEsJS } from '@es-js/core'

export interface CompileOptions {
  from?: 'eshtml' | 'html'
  to?: 'eshtml' | 'html'
  compileEsJS?: boolean
}

export function compile(
  content: string,
  options: CompileOptions = {
    from: 'eshtml',
    to: 'html',
  },
): string {
  if (!options.from) {
    options.from = 'eshtml'
  }

  if (!options.to) {
    options.to = 'html'
  }

  if (!options.compileEsJS) {
    options.compileEsJS = true
  }

  try {
    if (options?.to === 'html') {
      content = replaceDocType(content, {
        from: 'eshtml',
        to: 'html',
      })
    }

    const tree = parser(content)

    const dictionary = getDictionary(options?.to === 'eshtml')

    const newTree = compileTreeRecursive(tree, dictionary, options)

    let output = render(newTree)

    if (options?.to === 'eshtml') {
      output = replaceDocType(output, {
        from: 'html',
        to: 'eshtml',
      })
    }

    return output
  } catch (error) {
    console.error({ error })
    return content
  }
}

function compileTreeRecursive(
  tree: any[],
  dictionary: Map<string, string>,
  options: CompileOptions,
): any[] {
  return tree.map((node) => {
    if (typeof node === 'string') {
      return node
    }

    const { tag, attrs, content } = node

    if (!tag) {
      return node
    }

    const newTag = transformTag(tag, dictionary)
    const htmlTag = options?.to === 'html' ? newTag : tag
    const newAttrs = transformAttrs(htmlTag, attrs, options)

    let newContent = content
    if (htmlTag === 'script' && options?.compileEsJS) {
      newContent = content.map((c: any) => compileScriptContent(c, options))
    } else if (content) {
      newContent = compileTreeRecursive(content, dictionary, options)
    }

    return { tag: newTag, attrs: newAttrs, content: newContent }
  })
}

function compileScriptContent(content: any, options: CompileOptions): any {
  if (typeof content === 'string') {
    return compileEsJS(content, {
      from: options?.from === 'eshtml' ? 'esjs' : 'js',
      to: options?.to === 'eshtml' ? 'esjs' : 'js',
    })
  }
  return content
}

function transformTag(
  tagName: string,
  dictionary: Map<string, string>,
): string {
  return dictionary.get(tagName.toLowerCase()) || tagName
}

function transformAttrs(
  tagName: string,
  attrs: any,
  options: CompileOptions,
): any {
  if (!attrs) {
    return attrs
  }

  const newAttrs = {}

  for (const key in attrs) {
    const newKey = transformAttr(tagName, key, options)
    // @ts-ignore
    newAttrs[newKey] = attrs[key]
  }

  return newAttrs
}
