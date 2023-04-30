import generate from '@babel/generator'
import { TOKEN_TYPES } from '@/shared/constants'
import { translate } from '@/shared/utils/translate'

export const importDeclarationConverter = ({ node }) => `${translate('import')} ${translate('from')}${generate(node.source).code}`

export const exportNamedDeclarationConverter = ({ node }) => `${translate('export')}${getExportedTokenName(node)}`

export const exportDefaultDeclarationConverter = ({ node }) =>
    `${translate('export')} ${translate('default')} ${getExportedTokenName(node)}`

const getExportedTokenName = (path) => {
  const { declaration, specifiers } = path

  if (declaration)
    return ` ${getExportDeclarations(declaration)}`

  if (specifiers)
    return ''

  return generate(specifiers).code
}

const getExportDeclarations = (declaration) => {
  if (
    [TOKEN_TYPES.FUNCTION_DECLARATION, TOKEN_TYPES.ARROW_FUNCTION_EXPRESSION].includes(declaration.type)
  )
    return declaration.id ? declaration.id.name : `${translate('function')}`

  if (declaration.type === TOKEN_TYPES.VARIABLE_DECLARATION)
    return declaration.declarations[0].id.name

  if (declaration.type === TOKEN_TYPES.IDENTIFIER)
    return declaration.name

  if (declaration.type === TOKEN_TYPES.ASSIGNMENT_EXPRESSION)
    return declaration.left.name
}

export const classDeclarationConverter = ({ node }) => {
  return `class ${generate(node.id).code} ${
        node.superClass ? ` ${translate('extends')} ${generate(node.superClass).code}` : ''
    }`
}

export const objectPatternConverter = () => '{...}'

export const arrayPatternConverter = () => '[...]'
