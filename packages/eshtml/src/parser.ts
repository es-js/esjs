import { parser as PostHTMLParser } from 'posthtml-parser'

export function parser(content: string): any[] {
  return PostHTMLParser(content)
}
