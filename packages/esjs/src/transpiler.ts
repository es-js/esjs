const keywords = new Map([
  ['Fecha', 'Date'],
  ['NeN', 'isNaN'],
  ['async', 'async'],
  ['capturar', 'catch'],
  ['caso', 'case'],
  ['clase', 'class'],
  ['con', 'with'],
  ['const', 'const'],
  ['constructor', 'constructor'],
  ['continuar', 'continue'],
  ['crear', 'new'],
  ['de', 'of'],
  ['defecto', 'default'],
  ['depurador', 'debugger'],
  ['desde', 'for'],
  ['elegir', 'switch'],
  ['eliminar', 'delete'],
  ['esperar', 'await'],
  ['en', 'in'],
  ['establecer', 'set'],
  ['este', 'this'],
  ['exportar', 'export'],
  ['extiende', 'extends'],
  ['falso', 'false'],
  ['finalmente', 'finally'],
  ['funcion', 'function'],
  ['global', 'var'],
  ['hacer', 'do'],
  ['importar', 'import'],
  ['indefinido', 'undefined'],
  ['instanciaDe', 'instanceof'],
  ['intentar', 'try'],
  ['lanzar', 'throw'],
  ['longitud', 'length'],
  ['mientras', 'while'],
  ['nulo', 'null'],
  ['obtener', 'get'],
  ['osi', 'else if'],
  ['para', 'for'],
  ['retornar', 'return'],
  ['romper', 'break'],
  ['si', 'if'],
  ['simbolo', 'symbol'],
  ['sino', 'else'],
  ['super', 'super'],
  ['subcadena', 'substr'],
  ['tipoDe', 'typeof'],
  ['vacio', 'void'],
  ['var', 'let'],
  ['verdadero', 'true'],
  ['yield', 'yield'],
])

export function transpile(input: string) {
  let current = 0
  let output = ''

  function finishIdentifier() {
    let name = ''
    while (!isWhitespace(input[current]) && !isSpecialCharacter(input[current]) && !isBracket(input[current])) {
      name += input[current]
      current++
    }

    const translation = keywords.get(name)

    return translation || name
  }

  function finishSpecialCharacters() {
    let chars = ''
    while (isSpecialCharacter(input[current])) {
      chars += input[current]
      current++
    }

    const translation = keywords.get(chars)

    return translation || chars
  }

  function finishStringLiteral() {
    let value = input[current]
    current++

    while (input[current] && !isTick(input[current])) {
      value += input[current]
      current++
    }

    if (isTick(input[current])) {
      value += input[current]
      current++
      return value
    }

    throw new Error('Unterminated string, expected a closing \', " or `')
  }

  while (current < input.length) {
    const currentChar = input[current]

    if (isWhitespace(currentChar)) {
      output += currentChar
      current++
      continue
    }

    if (isTick(currentChar)) {
      output += finishStringLiteral()
    }
    else if (isAlpha(currentChar)) {
      output += finishIdentifier()
    }
    else if (isSpecialCharacter(currentChar)) {
      output += finishSpecialCharacters()
    }
    else if (isBracket(currentChar)) {
      output += currentChar
      current++
    }
    else {
      throw new Error(`Unknown character: ${currentChar}`)
    }
  }

  return output
}

function isAlpha(char: string) {
  return /[a-zA-Z]/.test(char)
}

function isWhitespace(char: string) {
  return /\s/.test(char)
}

function isTick(char: string) {
  return ['"', '"', '`'].includes(char)
}

function isBracket(char: string) {
  return ['{', '}'].includes(char)
}

function isSpecialCharacter(char: string) {
  return !isWhitespace(char) && !isAlpha(char) && !isTick(char) && !isBracket(char)
}
