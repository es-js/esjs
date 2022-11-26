const FRONT_MATTER_DIVISOR = '---'

export function splitScriptTemplate(code: string) {
  let script = code
  let template = null

  if (code.startsWith(FRONT_MATTER_DIVISOR)) {
    script = code.substring(code.indexOf(FRONT_MATTER_DIVISOR) + 3)
    script = script.substring(0, script.lastIndexOf(FRONT_MATTER_DIVISOR))

    template = code.substring(code.lastIndexOf(FRONT_MATTER_DIVISOR) + 3)
  }

  return { script, template }
}
