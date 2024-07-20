import { render as renderPostHTML } from 'posthtml-render'
import { getDictionary } from './tags'

const dictionary = getDictionary(true)

export function render(tree: any): string {
  return renderPostHTML(tree, {
    singleTags: [
      'area',
      'base',
      'br',
      'col',
      'command',
      'embed',
      'hr',
      'img',
      'input',
      'keygen',
      'link',
      'menuitem',
      'meta',
      'param',
      'source',
      'track',
      'wbr',
    ].map((tag) => dictionary.get(tag) || tag),
  })
}
