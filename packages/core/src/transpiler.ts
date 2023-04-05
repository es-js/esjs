import { keywords } from './keywords'

function invertMap(map: Map<string, string>) {
  const invertedMap = new Map()
  for (const [key, value] of map.entries())
    invertedMap.set(value, key)

  return invertedMap
}

export function transpile(input: string, reverse = false) {
  let current = 0
  let output = ''
  const dictionary = reverse ? invertMap(keywords) : keywords

  function finishIdentifier() {
    let name = ''
    while (!isWhitespace(input[current]) && !isSpecialCharacter(input[current]) && !isBracket(input[current]) && !isTick(input[current])) {
      name += input[current]
      current++
    }

    const translation = dictionary.get(name)

    return translation || name
  }

  function finishSpecialCharacters() {
    let chars = ''
    while (isSpecialCharacter(input[current])) {
      chars += input[current]
      current++
    }

    const translation = dictionary.get(chars)

    return translation || chars
  }

  function finishStringLiteral(tick: string) {
    let value = input[current]
    current++

    while (input[current] && input[current] !== tick) {
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
      output += finishStringLiteral(currentChar)
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
  return /^[\p{L}\p{Nl}$_][\p{L}\p{Nl}\p{Nd}$\u200C\u200D_]*$/u.test(char)
}

function isWhitespace(char: string) {
  return /\s/.test(char)
}

function isTick(char: string) {
  return ['"', '\'', '`'].includes(char)
}

function isBracket(char: string) {
  return ['{', '}'].includes(char)
}

function isSpecialCharacter(char: string) {
  return !isWhitespace(char) && !isAlpha(char) && !isTick(char) && !isBracket(char)
}
