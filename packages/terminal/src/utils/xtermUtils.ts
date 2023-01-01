// @see https://github.com/protiumx/protiumx.github.io
export function handleBackspace(xterm: any, input: string) {
  if (input.length === 0)
    return input

  if (xterm._core.buffer.x === 0 && xterm._core.buffer.y > 1) {
    // Move up
    xterm.write('\x1B[A')
    // Move to the end
    xterm.write(`\x1B[${xterm._core.buffer._cols}G`)
    xterm.write(' ')
  }
  else {
    xterm.write('\b \b')
  }
  return input.substring(0, input.length - 1)
}

// @see https://github.com/protiumx/protiumx.github.io
export function isPrintableKeyCode(keyCode: number) {
  return (
    keyCode === 32
    || (keyCode >= 48 && keyCode <= 90)
    || (keyCode >= 96 && keyCode <= 111)
    || (keyCode >= 186 && keyCode <= 222)
  )
}

export function prompt(xterm: any, prompt = '> ') {
  clearLine(xterm)
  xterm.write(prompt)
}

// @see https://stackoverflow.com/a/56829034/2522130
export function clearLine(xterm: any) {
  xterm.write('\x1B[2K\r')
}
