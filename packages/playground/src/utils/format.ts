export const importsRegex = /import(?:["'\s]*([\w*{}\n\r\t, ]+)from\s*)?["'\s].*([@\w/_-]+)["'\s].*/g
export const pureRegex = /\/\*#__PURE__\*\//g

export function replace(string: string, regex: RegExp, value = ''): string {
  return string.replace(regex, value).trim()
}
