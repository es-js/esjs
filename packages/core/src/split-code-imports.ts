const importsRegex = /import(?:["'\s]*([\w*{}\n\r\t, ]+)from\s*)?["'\s].*([@\w/_-]+)["'\s].*/g

export function splitCodeImports(code: string) {
  const codeWithoutImports = replace(code, importsRegex)

  const hasImports = Boolean(code.match(importsRegex))

  const imports = code.match(importsRegex)?.join('\n') ?? ''

  return {
    codeWithoutImports,
    imports,
    hasImports,
  }
}

function replace(string: string, regex: RegExp, value = ''): string {
  return string.replace(regex, value).trim()
}

