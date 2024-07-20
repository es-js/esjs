import parserBabel from 'prettier/parser-babel'
import prettier from 'prettier/standalone'
import { Transformer } from './index'

export class FormatTransformer implements Transformer {
  transform(code: string) {
    return prettier.format(code, {
      parser: 'babel',
      plugins: [parserBabel],
      semi: false,
    })
  }
}
